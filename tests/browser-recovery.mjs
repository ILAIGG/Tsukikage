import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import WebSocket from 'ws';

const profile = await mkdtemp(join(tmpdir(), 'tsukikage-recovery-'));
const origin = 'http://127.0.0.1:5188';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5188', '--strictPort'], { stdio: 'ignore' });
let browser, socket;
async function until(fn) { for (let i=0;i<100;i++) { try { const value=await fn(); if(value)return value; } catch {} await wait(100); } throw new Error('Browser recovery check timed out'); }
async function launch() {
 browser=spawn(process.env.CHROMIUM_BIN || 'chromium', ['--headless','--no-sandbox','--disable-gpu','--remote-debugging-port=9228',`--user-data-dir=${profile}`,origin], {stdio:'ignore'});
 browser.on('error',error=>console.error(error.message));
 const page=await until(async()=>{const pages=await(await fetch('http://127.0.0.1:9228/json/list')).json();return pages.find(p=>p.type==='page'&&p.url.startsWith(origin));});
 socket=new WebSocket(page.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{socket.once('open',resolve);socket.once('error',reject);});
 await until(()=>evaluate("Boolean(document.querySelector('.story-card,.project-home,.writing-layout,.modal-card'))"));
}
let sequence=0;
async function command(method,params={}) { return new Promise((resolve,reject)=>{const id=++sequence;const timeout=setTimeout(()=>{socket.off('message',listener);reject(new Error(`CDP timeout: ${method}`));},10000);const listener=raw=>{const result=JSON.parse(raw);if(result.id!==id)return;clearTimeout(timeout);socket.off('message',listener);result.error?reject(new Error(JSON.stringify(result.error))):resolve(result.result);};socket.on('message',listener);socket.send(JSON.stringify({id,method,params}));}); }
async function evaluate(expression) { const result=await command('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.text);return result.result.value; }
async function close() { const exited=new Promise(resolve=>browser.once('exit',resolve));await command('Browser.close').catch(()=>{});await exited;socket.close();browser=undefined; }
try {
 await until(async()=> (await fetch(origin)).ok);
 await launch();await wait(1500);
 await evaluate(`(async()=>{const s=await import('/src/storage.ts');const w=await s.loadWorkspace();const n=w.novels[0],c=n.chapters[0];c.text='<p>Saved manuscript before browser restart.</p>';c.scenes=[{id:'browser-scene',title:'Scene 1',text:c.text,description:''}];w.activeNovelId=n.id;w.activeChapterId=c.id;w.lastPage='write';await s.saveWorkspace(w);const chapter=structuredClone(c);chapter.text='<p>Recovered manuscript after browser restart.</p>';chapter.scenes[0].text=chapter.text;await s.savePendingRecovery({id:n.id+':'+c.id,novelId:n.id,chapterId:c.id,chapter,createdAt:Date.now()});return true})()`);
 await close();await launch();
 await until(()=>evaluate("Boolean(document.querySelector('.recovery-content .primary-btn'))"));
 const saved=await evaluate("(async()=>{const s=await import('/src/storage.ts');const w=await s.loadWorkspace();return w.novels[0].chapters[0].text})()");
 assert.match(saved,/Saved manuscript before browser restart/);
 await evaluate("document.querySelector('.recovery-content .primary-btn').click()");
 await until(()=>evaluate("document.querySelector('.tiptap-writing')?.textContent.includes('Recovered manuscript after browser restart.')"));
 await until(()=>evaluate("(async()=>{const s=await import('/src/storage.ts');const w=await s.loadWorkspace();return w.novels[0].chapters[0].text.includes('Recovered manuscript after browser restart.')&&!(await s.loadPendingRecovery(w.novels))})()"));
 await close();await launch();
 await until(()=>evaluate("document.querySelector('.tiptap-writing')?.textContent.includes('Recovered manuscript after browser restart.')"));
 assert.equal(await evaluate("Boolean(document.querySelector('.recovery-content'))"),false);
 console.log('PASS: saved manuscript, pending recovery and restored text survive real Chromium restarts.');
} finally { if(browser){browser.kill('SIGTERM');await new Promise(resolve=>browser.once('exit',resolve));}socket?.close();vite.kill('SIGTERM');await rm(profile,{recursive:true,force:true}); }
