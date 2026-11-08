import assert from 'node:assert/strict';
import {test} from 'node:test';
import {Window} from 'happy-dom';
const browser=new Window();Object.defineProperty(globalThis,'window',{value:browser,configurable:true});Object.defineProperty(globalThis,'document',{value:browser.document,configurable:true});
const {resolveCover}=await import('../src/components/StoryCover');
const {createSampleProject}=await import('../src/sample-project');
const {defaultSettings}=await import('../src/model');
const {parseWorkspaceBackup,serializeWorkspaceBackup}=await import('../src/backup');
test('legacy stories get a stable cover without mutating their data',()=>{
 const original={id:'legacy'};const first=resolveCover(original);assert.deepEqual(resolveCover(original),first);assert.deepEqual(original,{id:'legacy'});
});
test('cover and typography survive backups without changing manuscript text',()=>{
 const novels=createSampleProject('en');const baseline=parseWorkspaceBackup(serializeWorkspaceBackup({novels,settings:defaultSettings}));novels[0].cover={palette:'forest',style:'orbit'};
 const workspace={novels,settings:{...defaultSettings,writingFont:'sans' as const,writingLineHeight:2}};
 const restored=parseWorkspaceBackup(serializeWorkspaceBackup(workspace));
 assert.deepEqual(restored.novels[0].cover,novels[0].cover);assert.equal(restored.settings.writingFont,'sans');assert.equal(restored.settings.writingLineHeight,2);
 assert.deepEqual(restored.novels[0].chapters,baseline.novels[0].chapters);
});
test('legacy backups receive default reading preferences',()=>{
 const settings={...defaultSettings};delete settings.writingFont;delete settings.writingLineHeight;
 const restored=parseWorkspaceBackup(serializeWorkspaceBackup({novels:createSampleProject('es'),settings}));
 assert.equal(restored.settings.writingFont,'serif');assert.equal(restored.settings.writingLineHeight,1.8);
});
