import { htmlToText, sanitizeHtml } from './export';
import { guideAnswerText, type GuideLanguage } from './character-guide';

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
