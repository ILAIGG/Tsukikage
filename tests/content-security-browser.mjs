import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import WebSocket from 'ws';
const profile=await mkdtemp(join(tmpdir(),'tsukikage-theme-profile-'));
const output=process.env.THEME_SCREENSHOTS||await mkdtemp(join(tmpdir(),'tsukikage-themes-'));
await mkdir(output,{recursive:true});
const origin='http://127.0.0.1:5200';
const vite=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5200','--strictPort'],{stdio:'ignore'});
let browser,socket,seq=0;const report=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn){let error;for(let i=0;i<100;i++){try{const v=await fn();if(v)return v}catch(e){error=e}await wait(100)}throw error||Error('Browser check timed out')}
async function send(method,params={}){return new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{socket.off('message',listener);reject(Error('CDP timeout: '+method))},10000);const listener=data=>{const r=JSON.parse(data);if(r.id!==id)return;clearTimeout(timer);socket.off('message',listener);r.error?reject(Error(JSON.stringify(r.error))):resolve(r.result)};socket.on('message',listener);socket.send(JSON.stringify({id,method,params}))})}
async function ev(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value}
async function click(selector){assert(await ev(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)return false;e.click();return true})()`),'Missing '+selector);await wait(160)}
async function snap(name){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});await ev('document.fonts.ready.then(()=>true)');const metrics=await ev(`(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,fatal:!!document.querySelector('.fatal-screen'),dialogs:[...document.querySelectorAll('.settings-dialog,.modal-card')].map(x=>({width:x.getBoundingClientRect().width,height:x.getBoundingClientRect().height}))}))()`);assert(!metrics.fatal,name+': React error');const centers=await ev("[...document.querySelectorAll('.top-actions .search-trigger,.top-actions .export-trigger')].map(b=>{const r=b.getBoundingClientRect(),s=b.querySelector('svg').getBoundingClientRect();return Math.abs((s.top+s.height/2)-(r.top+r.height/2))})");if(name.includes('-390-'))assert(centers.every(offset=>offset<=1),'Mobile icon centering: '+name);assert(metrics.scroll<=metrics.width+1,name+': horizontal page overflow '+JSON.stringify(metrics));const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(join(output,name+'.png'),Buffer.from(shot.data,'base64'));report.push({name,...metrics});console.log(name)}
try{
 await until(async()=>(await fetch(origin)).ok);
 browser=spawn(process.env.CHROMIUM_BIN||'chromium',['--headless','--no-sandbox','--disable-gpu','--remote-debugging-port=9240',`--user-data-dir=${profile}`,origin],{stdio:'ignore'});
 const page=await until(async()=>(await(await fetch('http://127.0.0.1:9240/json/list')).json()).find(x=>x.type==='page'&&x.url.startsWith(origin)));
 socket=new WebSocket(page.webSocketDebuggerUrl);await new Promise((r,j)=>{socket.once('open',r);socket.once('error',j)});await until(()=>ev("!!document.querySelector('.library-page,.project-home')")).catch(async error=>{console.error(await ev('({url:location.href,body:document.body.innerText,html:document.body.innerHTML.slice(0,1200)})'));throw error});

 const result=await ev(`(async()=>{const {sanitizeHtml,htmlToText}=await import('/src/export.ts');const dirty='<p onclick="alert(1)" style="background:url(https://example.com/track)">Safe <strong>text</strong></p><img src="https://example.com/track" onerror="alert(1)"><iframe src="https://example.com"></iframe><script>alert(1)</script>';return {html:sanitizeHtml(dirty),text:htmlToText(dirty)}})()`);
 assert.match(result.html,/<strong>text<\/strong>/);assert.doesNotMatch(result.html,/<script|<img|<iframe|onclick|onerror|style=/i);assert.equal(result.text.trim(),'Safe text');
 console.log('PASS active markup, tracking resources and styles removed in Chromium.');
}finally{socket?.close();if(browser){const exited=new Promise(r=>browser.once('exit',r));browser.kill('SIGTERM');await exited}vite.kill('SIGTERM');await rm(profile,{recursive:true,force:true,maxRetries:10,retryDelay:150})}
