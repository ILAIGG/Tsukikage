import 'fake-indexeddb/auto';
import assert from 'node:assert/strict';import {test} from 'node:test';import {Window} from 'happy-dom';
const browser=new Window({url:'http://localhost/'});Object.defineProperty(globalThis,'window',{value:browser});Object.defineProperty(globalThis,'document',{value:browser.document});Object.defineProperty(globalThis,'Node',{value:browser.Node});
const {checkpoint,restoreProject,createFromTemplate}=await import('../src/project-tools');
const {createSampleProject}=await import('../src/sample-project');const {defaultSettings}=await import('../src/model');
const {parseWorkspaceBackup,serializeWorkspaceBackup,serializeProjectBackup,mergeProjectBackup}=await import('../src/backup');const {saveWorkspace,loadWorkspace}=await import('../src/storage');
test('complete restore preserves a return point and leaves other stories and preferences intact',()=>{
 let workspace=checkpoint({novels:[...createSampleProject('es'),{...createSampleProject('en')[0],id:'other'}],settings:defaultSettings},'moon','Original');const snapshot=workspace.projectHistory!.moon[0];const original=structuredClone(workspace.novels[0]);
 workspace.novels[0].title='Edited';workspace.novels[0].entries=[];workspace.novels[0].chapters=[];
 const restored=restoreProject(workspace,'moon',snapshot.id,'Before restore');assert.deepEqual(restored.novels[0],original);assert.equal(restored.novels[1].id,'other');assert.deepEqual(restored.settings,defaultSettings);assert.equal(restored.projectHistory!.moon[0].novel.title,'Edited');
 assert.equal(restoreProject(workspace,'other',snapshot.id,'Invalid'),workspace);
});
test('snapshots are bounded and independent',()=>{
 let workspace:{novels:import('../src/model').Novel[];settings:typeof defaultSettings;projectHistory?:import('../src/model').Workspace['projectHistory']}={novels:createSampleProject('en'),settings:defaultSettings};
 for(let i=0;i<12;i++)workspace=checkpoint(workspace,'moon',String(i));assert.equal(workspace.projectHistory!.moon.length,10);workspace.novels[0].chapters[0].text='Changed';assert.notEqual(workspace.projectHistory!.moon[0].novel.chapters[0].text,'Changed');
});
test('templates remap chapter, scene and world links without sharing content objects',()=>{
 const source=createSampleProject('en')[0];const template={id:'template',name:'Example',createdAt:'2026-11-09',project:source};const copy=createFromTemplate(template,'New project');
 const oldIds=new Set([source.id,...source.chapters.flatMap(c=>[c.id,...c.scenes!.map(s=>s.id)]),...source.entries!.map(e=>e.id)]);assert(!oldIds.has(copy.id));assert.equal(copy.title,'New project');
 const ids=new Set(copy.entries!.map(e=>e.id));for(const chapter of copy.chapters){assert(!oldIds.has(chapter.id));for(const id of [...chapter.characterIds!,...chapter.placeIds!])assert(ids.has(id));for(const scene of chapter.scenes!){assert(!oldIds.has(scene.id));for(const id of [...scene.characterIds!,...scene.placeIds!])assert(ids.has(id))}}
 for(const entry of copy.entries!){if(entry.place?.parentId)assert(ids.has(entry.place.parentId));for(const id of entry.character?.relatedCharacterIds||[])assert(ids.has(id));for(const id of Object.keys(entry.character?.relationshipLabels||{}))assert(ids.has(id));if(entry.chapterId)assert(copy.chapters.some(c=>c.id===entry.chapterId))}
 assert.deepEqual(copy.chapters.map(c=>c.text),source.chapters.map(c=>c.text));copy.entries![0].name='Changed';assert.notEqual(source.entries![0].name,'Changed');assert.equal(copy.writingSession,undefined);assert.deepEqual(copy.revisions,{});
});
test('history and templates survive IndexedDB and complete JSON backups',async()=>{
 const workspace=checkpoint({novels:createSampleProject('es'),settings:defaultSettings,storyTemplates:[{id:'t',name:'Template',createdAt:'2026-11-09',project:createSampleProject('en')[0]}]},'moon','Saved');await saveWorkspace(workspace);const stored=await loadWorkspace();assert.deepEqual(stored.projectHistory,workspace.projectHistory);assert.deepEqual(stored.storyTemplates,workspace.storyTemplates);
 const restored=parseWorkspaceBackup(serializeWorkspaceBackup(stored));assert.equal(restored.projectHistory!.moon[0].label,'Saved');assert.equal(restored.storyTemplates![0].name,'Template');assert.equal(restored.storyTemplates![0].project.entries!.length,workspace.storyTemplates![0].project.entries!.length);
});

