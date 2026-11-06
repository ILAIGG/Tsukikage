import assert from 'node:assert/strict';
import {test} from 'node:test';
import {Window} from 'happy-dom';
const browser=new Window({url:'http://localhost/'});
Object.defineProperty(globalThis,'window',{value:browser,configurable:true});
Object.defineProperty(globalThis,'document',{value:browser.document,configurable:true});
const {characterTextHtml,characterPlainText,hasCharacterText,characterGuidePreview,migrateCharacterRelationships,hasCharacterGraph}=await import('../src/character-text');
test('legacy plain descriptions retain line breaks and literal special characters',()=>{
 assert.equal(characterTextHtml('A & B\n2 < 3'),'<p>A &amp; B</p><p>2 &lt; 3</p>');
 assert.equal(characterTextHtml(''), '');
});
test('formatted responses preserve emphasis and lists',()=>{
 const safe=characterTextHtml('<p><strong>Fuerte</strong> y <em>serena</em></p><ul><li>Lee</li></ul>');
 assert.match(safe,/<strong>Fuerte<\/strong>/);assert.match(safe,/<em>serena<\/em>/);assert.match(safe,/<ul><li>Lee<\/li><\/ul>/);

});
test('empty rich answers remain unanswered and previews contain readable text',()=>{
 assert.equal(hasCharacterText('<p><br></p>'),false);assert.equal(hasCharacterText('<p>&nbsp;</p>'),false);
 assert.equal(hasCharacterText('<p><strong>Un recuerdo</strong></p>'),true);
 assert.equal(characterPlainText('2 < 3'),'2 < 3');
 const preview=characterGuidePreview({height:'<p><strong>Muy alta</strong></p>'},'es');
 assert.match(preview,/Altura: Muy alta/);assert.doesNotMatch(preview,/<\/?p|<\/?strong/);
});


test('standalone relationship notes merge into the existing guided answer without losing formatting or graph data',()=>{
 const profile={guided:{family:'Una hermana.',relationships:'<p><strong>Una antigua maestra.</strong></p>',trust:'Le cuesta confiar.'},relationshipNotes:'Confía en su hermano & teme perderlo.',relationshipMode:'graph' as const,relatedCharacterIds:['brother'],relationshipLabels:{brother:'Hermano'}};
 const original=JSON.stringify(profile);const result=migrateCharacterRelationships(profile);
 assert.match(result.guided!.relationships,/<strong>Una antigua maestra.<\/strong>/);assert.match(result.guided!.relationships,/hermano &amp; teme/);
 assert.equal(result.guided!.family,profile.guided.family);assert.equal(result.guided!.trust,profile.guided.trust);assert.equal(result.relationshipNotes,undefined);assert.equal(result.relationshipMode,undefined);
 assert.deepEqual(result.relatedCharacterIds,['brother']);assert.deepEqual(result.relationshipLabels,{brother:'Hermano'});assert.deepEqual(migrateCharacterRelationships(result),result);assert.equal(JSON.stringify(profile),original);
 const duplicate=migrateCharacterRelationships({guided:{relationships:'<p>Ya existe.</p>'},relationshipNotes:'Ya existe.'});assert.equal(duplicate.guided!.relationships,'<p>Ya existe.</p>');
});
test('graph completion recognises incoming relationships and ignores missing or self references',()=>{
 const current={id:'hero',kind:'character' as const,name:'Hero',description:'',character:{relatedCharacterIds:['hero','missing']}};
 assert.equal(hasCharacterGraph(current,[current]),false);assert.equal(hasCharacterGraph(current,[current,{id:'friend',kind:'character',name:'Friend',description:'',character:{relatedCharacterIds:['hero']}}]),true);
});
