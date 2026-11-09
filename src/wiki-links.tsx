import {createContext} from 'react';
export type WikiTarget={id:string;kind:string;title:string};
export const WikiContext=createContext<WikiTarget[]>([]);
export function wikiHref(kind:string,id:string){return `#tsukikage/${encodeURIComponent(kind)}/${encodeURIComponent(id)}`}
export function parseWikiHref(href:string):{kind:string;id:string}|null{const match=/^#tsukikage\/([^/]+)\/([^/]+)$/.exec(href);if(!match)return null;try{return {kind:decodeURIComponent(match[1]),id:decodeURIComponent(match[2])}}catch{return null}}
export function remapWikiLinks(html:string,ids:Map<string,string>){return html.replace(/#tsukikage\/([^/"'<>\s]+)\/([^/"'<>\s]+)/g,(href,kind,encoded)=>{try{const next=ids.get(decodeURIComponent(encoded));return next?wikiHref(decodeURIComponent(kind),next):href}catch{return href}})}