test('imported history treats unusual IDs as data and rejects cross-project snapshots',()=>{
 const novel=createSampleProject('en')[0];novel.id='__proto__';const snapshot={id:'snapshot',at:'2026-11-09',label:'Version',novel};const history=Object.fromEntries([['__proto__',[snapshot]]]);const parsed=parseWorkspaceBackup(serializeWorkspaceBackup({novels:[novel],settings:defaultSettings,projectHistory:history}));
 assert.equal(Object.getPrototypeOf(parsed.projectHistory),null);assert.equal(parsed.projectHistory!['__proto__'][0].novel.id,'__proto__');
 const wrong={...snapshot,novel:{...novel,id:'another-project'}};assert.throws(()=>parseWorkspaceBackup(serializeWorkspaceBackup({novels:[novel],settings:defaultSettings,projectHistory:{project:[wrong]}})));
});

test('single-project backups preserve full history and merge without replacing other projects or preferences',()=>{
 const novels=createSampleProject('en');for(const chapter of novels[0].chapters){chapter.text='<p>Preserved manuscript</p>';chapter.scenes=[{id:chapter.id+'-scene',title:'Scene',text:chapter.text,description:'Description'}]}const original=checkpoint({novels,settings:defaultSettings},'moon','Original');
 const serialized=serializeProjectBackup(original,'moon');assert.deepEqual(JSON.parse(serialized).novels,original.novels);const exported=parseWorkspaceBackup(serialized);const baseline=parseWorkspaceBackup(serializeWorkspaceBackup(original));
 assert.equal(exported.novels.length,1);assert.deepEqual(exported.novels,baseline.novels);assert.deepEqual(exported.projectHistory,baseline.projectHistory);
 const other={...original.novels[0],id:'other',title:'Other story'};const current={novels:[other],settings:{...defaultSettings,fontSize:20},storyTemplates:[]};
 const added=mergeProjectBackup(current,exported);assert.equal(added.novels.length,2);assert.equal(added.novels[0],other);assert.equal(added.settings,current.settings);assert.equal(added.storyTemplates,current.storyTemplates);
 const replaced=mergeProjectBackup(added,{...exported,novels:[{...exported.novels[0],title:'Imported revision'}]});assert.equal(replaced.novels.length,2);assert.equal(replaced.novels[1].title,'Imported revision');assert.equal(replaced.novels[0],other);
 assert.throws(()=>mergeProjectBackup(current,{...exported,novels:[]}));assert.throws(()=>mergeProjectBackup(current,{...exported,novels:[other,...exported.novels]}));
});

test('wiki references survive project backups and remap to independent template targets',async()=>{
 const {wikiHref,parseWikiHref}=await import('../src/wiki-links');
 assert.deepEqual(parseWikiHref(wikiHref('character','name / á')),{kind:'character',id:'name / á'});assert.equal(parseWikiHref('javascript:alert(1)'),null);assert.equal(parseWikiHref('#tsukikage/character/%broken'),null);
 const project=createSampleProject('en')[0];const target=project.entries![0];const html=`<p><a href="${wikiHref(target.kind,target.id)}">Reference</a></p>`;project.chapters[0].text=html;project.chapters[0].scenes![0].text=html;project.entries![1].description=html;
 const raw=JSON.parse(serializeProjectBackup({novels:[project],settings:defaultSettings},project.id));assert.equal(raw.novels[0].chapters[0].text,html);
 const copy=createFromTemplate({id:'t',name:'t',createdAt:'now',project},'Copy');const newHref=wikiHref(copy.entries![0].kind,copy.entries![0].id);assert(copy.chapters[0].text.includes(newHref));assert(copy.chapters[0].scenes![0].text.includes(newHref));assert(copy.entries![1].description.includes(newHref));assert.equal(project.chapters[0].text,html);
});
