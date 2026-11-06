import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createSampleProject} from '../src/sample-project';
import {preferredLanguage} from '../src/model';
for(const language of ['es','en'] as const)test(`sample story is complete and connected in ${language}`,()=>{
 const [novel]=createSampleProject(language);
 assert.equal(novel.chapters.length,3);
 assert.match(novel.genre,language==='es'?/Proyecto de prueba/:/Sample project/);
 const entries=novel.entries!;const ids=new Set(entries.map(e=>e.id));
 assert.equal(ids.size,entries.length);
 assert.equal(entries.filter(e=>e.kind==='character').length,3);
 assert.equal(entries.filter(e=>e.kind==='note').length,3);
 for(const chapter of novel.chapters){
  assert.equal(chapter.scenes?.length,2);
  assert(chapter.text.length>1500);
  for(const scene of chapter.scenes!){assert(scene.text.length>700);for(const id of [...scene.characterIds!,...scene.placeIds!])assert(ids.has(id));}
 }
 for(const entry of entries){
  if(entry.place?.parentId)assert(ids.has(entry.place.parentId));
  for(const id of entry.character?.relatedCharacterIds||[])assert(ids.has(id));
  for(const link of entry.character?.placeLinks||[])assert(ids.has(link.placeId));
 }
 const fresh=createSampleProject(language);novel.chapters[0].text='Edited';assert.notEqual(fresh[0].chapters[0].text,'Edited');
});
test('first visit language follows supported browser preferences',()=>{
 assert.equal(preferredLanguage(['fr','en-GB','es']),'en');
 assert.equal(preferredLanguage(['es-AR','en']),'es');
});
