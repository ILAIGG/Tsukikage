import assert from 'node:assert/strict';import {test} from 'node:test';import JSZip from 'jszip';import {Window} from 'happy-dom';
const browser=new Window({url:'http://localhost/'});Object.defineProperty(globalThis,'window',{value:browser});Object.defineProperty(globalThis,'document',{value:browser.document});Object.defineProperty(globalThis,'Node',{value:browser.Node});
const {exportEpub,exportDocx,sanitizeHtml}=await import('../src/export');const {printBookHtml}=await import('../src/publication');const {createSampleProject}=await import('../src/sample-project');
const novel=createSampleProject('en')[0];novel.publication={author:'A & B',subtitle:'A moonlit story',language:'en',font:'sans',fontSize:14,paper:'a5',includeCover:true};
novel.chapters[0].text='<h2>Heading</h2><p><strong>Bold</strong> <em>Italic</em> <u>Underline</u><br>Line</p><ol><li>First</li><li>Second</li></ol><p><a href="https://example.org">Link</a></p>';
async function captured(fn:()=>Promise<void>){let blob:Blob|undefined;URL.createObjectURL=((value:Blob)=>{blob=value;return 'blob:test'}) as typeof URL.createObjectURL;await fn();assert(blob);return JSZip.loadAsync(blob!)}
test('EPUB contains localized metadata, a real cover and XML-safe chapter markup',async()=>{
 const zip=await captured(()=>exportEpub(novel));const opf=await zip.file('OEBPS/content.opf')!.async('text');assert.match(opf,/<dc:language>en/);assert.match(opf,/A &amp; B/);assert.match(opf,/A moonlit story/);assert.match(opf,/properties="cover-image"/);assert(zip.file('OEBPS/cover.svg'));const chapter=await zip.file('OEBPS/chapter-1.xhtml')!.async('text');assert.match(chapter,/<br\s*\/>/);assert.match(chapter,/<strong/);assert.match(await zip.file('OEBPS/style.css')!.async('text'),/sans-serif/);
});
test('DOCX has metadata, chapter page breaks, paper dimensions and rich formatting',async()=>{
 const zip=await captured(()=>exportDocx(novel));const xml=await zip.file('word/document.xml')!.async('text');assert.match(xml,/w:pageBreakBefore/);assert.match(xml,/w:w="8391"/);assert.match(xml,/w:b\b/);assert.match(xml,/w:i\b/);assert.match(xml,/w:u\b/);assert.match(xml,/w:hyperlink/);assert.match(xml,/1\. /);assert.match(await zip.file('docProps/core.xml')!.async('text'),/A &amp; B/);
});
test('print layout respects publication settings and escapes cover text',()=>{
 const html=printBookHtml(novel,sanitizeHtml);assert.match(html,/@page\{size:A5/);assert.match(html,/14pt/);assert.match(html,/A &amp; B/);assert.match(html,/lang="en"/);assert.doesNotMatch(html,/<script/);
 const without=printBookHtml({...novel,publication:{includeCover:false}},sanitizeHtml);assert.doesNotMatch(without,/<section class="book-cover">/);
});
