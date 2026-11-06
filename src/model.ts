import { createSampleProject } from './sample-project';
export type StoryReferences={characterIds?:string[];placeIds?:string[]};
export type CharacterPlaceLink={placeId:string;role:'home'|'work'|'birth'|'important'};
export type Scene = StoryReferences & { id: string; title: string; text: string; description?: string };
export type Chapter = StoryReferences & { id: string; title: string; text: string; synopsis?: string; scenes?: Scene[]; progress?:number };
export type CharacterProfile = { placeLinks?:CharacterPlaceLink[]; role?:string; firstName?:string; surname?:string; image?:string; relationshipNotes?:string; relationshipLabels?:Record<string,string>; nickname?:string; birthDate?:string; descriptionMode?:'free'|'guided'; guided?:Record<string,string>; relationshipMode?:'interview'|'graph'; relatedCharacterIds?:string[] };
export type PlaceType='world'|'region'|'city'|'building'|'room'|'nature'|'mobile'|'abstract'|'other';
export type PlaceProfile={type?:PlaceType;aliases?:string;image?:string;parentId?:string;descriptionMode?:'free'|'guided';guided?:Record<string,string>;answerStates?:Record<string,'pending'|'notApplicable'>};
export type Entry = { id: string; name: string; description: string; kind: 'character' | 'place' | 'note' | 'event'; chapterId?: string; date?: string; character?:CharacterProfile; place?:PlaceProfile };
export type Revision = { id: string; at: string; html: string; words: number; automatic?:boolean };
export type RecoverySnapshot = { id:string; novelId:string; chapterId:string; chapter:Chapter; createdAt:number };
export type Novel = { id: string; title: string; genre: string; chapters: Chapter[]; updated: string; synopsis?: string; entries?: Entry[]; revisions?: Record<string, Revision[]>; template?: string };
export type ThemeColors = { background:string; surface:string; sidebar:string; text:string; muted:string; line:string; accent:string; accentStrong:string; link?:string; page:string; shadow:string };
export type CustomTheme = { id:string; name:string; mode:'light'|'dark'; colors:ThemeColors };
export type Settings = { language: 'es' | 'en'; dailyGoal: number; theme: string; customThemes?:CustomTheme[]; dailyWords: number; dailyDate: string; fontSize: number; pageWidth: number };
export type Workspace = { novels: Novel[]; settings: Settings; activeNovelId?: string; activeChapterId?: string; lastPage?: 'project'|'write'|'world'|'chapters'|'library'; activeSection?: 'project'|'chapter'|'world'|'character'|'place'|'note'|'event' };

export function preferredLanguage(languages: readonly string[] = typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language]): Settings['language'] {
  const supported = languages.find(language => /^(es|en)(-|$)/i.test(language));
  return supported?.toLowerCase().startsWith('en') ? 'en' : 'es';
}

const localDate = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
export const builtinThemes: CustomTheme[] = [
  {id:'pop',name:'Pop',mode:'light',colors:{background:'#fff7e8',surface:'#fffdf6',sidebar:'#ffe9f1',text:'#31243a',muted:'#786b7a',line:'#483a4c',accent:'#e85c9e',accentStrong:'#c83d7b',link:'#a82963',page:'#fffdf8',shadow:'#493044'}},
  {id:'darkpop',name:'DarkPop',mode:'dark',colors:{background:'#211a2c',surface:'#30253c',sidebar:'#281f34',text:'#fff3e8',muted:'#c0adc5',line:'#e9c9dc',accent:'#ff83bd',accentStrong:'#ffacd2',link:'#ffacd2',page:'#32283d',shadow:'#120d18'}}
];
export const defaultSettings: Settings = { language: preferredLanguage(), dailyGoal: 1500, theme: 'system', customThemes:builtinThemes, dailyWords: 0, dailyDate: localDate(), fontSize: 18, pageWidth: 760 };
export const starter: Novel[] = createSampleProject(defaultSettings.language);
export const templates: Record<string, { genre: string; titles: string[]; synopsis: string }> = {
  novel: { genre: 'Novela', titles: ['Prólogo', 'Capítulo 1', 'Capítulo 2'], synopsis: 'Una historia que merece ser contada.' },
  short: { genre: 'Relato', titles: ['Inicio', 'Nudo', 'Desenlace'], synopsis: 'Una idea breve, un mundo completo.' },
  script: { genre: 'Guion', titles: ['Escena 1 · Interior', 'Escena 2 · Exterior'], synopsis: 'INT./EXT. — Describe aquí la primera escena.' },
  world: { genre: 'Cuaderno de mundo', titles: ['Premisa', 'Lugares', 'Personajes', 'Historia y cronología'], synopsis: 'Construye aquí las reglas y los rincones de tu mundo.' }
};
