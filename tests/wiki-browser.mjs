import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import WebSocket from 'ws';
const profile=await mkdtemp(join(tmpdir(),'tsukikage-theme-profile-'));
const output=process.env.THEME_SCREENSHOTS||await mkdtemp(join(tmpdir(),'tsukikage-themes-'));
await mkdir(output,{recursive:true});
const origin='http://127.0.0.1:5211';
const vite=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5211','--strictPort'],{stdio:'ignore'});
let browser,socket,seq=0;const report=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn){let error;for(let i=0;i<100;i++){try{const v=await fn();if(v)return v}catch(e){error=e}await wait(100)}throw error||Error('Browser check timed out')}
async function send(method,params={}){return new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{socket.off('message',listener);reject(Error('CDP timeout: '+method))},10000);const listener=data=>{const r=JSON.parse(data);if(r.id!==id)return;clearTimeout(timer);socket.off('message',listener);r.error?reject(Error(JSON.stringify(r.error))):resolve(r.result)};socket.on('message',listener);socket.send(JSON.stringify({id,method,params}))})}
async function ev(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value}
async function click(selector){assert(await ev(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)return false;e.click();return true})()`),'Missing '+selector);await wait(160)}
async function snap(name){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});await ev('document.fonts.ready.then(()=>true)');const metrics=await ev(`(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,fatal:!!document.querySelector('.fatal-screen'),dialogs:[...document.querySelectorAll('.settings-dialog,.modal-card')].map(x=>({width:x.getBoundingClientRect().width,height:x.getBoundingClientRect().height}))}))()`);assert(!metrics.fatal,name+': React error');const centers=await ev("[...document.querySelectorAll('.top-actions .search-trigger,.top-actions .export-trigger')].map(b=>{const r=b.getBoundingClientRect(),s=b.querySelector('svg').getBoundingClientRect();return Math.abs((s.top+s.height/2)-(r.top+r.height/2))})");if(name.includes('-390-'))assert(centers.every(offset=>offset<=1),'Mobile icon centering: '+name);assert(metrics.scroll<=metrics.width+1,name+': horizontal page overflow '+JSON.stringify(metrics));const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(join(output,name+'.png'),Buffer.from(shot.data,'base64'));report.push({name,...metrics});console.log(name)}
async function load(theme,width,page='project',section='project'){
 // Leave React before replacing the fixture so its pending autosave cannot overwrite it.
 await send('Page.navigate',{url:origin+'/theme-example.json'});await until(()=>ev("location.pathname.endsWith('/theme-example.json')"));
 await ev(`(async()=>{const {saveWorkspace}=await import('/src/storage.ts');const {defaultSettings,starter}=await import('/src/model.ts');const novels=structuredClone(starter);const n=novels[0];n.synopsis='Una ciudad que recuerda lo que sus habitantes prefieren olvidar.';const text='<p>La campana sonó trece veces aquella noche.</p><p><strong>Lía</strong> miró hacia la torre. <em>Algo había cambiado.</em></p>'+ '<p>La lluvia dibujaba caminos sobre las ventanas mientras la ciudad dormía.</p>'.repeat(12);n.chapters[0].text=text;n.chapters[0].scenes=[{id:'scene-a',title:'La campana',text,description:'Lía escucha la señal.'},{id:'scene-b',title:'El mensaje',text:'<p>La carta esperaba sobre la mesa.</p>',description:''}];n.chapters[0].progress=35;n.entries=[{id:'lia',kind:'character',name:'Lía Sol',description:'<p>Una guardiana de secretos.</p>',character:{firstName:'Lía',surname:'Sol',role:'protagonist'}},{id:'noa',kind:'character',name:'Noa',description:'',character:{firstName:'Noa',role:'main'}},{id:'note',kind:'note',name:'El reloj',description:'Recordar el detalle del reloj.',chapterId:n.chapters[0].id}];await saveWorkspace({novels,settings:{...defaultSettings,customThemes:[...defaultSettings.customThemes,{...defaultSettings.customThemes[0],id:'custom-lunar'}],theme:${JSON.stringify(theme)},language:'es'},activeNovelId:${JSON.stringify(page)}==='library'?undefined:n.id,activeChapterId:n.chapters[0].id,lastPage:${JSON.stringify(page)},activeSection:${JSON.stringify(section)}});localStorage.setItem('tsukikage-backup-at',String(Date.now()));return true})()`);
 const selector=page==='library'?'.library-page':page==='write'?'.writing-layout':page==='world'?'.world-page':page==='chapters'?'.chapter-menu-list':'.project-home';await send('Page.navigate',{url:origin});await until(()=>ev(`document.documentElement.dataset.theme===${JSON.stringify(theme)}&&!!document.querySelector(${JSON.stringify(selector)})`));await wait(220);await ev('window.scrollTo(0,0)');
}
async function openRelationshipGraph(){
 if(await ev("!!document.querySelector('.character-overview')"))await click('.character-view-toggle');
 await click('.character-description-switch button:nth-child(2)');
 if(await ev("!!document.querySelector('.character-interview-summary')"))await click('.character-interview-summary .interview-summary-heading button');
 await ev("[...document.querySelectorAll('.interview-category')].find(b=>b.textContent.includes('Relaciones')).click()");await wait(160);
 for(let i=0;i<3;i++)await click('.interview-actions .primary-btn');
 await until(()=>ev("!!document.querySelector('.character-relationship-question')"));
}
try{
 await until(async()=>(await fetch(origin)).ok);
 browser=spawn(process.env.CHROMIUM_BIN||'chromium',['--headless','--no-sandbox','--disable-gpu','--remote-debugging-port=9251',`--user-data-dir=${profile}`,origin],{stdio:'ignore'});
 const page=await until(async()=>(await(await fetch('http://127.0.0.1:9251/json/list')).json()).find(x=>x.type==='page'&&x.url.startsWith(origin)));
 socket=new WebSocket(page.webSocketDebuggerUrl);await new Promise((r,j)=>{socket.once('open',r);socket.once('error',j)});
 await until(()=>ev("!!document.querySelector('.library-page,.project-home')"));
 for(const theme of ['light','dark','pop','darkpop','system','custom-lunar'])for(const width of [1440,390]){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});await load(theme,width,'write','chapter');await until(()=>ev("!!document.querySelector('.tiptap')"));
 await click('button[aria-label="Enlace wiki"]');await until(()=>ev("!!document.querySelector('.wiki-picker')"));assert(await ev("document.querySelector('.wiki-picker').contains(document.activeElement)"));await snap(`${theme}-${width}-wiki-picker`);
 await ev("[...document.querySelectorAll('.wiki-results button')].find(b=>b.textContent.includes('Lía Sol')).click()");await until(()=>ev("!!document.querySelector('.tiptap a[href]')"));await wait(700);
 if(theme==='light'&&width===1440){
 const saved=await ev("import('/src/storage.ts').then(m=>m.loadWorkspace()).then(w=>w.novels[0].chapters[0].text)");assert(saved.includes('#tsukikage/character/lia'));
 await ev("document.querySelector('.tiptap a').dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}))");assert(await ev("!!document.querySelector('.writing-layout')"));
 await ev("document.querySelector('.tiptap a').dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,ctrlKey:true}))");await until(()=>ev("!!document.querySelector('.character-identity')"));await snap('wiki-open-character');
 await load('light',1440,'write','chapter');await until(()=>ev("!!document.querySelector('.tiptap')"));await click('button[aria-label="Enlace wiki"]');await ev("[...document.querySelectorAll('.wiki-results button')].find(b=>b.textContent.includes('El reloj')).click()");await until(()=>ev("!!document.querySelector('.tiptap a')"));await ev("document.querySelector('.tiptap a').dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,ctrlKey:true}))");await until(()=>ev("!!document.querySelector('.note-description .tiptap')"));await click('.note-description button[aria-label="Enlace wiki"]');await until(()=>ev("!!document.querySelector('.wiki-picker')"));await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape'});assert(await ev("!!document.querySelector('.entry-fullscreen')&&!document.querySelector('.wiki-picker')"));await snap('wiki-note-editor');await click('.entry-fullscreen .modal-head button');
 }
 }
 console.log('PASS wiki picker in six themes/mobile, insertion, stored links and Ctrl-click character navigation. Screenshots: '+output);
}finally{socket?.close();if(browser){const exited=new Promise(r=>browser.once('exit',r));browser.kill('SIGTERM');await exited}vite.kill('SIGTERM');await rm(profile,{recursive:true,force:true,maxRetries:10,retryDelay:150})}
