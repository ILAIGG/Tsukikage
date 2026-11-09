import 'fake-indexeddb/auto';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import JSZip from 'jszip';
import { Window } from 'happy-dom';

const browser = new Window({ url: 'http://localhost/' });
Object.defineProperty(globalThis, 'window', { configurable: true, value: browser });
Object.defineProperty(globalThis, 'document', { configurable: true, value: browser.document });
Object.defineProperty(globalThis, 'Node', { configurable: true, value: browser.Node });

const { parseWorkspaceBackup, serializeWorkspaceBackup } = await import('../src/backup');
const { defaultSettings } = await import('../src/model');
type Novel = import('../src/model').Novel;
type Workspace = import('../src/model').Workspace;
const { clearPendingRecovery, loadPendingRecovery, loadWorkspace, savePendingRecovery, saveWorkspace } = await import('../src/storage');
const { exportDocx, exportEpub, exportPdf } = await import('../src/export');

function makeLargeWorkspace(): Workspace {
  const text = `<p>${'Lía cruzó la ciudad bajo la luna y anotó cada detalle. '.repeat(170)}</p>`;
  const novels: Novel[] = Array.from({ length: 3 }, (_, project) => ({
    id: `project-${project}`,
    title: `Proyecto ${project + 1}`,
    genre: 'Fantasía',
    updated: 'Ahora',
    chapters: Array.from({ length: 60 }, (_, chapter) => ({
      id: `chapter-${project}-${chapter}`,
      title: `Capítulo ${chapter + 1}`,
      text,
    })),
  }));
  return { novels, settings: defaultSettings };
}

