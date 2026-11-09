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

test('embedded raster images are safe and preserved in EPUB, DOCX and PDF',async()=>{
 const src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a22sAAAAASUVORK5CYII=';
 const text=`<p>Illustrated chapter</p><img src="${src}" alt="Moon sketch" data-image-width="1" data-image-height="1" data-image-size="50">`;
 assert.match(sanitizeHtml(text),/<img/);assert.doesNotMatch(sanitizeHtml('<img src="https://example.org/track.png"><img src="data:image/svg+xml;base64,PHN2Zy8+"><img src="x" onerror="alert(1)">'),/<img|onerror/);
 const book={...novel,chapters:[{...novel.chapters[0],text}]};
 const epub=await captured(()=>exportEpub(book));assert(epub.file('OEBPS/images/image-1.png'));assert.match(await epub.file('OEBPS/chapter-1.xhtml')!.async('text'),/src="images\/image-1.png"/);assert.match(await epub.file('OEBPS/content.opf')!.async('text'),/media-type="image\/png"/);
 const docx=await captured(()=>exportDocx(book));assert(Object.keys(docx.files).some(path=>path.startsWith('word/media/')&&path.endsWith('.png')));assert.match(await docx.file('word/document.xml')!.async('text'),/Moon sketch/);
 assert.match(printBookHtml(book,sanitizeHtml),/data:image\/png;base64/);
 const {serializeWorkspaceBackup,parseWorkspaceBackup}=await import('../src/backup');const {defaultSettings}=await import('../src/model');const project={...book,chapters:[{...book.chapters[0],scenes:[{id:'image-scene',title:'Image scene',text,description:''}]}]};const restored=parseWorkspaceBackup(serializeWorkspaceBackup({novels:[project],settings:defaultSettings}));assert(restored.novels[0].chapters[0].text.includes(src));
});
