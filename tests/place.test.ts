import assert from 'node:assert/strict';
import {test} from 'node:test';
import {canContainPlace,placeGuide,questionsForPlace} from '../src/place-guide';
import type {Entry} from '../src/model';
const place=(id:string,parentId?:string):Entry=>({id,name:id,kind:'place',description:'',place:{parentId}});
test('place ancestry prevents self, indirect and existing cycles; rejects other kinds or projects',()=>{
 const entries=[place('world'),place('city','world'),place('room','city'),{id:'note',name:'Note',kind:'note' as const,description:''}];
 assert(canContainPlace(entries,'room','city'));
 assert(!canContainPlace(entries,'world','room'));
 assert(!canContainPlace(entries,'city','city'));
 assert(!canContainPlace(entries,'room','note'));
 assert(!canContainPlace(entries,'room','another-project'));
 assert(canContainPlace(entries,'room',undefined));
 assert(!canContainPlace([place('a','b'),place('b','a')],'new','a'));
 assert(canContainPlace([place('a','missing')],'new','a'));
});
test('place questions adapt to scale and retain access to every question',()=>{
 const ids=(type:'room'|'city',all=false)=>questionsForPlace(type,all).flatMap(c=>c.questions.map(q=>q.id));
 assert(ids('room').includes('objects'));assert(!ids('city').includes('objects'));
 assert(ids('city').includes('resources'));assert(!ids('room').includes('resources'));
 assert.deepEqual(ids('room',true),ids('city',true));
 const questions=placeGuide.flatMap(c=>c.questions);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 for(const q of questions)for(const lang of ['es','en'] as const){assert(q.prompt[lang]);assert(q.example[lang]);assert.notEqual(q.prompt[lang],q.example[lang]);}
});