test('backup JSON round-trips a multi-project workspace with long manuscripts', () => {
  const workspace = makeLargeWorkspace();
  const backup = serializeWorkspaceBackup(workspace, '2026-11-04T00:00:00.000Z');
  const restored = parseWorkspaceBackup(backup);
  assert.equal(restored.novels.length, 3);
  assert.equal(restored.novels[2].chapters.length, 60);
  assert.equal(restored.novels[2].chapters[59].text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(), workspace.novels[2].chapters[59].text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  assert.equal(restored.settings.theme, workspace.settings.theme);
});

test('IndexedDB saves large workspaces and offers a newer unsaved chapter for recovery', async () => {
  const workspace = makeLargeWorkspace();
  await saveWorkspace(workspace);
  const loaded = await loadWorkspace();
  assert.equal(loaded.novels[0].chapters.length, 60);
  const chapter = { ...loaded.novels[0].chapters[0], text: '<p>Recovered draft</p>' };
  const recovery = { id: 'project-0:chapter-0-0', novelId: 'project-0', chapterId: 'chapter-0-0', chapter, createdAt: Date.now() };
  await savePendingRecovery(recovery);
  const reloaded = await loadWorkspace();
  assert.equal((await loadPendingRecovery(reloaded.novels))?.chapter.text, chapter.text);
  loaded.novels[0].chapters[0] = chapter;
  await saveWorkspace(loaded);
  assert.equal(await loadPendingRecovery(loaded.novels), undefined);
  await clearPendingRecovery(recovery.id);
});

test('EPUB export contains all chapters from a large project', async () => {
  let exported: Blob | undefined;
  const createElement = browser.document.createElement.bind(browser.document);
  browser.document.createElement = ((tagName: string, options?: ElementCreationOptions) => {
    const element = createElement(tagName, options);
    if (tagName.toLowerCase() === 'a') element.click = () => {};
    return element;
  }) as typeof browser.document.createElement;
  URL.createObjectURL = ((blob: Blob) => { exported = blob; return 'blob:tsukikage-test'; }) as typeof URL.createObjectURL;
  URL.revokeObjectURL = (() => {}) as typeof URL.revokeObjectURL;
  const novel = makeLargeWorkspace().novels[0];
  await exportEpub(novel);
  assert.ok(exported);
  const zip = await JSZip.loadAsync(exported!);
  assert.equal(Object.keys(zip.files).filter(name => /chapter-\d+\.xhtml$/.test(name)).length, novel.chapters.length);
  assert.match(await zip.file('OEBPS/chapter-60.xhtml')!.async('text'), /Capítulo 60/);
});


test('DOCX and print-ready PDF handle a long manuscript', async () => {
  let exported: Blob | undefined;
  URL.createObjectURL = ((blob: Blob) => { exported = blob; return 'blob:tsukikage-test'; }) as typeof URL.createObjectURL;
  const novel = makeLargeWorkspace().novels[0];
  await exportDocx(novel);
  assert.ok(exported);
  const docx = await JSZip.loadAsync(exported!);
  const documentXml = await docx.file('word/document.xml')!.async('text');
  assert.match(documentXml, /Capítulo 60/);
  let printHtml = '';
  browser.open = (() => ({ document: { write: (html: string) => { printHtml = html; }, close() {} } })) as typeof browser.open;
  exportPdf(novel);
  assert.equal((printHtml.match(/<h2\b/g)||[]).length, novel.chapters.length);
  assert.match(printHtml, /Capítulo 60/);
});


test('character portraits, interview answers and relationships survive storage and JSON backups', async()=>{
 const character={firstName:'Lía',surname:'Sol',nickname:'La campana',birthDate:'1998-06-15',image:'data:image/webp;base64,UklGRg==',role:'protagonist',descriptionMode:'guided' as const,guided:{gender:'<p><em>Una mujer.</em></p>',custom:'Un recuerdo antiguo'},relationshipMode:'graph' as const,relatedCharacterIds:['noa'],relationshipLabels:{noa:'Hermano'},relationshipNotes:'<p>Se protegen mutuamente.</p>'};
 const workspace:Workspace={settings:defaultSettings,novels:[{id:'characters',title:'Personajes',genre:'',updated:'',chapters:[],entries:[{id:'lia',kind:'character',name:'Lía Sol',description:'<p>Guardiana.</p>',character},{id:'noa',kind:'character',name:'Noa',description:''}]}]};
 await saveWorkspace(workspace);
 const stored=await loadWorkspace();
 const {relationshipMode,relationshipNotes,...rest}=character;const expected={...rest,guided:{...character.guided,relationships:relationshipNotes}};
 assert.deepEqual(stored.novels[0].entries?.[0].character,expected);
 const restored=parseWorkspaceBackup(serializeWorkspaceBackup(stored));
 assert.deepEqual(restored.novels[0].entries?.[0].character,expected);
 assert.equal(restored.novels[0].entries?.[1].id,'noa');
});

test('place hierarchy, image, aliases, rich answers and statuses survive storage and backup',async()=>{
 const profile={type:'room' as const,aliases:'La cámara',parentId:'palace',image:'data:image/webp;base64,UklGRg==',descriptionMode:'guided' as const,guided:{objects:'<p><em>Una silla gastada.</em></p>'},answerStates:{origin:'pending' as const,climate:'notApplicable' as const}};
 const workspace:Workspace={settings:defaultSettings,novels:[{id:'places',title:'Mundo',genre:'',updated:'',chapters:[],entries:[{id:'room',name:'Cuarto',kind:'place',description:'<p>Antiguo.</p>',place:profile},{id:'palace',name:'Palacio',kind:'place',description:'Texto antiguo sin formato'}]}]};
 await saveWorkspace(workspace);const stored=await loadWorkspace();const restored=parseWorkspaceBackup(serializeWorkspaceBackup(stored));
 assert.deepEqual(restored.novels[0].entries?.[0].place,profile);
 assert.equal(restored.novels[0].entries?.[1].description,'Texto antiguo sin formato');
});

test('chapter and scene appearances and character-place links survive migration, storage and JSON backup',async()=>{
 const workspace:Workspace={settings:defaultSettings,novels:[{id:'links',title:'Vínculos',genre:'',updated:'',chapters:[{id:'chapter',title:'Capítulo',text:'<p>Texto</p>',characterIds:['hero'],placeIds:['city'],scenes:[{id:'scene',title:'Escena',text:'<p>Texto</p>',characterIds:['hero'],placeIds:['room']}]}],entries:[{id:'hero',name:'Lía',kind:'character',description:'',character:{placeLinks:[{placeId:'room',role:'birth'},{placeId:'city',role:'home'}]}},{id:'city',name:'Ciudad',kind:'place',description:''},{id:'room',name:'Habitación',kind:'place',description:'',place:{parentId:'city'}}]}]};
 await saveWorkspace(workspace);const stored=await loadWorkspace();const restored=parseWorkspaceBackup(serializeWorkspaceBackup(stored));
 for(const w of [stored,restored]){const c=w.novels[0].chapters[0];assert.deepEqual(c.characterIds,['hero']);assert.deepEqual(c.placeIds,['city']);assert.deepEqual(c.scenes![0].characterIds,['hero']);assert.deepEqual(c.scenes![0].placeIds,['room']);assert.deepEqual(w.novels[0].entries![0].character!.placeLinks,workspace.novels[0].entries![0].character!.placeLinks);}
});


test('legacy world-to-chapter links become editable appearances while note chapter links remain unchanged',async()=>{
 const workspace:Workspace={settings:defaultSettings,novels:[{id:'legacy-links',title:'Antes',genre:'',updated:'',chapters:[{id:'c',title:'Uno',text:'',characterIds:['hero']}],entries:[{id:'hero',kind:'character',name:'Lía',description:'',chapterId:'c'},{id:'home',kind:'place',name:'Casa',description:'',chapterId:'c'},{id:'note',kind:'note',name:'Nota',description:'Conservar',chapterId:'c'}]}]};
 const restored=parseWorkspaceBackup(serializeWorkspaceBackup(workspace));const n=restored.novels[0];
 assert.deepEqual(n.chapters[0].characterIds,['hero']);assert.deepEqual(n.chapters[0].placeIds,['home']);
 assert.equal(n.entries![0].chapterId,undefined);assert.equal(n.entries![1].chapterId,undefined);assert.equal(n.entries![2].chapterId,'c');
 const twice=parseWorkspaceBackup(serializeWorkspaceBackup(restored));assert.deepEqual(twice.novels[0],n);
});
