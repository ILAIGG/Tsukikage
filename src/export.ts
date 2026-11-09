import {isEmbeddedImage} from './editor-image';
import {printBookHtml} from './publication';
import DOMPurify from 'dompurify';
import type { Novel } from './model';
export const htmlToText = (html: string) => { const el = document.createElement('div'); el.innerHTML = sanitizeHtml(html); return el.innerText || el.textContent || ''; };
export const wordCount = (text: string) => text.trim() ? text.trim().split(/\s+/u).length : 0;
DOMPurify.addHook('uponSanitizeAttribute',(node,data)=>{if(node.nodeName.toLowerCase()==='img'&&data.attrName==='src'&&!isEmbeddedImage(data.attrValue))data.keepAttr=false});
export const sanitizeHtml = (html:string)=>{const clean=DOMPurify.sanitize(html||'',{USE_PROFILES:{html:true},FORBID_TAGS:['video','audio','iframe','object','embed','form','input','button','style'],FORBID_ATTR:['style','srcset']});if(!/<img\b/i.test(clean))return clean;const root=document.createElement('div');root.innerHTML=clean;root.querySelectorAll('img').forEach(img=>{if(!isEmbeddedImage(img.getAttribute('src')||''))img.remove()});return root.innerHTML};
// Local wiki references remain useful text when the destination is not part of the exported book.
export const manuscriptExportHtml=(html:string)=>{const root=document.createElement('div');root.innerHTML=sanitizeHtml(html);root.querySelectorAll('a[href^="#tsukikage/"]').forEach(a=>a.replaceWith(...Array.from(a.childNodes)));return root.innerHTML};
export const htmlToMarkdown = (html: string) => { const el = document.createElement('div'); el.innerHTML = sanitizeHtml(html); return Array.from(el.childNodes).map(node => { if (node.nodeType === Node.TEXT_NODE) return node.textContent || ''; const e = node as HTMLElement; const txt = e.innerText || ''; if(e.tagName==='IMG')return `![${(e.getAttribute('alt')||'').replace(/[\[\]]/g,'')}](${e.getAttribute('src')||''})`; if (/^H[1-6]$/.test(e.tagName)) return `${'#'.repeat(Number(e.tagName[1]))} ${txt}`; return txt; }).join('\n\n'); };
const safeName = (name: string) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'tsukikage';
export function download(blob: Blob, name: string) { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
export async function exportEpub(novel:Novel){const {exportEpubBook}=await import('./editorial-export');await exportEpubBook(novel)}
export async function exportDocx(novel:Novel){const {exportDocxBook}=await import('./editorial-export');await exportDocxBook(novel)}
export function exportPdf(novel:Novel){const w=window.open('','_blank');if(!w){alert('Permite las ventanas emergentes para preparar el PDF.');return}w.document.write(printBookHtml(novel,manuscriptExportHtml));w.onload=()=>w.print();w.document.close()}
export function escapeXml(text: string) { return text.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!); }
