import type {Novel} from './model';
import {coverColors,resolveCover} from './cover';
export const escapeBookText=(text:string)=>String(text||'').replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'})[c]!);
export function bookInfo(novel:Novel){
 const p=novel.publication||{};
 return {author:typeof p.author==='string'?p.author:'',subtitle:typeof p.subtitle==='string'?p.subtitle:'',language:p.language==='en'||p.language==='es'?p.language:document.documentElement.lang==='en'?'en':'es',font:p.font==='sans'?'sans-serif':'serif',fontSize:[11,12,14].includes(p.fontSize||0)?p.fontSize!:12,paper:p.paper==='a5'?'A5':p.paper==='letter'?'letter':'A4',includeCover:p.includeCover!==false};
}
export function bookCoverSvg(novel:Novel){
 const info=bookInfo(novel),cover=resolveCover(novel),[bg,ink]=coverColors[cover.palette];
 const wrap=(text:string,width:number)=>{const lines:string[]=[];for(const word of text.split(/\s+/).flatMap(word=>Array.from({length:Math.ceil(word.length/width)},(_,i)=>word.slice(i*width,(i+1)*width)))){if(!lines.length||lines[lines.length-1].length+word.length+1>width)lines.push(word);else lines[lines.length-1]+=' '+word}return lines};
 const lines=wrap(novel.title,25).slice(0,10);const size=Math.min(46,330/Math.max(1,lines.length));
 const label=(text:string,y:number,font=22)=>`<text x="300" y="${y}" text-anchor="middle" fill="${ink}" font-family="${info.font}" font-size="${font}">${escapeBookText(text)}</text>`;
 const decoration=cover.style==='frame'?`<rect x="32" y="32" width="536" height="836" fill="none" stroke="${ink}" opacity="0.5"/>`:cover.style==='orbit'?`<circle cx="570" cy="35" r="170" fill="none" stroke="${ink}" opacity="0.5"/>`:`<path d="M32 32 V868" stroke="${ink}" stroke-width="3" opacity="0.5"/>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><title>${escapeBookText(novel.title)}</title><rect width="600" height="900" fill="${bg}"/>${decoration}${lines.map((line,i)=>label(line,330+i*(size+12),size)).join('')}${wrap(info.subtitle,42).slice(0,3).map((line,i)=>label(line,720+i*27,20)).join('')}${wrap(info.author,35).slice(0,2).map((line,i)=>label(line,810+i*27)).join('')}</svg>`;
}
export function printBookHtml(novel:Novel,sanitize:(text:string)=>string){
 const info=bookInfo(novel),e=escapeBookText;
 const cover=info.includeCover?`<section class="book-cover"><h1>${e(novel.title)}</h1>${info.subtitle?`<p>${e(info.subtitle)}</p>`:''}${info.author?`<p class="author">${e(info.author)}</p>`:''}<p>${e(novel.genre)}</p></section>`:`<h1>${e(novel.title)}</h1>`;
 return `<!doctype html><html lang="${info.language}"><head><meta charset="utf-8"><title>${e(novel.title)}</title><style>@page{size:${info.paper};margin:2cm}body{font:${info.fontSize}pt/1.65 ${info.font};color:#111;background:#fff;max-width:70ch;margin:2cm auto;overflow-wrap:anywhere}.book-cover{min-height:65vh;display:flex;flex-direction:column;justify-content:center;text-align:center;break-after:page}.book-cover h1{font-size:2.4em}.author{margin-top:3em}h1,h2,h3{line-height:1.3}h2.chapter{break-before:page;page-break-before:always}p{margin:0 0 .8em}a{color:inherit;text-decoration:underline}h1,h2,h3{break-after:avoid}p{orphans:3;widows:3}@media print{body{max-width:none;margin:0}}</style></head><body>${cover}${novel.chapters.map(c=>`<h2 class="chapter">${e(c.title)}</h2>${sanitize(c.text)}`).join('')}</body></html>`;
}
