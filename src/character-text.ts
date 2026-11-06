import type { CharacterProfile, Entry } from './model';
import { htmlToText, sanitizeHtml } from './export';
import { guideAnswerText, normalizeGuideAnswers, type GuideLanguage } from './character-guide';

export function characterTextHtml(text:string):string {
 if(/<[a-z][\s\S]*>/i.test(text))return sanitizeHtml(text);
 return text?text.split('\n').map(line=>'<p>'+line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</p>').join(''):'';
}
export function characterPlainText(text:string):string {
 return /<[a-z][\s\S]*>/i.test(text)?htmlToText(sanitizeHtml(text)):text;
}
export const hasCharacterText=(text:string|undefined)=>Boolean(text&&characterPlainText(text).trim());
export function characterGuidePreview(answers:Record<string,string>,language:GuideLanguage):string {
 return guideAnswerText(Object.fromEntries(Object.entries(answers).map(([id,text])=>[id,characterPlainText(text)])),language);
}

/** Move the former standalone interview into the existing guided relationship answer. */
export function migrateCharacterRelationships(profile:CharacterProfile):CharacterProfile{
 const next={...profile};
 if(profile.guided||hasCharacterText(profile.relationshipNotes))next.guided=normalizeGuideAnswers(profile.guided);
 if(hasCharacterText(profile.relationshipNotes)){
  const existing=next.guided?.relationships||'';
  if(characterPlainText(existing).trim()!==characterPlainText(profile.relationshipNotes!).trim())next.guided={...next.guided,relationships:[existing,profile.relationshipNotes!].filter(hasCharacterText).map(text=>/<[a-z][\s\S]*>/i.test(text)?text:characterTextHtml(text)).join('<p><br></p>')};
 }
 delete next.relationshipNotes;delete next.relationshipMode;return next;
}
export function hasCharacterGraph(entry:Entry,characters:Entry[]):boolean{
 return characters.some(other=>other.id!==entry.id&&(entry.character?.relatedCharacterIds?.includes(other.id)||other.character?.relatedCharacterIds?.includes(entry.id)));
}
