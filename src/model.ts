export type Chapter = { id: string; title: string; text: string; synopsis?: string; scenes?: string[] };
export type Entry = { id: string; name: string; description: string; kind: 'character' | 'place' | 'note'; chapterId?: string };
export type Revision = { id: string; at: string; html: string; words: number };
export type Novel = { id: string; title: string; genre: string; chapters: Chapter[]; updated: string; synopsis?: string; entries?: Entry[]; revisions?: Record<string, Revision[]>; template?: string };
export type Settings = { language: 'es' | 'en'; dailyGoal: number; theme: 'dark' | 'light' | 'system'; dailyWords: number; dailyDate: string; fontSize: number; pageWidth: number };
export type Workspace = { novels: Novel[]; settings: Settings };

const localDate = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
export const defaultSettings: Settings = { language: 'es', dailyGoal: 1500, theme: 'system', dailyWords: 0, dailyDate: localDate(), fontSize: 18, pageWidth: 760 };
export const starter: Novel[] = [{ id: 'moon', title: 'La ciudad bajo la luna', genre: 'Fantasía · 1ª versión', updated: 'Hace 2 min', chapters: [
  { id: 'c1', title: 'Prólogo — La última campana', text: '<p>La campana sonó trece veces aquella noche.</p><p>En Asteria, hasta los relojes sabían cuándo guardar silencio. Lía contó cada golpe desde el tejado, con la lluvia deslizándose por las tejas y una carta ardiendo lentamente entre sus dedos.</p><p>Cuando llegó el último eco, la luna se apagó.</p>' },
  { id: 'c2', title: 'Capítulo 1 — Una carta imposible', text: '' }, { id: 'c3', title: 'Capítulo 2 — El mapa de ceniza', text: '' }
] }];
export const templates: Record<string, { genre: string; titles: string[]; synopsis: string }> = {
  novel: { genre: 'Novela', titles: ['Prólogo', 'Capítulo 1', 'Capítulo 2'], synopsis: 'Una historia que merece ser contada.' },
  short: { genre: 'Relato', titles: ['Inicio', 'Nudo', 'Desenlace'], synopsis: 'Una idea breve, un mundo completo.' },
  script: { genre: 'Guion', titles: ['Escena 1 · Interior', 'Escena 2 · Exterior'], synopsis: 'INT./EXT. — Describe aquí la primera escena.' },
  world: { genre: 'Cuaderno de mundo', titles: ['Premisa', 'Lugares', 'Personajes', 'Historia y cronología'], synopsis: 'Construye aquí las reglas y los rincones de tu mundo.' }
};
