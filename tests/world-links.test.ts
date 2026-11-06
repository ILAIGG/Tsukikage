import {test} from 'node:test';
import assert from 'node:assert/strict';
import type {Entry,Novel} from '../src/model';
import {duplicatePlace,entryAppearances,filterPlaces,placeAncestors,removeWorldEntry} from '../src/world-links';
const places:Entry[]=[{id:'country',kind:'place',name:'Reino',description:'',place:{type:'region'}},{id:'city',kind:'place',name:'Ciudad',description:'',place:{type:'city',parentId:'country'}},{id:'palace',kind:'place',name:'Palacio',description:'<p>Antiguo.</p>',place:{type:'building',parentId:'city',aliases:'Alcázar',guided:{origin:'<p>Un refugio.</p>'},answerStates:{danger:'pending'}}},{id:'room',kind:'place',name:'Biblioteca',description:'',place:{type:'room',parentId:'palace'}}];
test('place filters combine alias searches, accents, type and direct parent',()=>{
 assert.deepEqual(filterPlaces(places,'alcazar','building','city').map(e=>e.id),['palace']);
 assert.equal(filterPlaces(places,'alcazar','room').length,0);
 assert.deepEqual(filterPlaces(places,'','all','none').map(e=>e.id),['country']);
 assert.deepEqual(filterPlaces(places,'','all','palace').map(e=>e.id),['room']);
});
test('full ancestry is root-first and terminates on missing or cyclic parents',()=>{
 assert.deepEqual(placeAncestors(places,places[3]).map(e=>e.id),['country','city','palace']);
 assert.deepEqual(placeAncestors(places,{...places[3],place:{parentId:'missing'}}),[]);
 const cycle=[{...places[0],place:{parentId:'city'}},places[1]];
 assert.deepEqual(placeAncestors(cycle,cycle[0]).map(e=>e.id),['city']);
});
test('duplicating a place copies its description and hierarchy without sharing objects or chapter assignments',()=>{
 const source={...places[2],chapterId:'c1'};const original=JSON.stringify(source);const first=duplicatePlace(source,places,'es','copy');const second=duplicatePlace(source,[...places,first],'es','copy2');
 assert.equal(first.name,'Palacio (copia)');assert.equal(second.name,'Palacio (copia) 2');assert.equal(first.place?.parentId,'city');assert.equal(first.chapterId,undefined);
 first.place!.guided!.origin='Distinto';assert.equal(JSON.stringify(source),original);assert.equal(places[3].place?.parentId,'palace');
 assert.equal(duplicatePlace(source,places,'en','copy3').name,'Palacio (copy)');
});
const character:Entry={id:'hero',kind:'character',name:'Lía',description:'',character:{placeLinks:[{placeId:'palace',role:'home'},{placeId:'palace',role:'work'}],relatedCharacterIds:['other']}};
const novel:Novel={id:'novel',title:'Historia',genre:'',updated:'',entries:[...places,character,{id:'note',kind:'note',name:'Nota',description:'Conservar',chapterId:'c1'}],chapters:[{id:'c1',title:'Uno',text:'<p>Texto</p>',characterIds:['hero'],placeIds:['palace'],scenes:[{id:'s1',title:'Escena',text:'<p>Texto</p>',characterIds:['hero'],placeIds:['room']}]},{id:'c2',title:'Dos',text:'',scenes:[{id:'s2',title:'Otra',text:'',characterIds:['hero'],placeIds:['palace']}]}]};
test('reverse appearances include scene-only appearances once per chapter',()=>{
 const matches=entryAppearances(novel.chapters,character);assert.equal(matches.length,2);assert.equal(matches[0].explicit,true);assert.equal(matches[1].explicit,false);assert.equal(matches[1].scenes[0].id,'s2');
 const palace=entryAppearances(novel.chapters,places[2]);assert.equal(palace[0].explicit,true);assert.equal(palace[1].scenes[0].id,'s2');
 assert.equal(entryAppearances(novel.chapters,{...places[0],chapterId:'c2'})[0].explicit,true);
});
test('removing a world entry cleans references while preserving manuscripts, children and notes',()=>{
 const snapshot=JSON.stringify(novel);const removed=removeWorldEntry(novel,'palace');assert(!removed.entries!.some(e=>e.id==='palace'));
 assert.equal(removed.entries!.find(e=>e.id==='room')!.place?.parentId,undefined);assert.deepEqual(removed.chapters[0].placeIds,[]);assert.deepEqual(removed.chapters[1].scenes![0].placeIds,[]);
 assert.deepEqual(removed.entries!.find(e=>e.id==='hero')!.character!.placeLinks,[]);assert.deepEqual(removed.entries!.find(e=>e.id==='note'),novel.entries!.find(e=>e.id==='note'));
 assert.equal(removed.chapters[0].text,novel.chapters[0].text);assert.deepEqual(removed.chapters[0].scenes![0].placeIds,['room']);assert.equal(JSON.stringify(novel),snapshot);
 const noHero=removeWorldEntry(novel,'hero');assert.deepEqual(noHero.chapters[0].characterIds,[]);assert.deepEqual(noHero.chapters[1].scenes![0].characterIds,[]);
});
