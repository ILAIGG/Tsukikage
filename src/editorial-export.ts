import type {Novel} from './model';
import {bookInfo,bookCoverSvg,escapeBookText as e} from './publication';
import {manuscriptExportHtml,download} from './export';
const name=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9-]+/g,'-').toLowerCase().replace(/^-|-$/g,'')||'tsukikage';
function xhtml(value:string){const el=document.createElement('div');el.innerHTML=manuscriptExportHtml(value);return Array.from(el.childNodes).map(node=>new window.XMLSerializer().serializeToString(node)).join('')||'<p/>'}
export async function exportEpubBook(novel:Novel){
 const {default:JSZip}=await import('jszip');const zip=new JSZip(),info=bookInfo(novel);const files=novel.chapters.map((_,i)=>`chapter-${i+1}.xhtml`);const uid=`urn:tsukikage:${encodeURIComponent(novel.id)}`;
 zip.file('mimetype','application/epub+zip',{compression:'STORE'});
 zip.file('META-INF/container.xml','<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>');
 const page=(title:string,body:string)=>`<?xml version="1.0" encoding="utf-8"?><html xmlns="http://www.w3.org/1999/xhtml" lang="${info.language}" xml:lang="${info.language}"><head><title>${e(title)}</title><link rel="stylesheet" href="style.css"/></head><body>${body}</body></html>`;
 const index=info.language==='es'?'Índice':'Contents';zip.file('OEBPS/nav.xhtml',page(index,`<nav xmlns:epub="http://www.idpf.org/2007/ops" epub:type="toc"><h1>${index}</h1><ol>${novel.chapters.map((c,i)=>`<li><a href="${files[i]}">${e(c.title)}</a></li>`).join('')}</ol></nav>`));
 novel.chapters.forEach((c,i)=>zip.file('OEBPS/'+files[i],page(c.title,`<h1>${e(c.title)}</h1>${xhtml(c.text)}`)));
 if(info.includeCover){zip.file('OEBPS/cover.svg',bookCoverSvg(novel));zip.file('OEBPS/cover.xhtml',page(novel.title,`<div class="cover"><img src="cover.svg" alt="${e(novel.title)}"/></div>`))}
 zip.file('OEBPS/style.css',`body{font-family:${info.font};line-height:1.65;margin:8%;overflow-wrap:break-word}h1{text-align:center;line-height:1.3;break-before:page}p{margin:0 0 .8em}.cover img{width:100%;height:auto}`);
 zip.file('OEBPS/content.opf',`<?xml version="1.0" encoding="UTF-8"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid" xml:lang="${info.language}"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="uid">${e(uid)}</dc:identifier><dc:title id="main-title">${e(novel.title)}</dc:title><meta refines="#main-title" property="title-type">main</meta>${info.subtitle?`<dc:title id="subtitle">${e(info.subtitle)}</dc:title><meta refines="#subtitle" property="title-type">subtitle</meta>`:''}<dc:language>${info.language}</dc:language>${info.author?`<dc:creator>${e(info.author)}</dc:creator>`:''}<dc:description>${e(novel.synopsis||info.subtitle)}</dc:description><meta property="dcterms:modified">${new Date().toISOString().replace(/\.\d+Z$/,'Z')}</meta></metadata><manifest><item id="nav" href="nav.xhtml" properties="nav" media-type="application/xhtml+xml"/><item id="css" href="style.css" media-type="text/css"/>${info.includeCover?'<item id="cover-image" href="cover.svg" properties="cover-image" media-type="image/svg+xml"/><item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>':''}${files.map((f,i)=>`<item id="c${i}" href="${f}" media-type="application/xhtml+xml"/>`).join('')}</manifest><spine>${info.includeCover?'<itemref idref="cover"/>':''}${files.map((_,i)=>`<itemref idref="c${i}"/>`).join('')}</spine></package>`);
 download(await zip.generateAsync({type:'blob',mimeType:'application/epub+zip'}),name(novel.title)+'.epub');
}
export async function exportDocxBook(novel:Novel){
 const {Document,HeadingLevel,Packer,Paragraph,TextRun,ExternalHyperlink,AlignmentType,Footer,PageNumber}=await import('docx');const info=bookInfo(novel);const font=info.font==='serif'?'Times New Roman':'Arial';
 type RunOptions={bold?:boolean;italics?:boolean;underline?:{};strike?:boolean};
 function runs(node:Node,style:RunOptions={}):(InstanceType<typeof TextRun>|InstanceType<typeof ExternalHyperlink>)[] {
  if(node.nodeType===3)return [new TextRun({...style,text:node.textContent||''})];
  if(node.nodeType!==1)return[];const tag=(node as Element).tagName.toLowerCase();if(tag==='br')return [new TextRun({break:1})];
  if(tag==='a'&&(node as Element).getAttribute('href'))return [new ExternalHyperlink({link:(node as Element).getAttribute('href')!,children:Array.from(node.childNodes).flatMap(child=>runs(child,style))})];
  const next={...style,...(['strong','b'].includes(tag)?{bold:true}:{}),...(['em','i'].includes(tag)?{italics:true}:{}),...(tag==='u'?{underline:{}}:{}),...(['s','strike','del'].includes(tag)?{strike:true}:{})};
  return Array.from(node.childNodes).flatMap(child=>runs(child,next));
 }
 function paragraphs(value:string){
  const root=document.createElement('div');root.innerHTML=manuscriptExportHtml(value);const output:InstanceType<typeof Paragraph>[]=[];
  function visit(node:Node){if(node.nodeType===3){if(node.textContent?.trim())output.push(new Paragraph({children:runs(node)}));return}if(node.nodeType!==1)return;const tag=(node as Element).tagName.toLowerCase();
   if(['p','h1','h2','h3','blockquote','li'].includes(tag)){const heading=tag==='h1'?HeadingLevel.HEADING_1:tag==='h2'?HeadingLevel.HEADING_2:tag==='h3'?HeadingLevel.HEADING_3:undefined;const content=node.cloneNode(true) as Element;content.querySelectorAll('ol,ul').forEach(list=>list.remove());const ordered=tag==='li'&&node.parentElement?.tagName.toLowerCase()==='ol';const prefix=ordered?[new TextRun({text:`${Array.from(node.parentElement!.children).indexOf(node as Element)+1}. `})]:[];output.push(new Paragraph({children:[...prefix,...runs(content)],heading,...(tag==='li'&&!ordered?{bullet:{level:0}}:{}),spacing:{after:160,line:360}}));if(tag==='li')Array.from(node.childNodes).filter(child=>child.nodeType===1&&['ol','ul'].includes((child as Element).tagName.toLowerCase())).forEach(visit)}else Array.from(node.childNodes).forEach(visit);
  }Array.from(root.childNodes).forEach(visit);return output;
 }
 const children:InstanceType<typeof Paragraph>[]=[];
 children.push(new Paragraph({text:novel.title,heading:HeadingLevel.TITLE,alignment:AlignmentType.CENTER}));
 if(info.includeCover){if(info.subtitle)children.push(new Paragraph({text:info.subtitle,alignment:AlignmentType.CENTER}));if(info.author)children.push(new Paragraph({text:info.author,alignment:AlignmentType.CENTER}));if(novel.genre)children.push(new Paragraph({text:novel.genre,alignment:AlignmentType.CENTER}));}
 for(const chapter of novel.chapters)children.push(new Paragraph({text:chapter.title,heading:HeadingLevel.HEADING_1,pageBreakBefore:true}),...paragraphs(chapter.text));
 const sizes=info.paper==='A5'?{width:8391,height:11906}:info.paper==='letter'?{width:12240,height:15840}:{width:11906,height:16838};
 const doc=new Document({title:novel.title,creator:info.author,description:novel.synopsis||info.subtitle,styles:{default:{document:{run:{font,size:info.fontSize*2},paragraph:{spacing:{line:360,after:160}}}}},sections:[{properties:{page:{size:sizes,margin:{top:1134,bottom:1134,left:1134,right:1134}}},footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:[PageNumber.CURRENT]})]})]})},children}]});
 download(await Packer.toBlob(doc),name(novel.title)+'.docx');
}
