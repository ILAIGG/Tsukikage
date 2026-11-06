import type { Chapter, Entry, Novel, PlaceType } from './model';
const searchable=(text:string)=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
export function placeAncestors(entries:Entry[],entry:Entry):Entry[]{
 const byId=new Map(entries.filter(e=>e.kind==='place').map(e=>[e.id,e]));
 const seen=new Set([entry.id]);const chain:Entry[]=[];let id=entry.place?.parentId;
 while(id&&!seen.has(id)){seen.add(id);const parent=byId.get(id);if(!parent)break;chain.unshift(parent);id=parent.place?.parentId;}
 return chain;
}
export function filterPlaces(entries:Entry[],query='',type:PlaceType|'all'='all',parentId='all'):Entry[]{
 const phrase=searchable(query.trim());
 return entries.filter(e=>e.kind==='place'&&(type==='all'||(e.place?.type||'other')===type)&&(parentId==='all'||(parentId==='none'?!e.place?.parentId:e.place?.parentId===parentId))&&(!phrase||searchable(`${e.name} ${e.place?.aliases||''}`).includes(phrase)));
}
export function duplicatePlace(source:Entry,entries:Entry[],language:'es'|'en',newId=crypto.randomUUID()):Entry{
 const copy=structuredClone(source);const base=`${source.name} (${language==='es'?'copia':'copy'})`;let name=base,index=2;
 while(entries.some(e=>e.kind==='place'&&e.name===name))name=`${base} ${index++}`;
 delete copy.chapterId;return {...copy,id:newId,name,kind:'place'};
}
export function entryAppearances(chapters:Chapter[],entry:Entry){
 const key=entry.kind==='character'?'characterIds':'placeIds';
 return chapters.flatMap(chapter=>{
  const scenes=(chapter.scenes||[]).filter(scene=>scene[key]?.includes(entry.id));
  const explicit=chapter[key]?.includes(entry.id)||entry.chapterId===chapter.id;
  return explicit||scenes.length?[{chapter,explicit:!!explicit,scenes}]:[];
 });
}
export function removeWorldEntry(novel:Novel,id:string):Novel{
 const clean=<T extends {characterIds?:string[];placeIds?:string[]}>(item:T):T=>({...item,...(item.characterIds?{characterIds:item.characterIds.filter(v=>v!==id)}:{}),...(item.placeIds?{placeIds:item.placeIds.filter(v=>v!==id)}:{})});
 return {...novel,chapters:novel.chapters.map(c=>({...clean(c),scenes:c.scenes?.map(clean)})),entries:(novel.entries||[]).filter(e=>e.id!==id).map(e=>({...e,...(e.kind==='place'&&e.place?.parentId===id?{place:{...e.place,parentId:undefined}}:{}),...(e.kind==='character'&&e.character?{character:{...e.character,relatedCharacterIds:e.character.relatedCharacterIds?.filter(v=>v!==id),placeLinks:e.character.placeLinks?.filter(v=>v.placeId!==id)}}:{})}))};
}

export function filterCharacters(entries:Entry[],query='',role='all',placeId='all'):Entry[]{
 const phrase=searchable(query.trim());
 return entries.filter(e=>e.kind==='character'&&(role==='all'||(e.character?.role||'secondary')===role)&&(placeId==='all'||(placeId==='none'?!e.character?.placeLinks?.length:e.character?.placeLinks?.some(link=>link.placeId===placeId)))&&(!phrase||searchable([e.name,e.character?.firstName,e.character?.surname,e.character?.nickname].filter(Boolean).join(' ')).includes(phrase)));
}
