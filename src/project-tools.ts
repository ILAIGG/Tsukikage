import {remapWikiLinks} from './wiki-links';
import type {Novel,ProjectSnapshot,StoryTemplate,Workspace} from './model';
export const MAX_PROJECT_SNAPSHOTS=10;
export function projectSnapshots(workspace:Workspace,projectId:string):ProjectSnapshot[]{const value=workspace.projectHistory?.[projectId];return Array.isArray(value)?value:[]}
export function checkpoint(workspace:Workspace,projectId:string,label:string):Workspace{
 const novel=workspace.novels.find(n=>n.id===projectId);if(!novel)return workspace;
 const snapshot:ProjectSnapshot={id:crypto.randomUUID(),at:new Date().toISOString(),label:label.trim().slice(0,120),novel:structuredClone(novel)};
 const previous=projectSnapshots(workspace,projectId);
 return {...workspace,projectHistory:{...workspace.projectHistory,[projectId]:[snapshot,...previous].slice(0,MAX_PROJECT_SNAPSHOTS)}};
}
export function restoreProject(workspace:Workspace,projectId:string,snapshotId:string,label:string):Workspace{
 const snapshot=projectSnapshots(workspace,projectId).find(s=>s.id===snapshotId);
 if(!snapshot||snapshot.novel.id!==projectId)return workspace;
 const saved=checkpoint(workspace,projectId,label);
 return {...saved,novels:saved.novels.map(n=>n.id===projectId?structuredClone(snapshot.novel):n)};
}
export function createFromTemplate(template:StoryTemplate,title:string):Novel{
 const n=structuredClone(template.project);const ids=new Map<string,string>();
 for(const original of [n.id,...n.chapters.flatMap(c=>[c.id,...(c.scenes||[]).map(s=>s.id)]),...(n.entries||[]).map(e=>e.id)])ids.set(original,crypto.randomUUID());
 // Remap links everywhere in the cloned project, including guided descriptions and notes.
 const remapText=(value:unknown):unknown=>typeof value==='string'?remapWikiLinks(value,ids):Array.isArray(value)?value.map(remapText):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,item])=>[key,remapText(item)])):value;
 Object.assign(n,remapText(n));
 const remap=(id:string)=>ids.get(id)||id;
 const refs=(value:{characterIds?:string[];placeIds?:string[]})=>({...(value.characterIds?{characterIds:value.characterIds.map(remap)}:{}),...(value.placeIds?{placeIds:value.placeIds.map(remap)}:{})});
 return {...n,id:remap(n.id),title:title.trim()||n.title,updated:new Date().toISOString(),revisions:{},writingSession:undefined,
 chapters:n.chapters.map(c=>({...c,...refs(c),id:remap(c.id),scenes:c.scenes?.map(s=>({...s,...refs(s),id:remap(s.id)}))})),
 entries:n.entries?.map(e=>({...e,id:remap(e.id),chapterId:e.chapterId?remap(e.chapterId):undefined,
 character:e.character?{...e.character,relatedCharacterIds:e.character.relatedCharacterIds?.map(remap),relationshipLabels:e.character.relationshipLabels?Object.fromEntries(Object.entries(e.character.relationshipLabels).map(([id,label])=>[remap(id),label])):undefined,placeLinks:e.character.placeLinks?.map(link=>({...link,placeId:remap(link.placeId)}))}:undefined,
 place:e.place?{...e.place,parentId:e.place.parentId?remap(e.place.parentId):undefined}:undefined}))};
}
