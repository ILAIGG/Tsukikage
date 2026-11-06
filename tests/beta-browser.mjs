import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import WebSocket from 'ws';
const profile=await mkdtemp(join(tmpdir(),'tsukikage-theme-profile-'));
const output=process.env.THEME_SCREENSHOTS||await mkdtemp(join(tmpdir(),'tsukikage-themes-'));
await mkdir(output,{recursive:true});
const origin='http://127.0.0.1:5199';
const vite=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','5199','--strictPort'],{stdio:'ignore'});
let browser,socket,seq=0;const report=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn){let error;for(let i=0;i<100;i++){try{const v=await fn();if(v)return v}catch(e){error=e}await wait(100)}throw error||Error('Browser check timed out')}
async function send(method,params={}){return new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{socket.off('message',listener);reject(Error('CDP timeout: '+method))},10000);const listener=data=>{const r=JSON.parse(data);if(r.id!==id)return;clearTimeout(timer);socket.off('message',listener);r.error?reject(Error(JSON.stringify(r.error))):resolve(r.result)};socket.on('message',listener);socket.send(JSON.stringify({id,method,params}))})}
async function ev(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value}
async function click(selector){assert(await ev(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)return false;e.click();return true})()`),'Missing '+selector);await wait(160)}
async function snap(name){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});await ev('document.fonts.ready.then(()=>true)');const metrics=await ev(`(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,fatal:!!document.querySelector('.fatal-screen'),dialogs:[...document.querySelectorAll('.settings-dialog,.modal-card')].map(x=>({width:x.getBoundingClientRect().width,height:x.getBoundingClientRect().height}))}))()`);assert(!metrics.fatal,name+': React error');const centers=await ev("[...document.querySelectorAll('.top-actions .search-trigger,.top-actions .export-trigger')].map(b=>{const r=b.getBoundingClientRect(),s=b.querySelector('svg').getBoundingClientRect();return Math.abs((s.top+s.height/2)-(r.top+r.height/2))})");if(name.includes('-390-'))assert(centers.every(offset=>offset<=1),'Mobile icon centering: '+name);assert(metrics.scroll<=metrics.width+1,name+': horizontal page overflow '+JSON.stringify(metrics));const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(join(output,name+'.png'),Buffer.from(shot.data,'base64'));report.push({name,...metrics});console.log(name)}
try{
 await until(async()=>(await fetch(origin)).ok);
 browser=spawn(process.env.CHROMIUM_BIN||'chromium',['--headless','--no-sandbox','--disable-gpu','--remote-debugging-port=9239',`--user-data-dir=${profile}`,origin],{stdio:'ignore'});
 const page=await until(async()=>(await(await fetch('http://127.0.0.1:9239/json/list')).json()).find(x=>x.type==='page'&&x.url.startsWith(origin)));
 socket=new WebSocket(page.webSocketDebuggerUrl);await new Promise((r,j)=>{socket.once('open',r);socket.once('error',j)});await until(()=>ev("!!document.querySelector('.library-page,.project-home')")).catch(async error=>{console.error(await ev('({url:location.href,body:document.body.innerText,html:document.body.innerHTML.slice(0,1200)})'));throw error});

 await ev("navigator.serviceWorker.ready.then(()=>true)");
 await send('Page.reload');await until(()=>ev("!!navigator.serviceWorker.controller&&!!document.querySelector('.library-page')"));
 const cached=await ev("caches.keys().then(async keys=>{const cache=await caches.open(keys.find(k=>k.startsWith('tsukikage-/')));return (await cache.keys()).map(r=>r.url)})");assert(cached.some(url=>url.includes('RichEditor-')),'Editor must be precached');assert(cached.some(url=>url.includes('jszip')),'Export module must be precached');
 const headers=await fetch(origin).then(r=>r.headers);assert(headers.get('content-security-policy')?.includes("script-src 'self'"));assert.equal(headers.get('x-frame-options'),'DENY');
 await ev("window.securityExecuted=false;const s=document.createElement('script');s.textContent='window.securityExecuted=true';document.body.append(s)");assert.equal(await ev('window.securityExecuted'),false,'CSP must block injected inline script');
 await send('Network.enable');await send('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});await send('Page.reload');await until(()=>ev("!!document.querySelector('.library-page')"));
 await click('.story-card .secondary-btn');await until(()=>ev("!!document.querySelector('.project-home')"));await click('.project-hero-actions button');await until(()=>ev("!!document.querySelector('.tiptap-writing[contenteditable]')"));
 await ev("(()=>{const e=document.querySelector('.tiptap-writing[contenteditable]');e.focus();document.execCommand('insertText',false,'BETA OFFLINE PERSISTENCE')})()");await wait(1600);await send('Page.reload');await until(()=>ev("document.body.innerText.includes('BETA OFFLINE PERSISTENCE')"));await snap('beta-offline-editor');
 console.log('PASS production CSP, complete offline shell, first editor load offline and persisted writing. Screenshots: '+output);
}finally{socket?.close();if(browser){const exited=new Promise(r=>browser.once('exit',r));browser.kill('SIGTERM');await exited}vite.kill('SIGTERM');await rm(profile,{recursive:true,force:true,maxRetries:10,retryDelay:150})}
