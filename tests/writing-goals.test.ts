import assert from 'node:assert/strict';
import {test} from 'node:test';
import {Window} from 'happy-dom';
const window=new Window();Object.defineProperty(globalThis,'window',{value:window});Object.defineProperty(globalThis,'document',{value:window.document});
const {writingProgress}=await import('../src/components/WritingGoals');
const {createSampleProject}=await import('../src/sample-project');
const {defaultSettings}=await import('../src/model');
const {parseWorkspaceBackup,serializeWorkspaceBackup}=await import('../src/backup');
test('writing goals count net growth without negative or overflowing progress',()=>{
 assert.deepEqual(writingProgress(110,20,100),{written:10,percent:50,complete:false});
 assert.deepEqual(writingProgress(90,20,100),{written:0,percent:0,complete:false});
 assert.deepEqual(writingProgress(130,20,100),{written:30,percent:100,complete:true});
 assert.equal(writingProgress(130,0).complete,false);
});
test('project and active session goals survive JSON without changing chapter content',()=>{
 const novels=createSampleProject('es');const baseline=parseWorkspaceBackup(serializeWorkspaceBackup({novels,settings:defaultSettings}));
 novels[0].wordGoal=50000;novels[0].writingSession={targetWords:500,baselineWords:1000,startedAt:'2026-11-09T12:00:00.000Z'};
 const restored=parseWorkspaceBackup(serializeWorkspaceBackup({novels,settings:defaultSettings}));
 assert.equal(restored.novels[0].wordGoal,50000);assert.deepEqual(restored.novels[0].writingSession,novels[0].writingSession);assert.deepEqual(restored.novels[0].chapters,baseline.novels[0].chapters);
});
