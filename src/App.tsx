import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, CircleHelp, Cloud, Download, FilePlus2, FolderOpen, Menu, MoreHorizontal, PanelLeftClose, Plus, Search, Settings2, Sparkles, Target, Trash2, WandSparkles } from 'lucide-react';

type Chapter = { id: string; title: string; text: string };
type Novel = { id: string; title: string; genre: string; chapters: Chapter[]; updated: string };
const starter: Novel[] = [{ id: 'moon', title: 'La ciudad bajo la luna', genre: 'Fantasía · 1ª versión', updated: 'Hace 2 min', chapters: [
  { id: 'c1', title: 'Prólogo — La última campana', text: 'La campana sonó trece veces aquella noche.\n\nEn Asteria, hasta los relojes sabían cuándo guardar silencio. Lía contó cada golpe desde el tejado, con la lluvia deslizándose por las tejas y una carta ardiendo lentamente entre sus dedos.\n\nCuando llegó el último eco, la luna se apagó.' },
  { id: 'c2', title: 'Capítulo 1 — Una carta imposible', text: '' },
  { id: 'c3', title: 'Capítulo 2 — El mapa de ceniza', text: '' }
] }];
const loadNovels = () => new Promise<Novel[]>(resolve => { try { const req = indexedDB.open('tsukikage', 1); req.onupgradeneeded = () => req.result.createObjectStore('workspace'); req.onsuccess = () => { const tx = req.result.transaction('workspace', 'readonly'); const get = tx.objectStore('workspace').get('novels'); get.onsuccess = () => resolve(get.result || starter); get.onerror = () => resolve(starter); }; req.onerror = () => resolve(starter); } catch { resolve(starter); } });
const saveNovels = (novels: Novel[]) => { try { const req = indexedDB.open('tsukikage', 1); req.onsuccess = () => req.result.transaction('workspace', 'readwrite').objectStore('workspace').put(novels, 'novels'); } catch { /* La app sigue disponible aunque el almacenamiento esté deshabilitado. */ } };
const words = (s: string) => s.trim() ? s.trim().split(/\s+/u).length : 0;

export default function App() {
  const [novels, setNovels] = useState<Novel[]>(starter);
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState(novels[0]?.id ?? '');
  const [chapterId, setChapterId] = useState(novels[0]?.chapters[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [saved, setSaved] = useState(true);
  const [goal, setGoal] = useState(1500);
  const novel = novels.find(n => n.id === activeId) ?? novels[0];
  const chapter = novel?.chapters.find(c => c.id === chapterId) ?? novel?.chapters[0];
  const count = useMemo(() => words(novel?.chapters.map(c => c.text).join(' ') || ''), [novel]);
  useEffect(() => { void loadNovels().then(saved => { setNovels(saved); setActiveId(saved[0]?.id ?? ''); setChapterId(saved[0]?.chapters[0]?.id ?? ''); setHydrated(true); }); }, []);
  useEffect(() => { if (hydrated) saveNovels(novels); }, [novels, hydrated]);
  const patchChapter = (key: keyof Chapter, value: string) => { setSaved(false); setNovels(ns => ns.map(n => n.id === activeId ? { ...n, updated: 'Ahora', chapters: n.chapters.map(c => c.id === chapter?.id ? { ...c, [key]: value } : c) } : n)); window.setTimeout(() => setSaved(true), 500); };
  const addChapter = () => { if (!novel) return; const ch = { id: crypto.randomUUID(), title: `Capítulo ${novel.chapters.length + 1}`, text: '' }; setNovels(ns => ns.map(n => n.id === activeId ? { ...n, chapters: [...n.chapters, ch] } : n)); setChapterId(ch.id); };
  const addNovel = () => { const n = { id: crypto.randomUUID(), title: 'Nueva historia', genre: 'Sin género', chapters: [{ id: crypto.randomUUID(), title: 'Capítulo 1', text: '' }], updated: 'Ahora' }; setNovels(ns => [...ns, n]); setActiveId(n.id); setChapterId(n.chapters[0].id); };
  const exportBook = () => { if (!novel) return; const content = `# ${novel.title}\n\n${novel.chapters.map(c => `## ${c.title}\n\n${c.text}`).join('\n\n')}`; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type: 'text/markdown' })); a.download = `${novel.title.replace(/[^\p{L}\p{N}-]+/gu, '-').toLowerCase()}.md`; a.click(); URL.revokeObjectURL(a.href); };
  const filtered = novels.filter(n => n.title.toLowerCase().includes(query.toLowerCase()));
  return <main className="app-shell">
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand"><img className="brand-mark" src="/tsukikage-mark.svg" alt="" />{!collapsed && <div><b>Tsukikage</b><small>EL TALLER DE HISTORIAS</small></div>}<button className="icon-button collapse-btn" onClick={() => setCollapsed(!collapsed)} title="Contraer panel"><PanelLeftClose size={17}/></button></div>
      <div className="workspace-label">ESPACIO PERSONAL <ChevronDown size={13}/></div>
      <button className="nav-item active"><BookOpen size={17}/>{!collapsed && 'Mis historias'}{!collapsed && <span className="nav-count">{novels.length}</span>}</button>
      <button className="nav-item"><FolderOpen size={17}/>{!collapsed && 'Archivo'}</button>
      {!collapsed && <><div className="section-head"><span>TUS HISTORIAS</span><button className="icon-button" onClick={addNovel} title="Nueva historia"><Plus size={16}/></button></div>
      <div className="search"><Search size={15}/><input placeholder="Buscar historias" value={query} onChange={e => setQuery(e.target.value)}/><kbd>⌘ K</kbd></div>
      <div className="novel-list">{filtered.map(n => <button key={n.id} className={`novel-link ${n.id === activeId ? 'selected' : ''}`} onClick={() => { setActiveId(n.id); setChapterId(n.chapters[0]?.id); }}><span className="novel-dot"/><span className="novel-link-copy"><b>{n.title}</b><small>{n.genre}</small></span>{n.id === activeId && <MoreHorizontal size={15}/>}</button>)}</div>
      <button className="add-story" onClick={addNovel}><FilePlus2 size={16}/> Crear una historia</button>
      <div className="sidebar-bottom"><div className="goal-card"><div className="goal-heading"><span><Target size={15}/> META DIARIA</span><button className="icon-button" onClick={() => setGoal(goal === 1500 ? 1000 : 1500)} title="Cambiar meta"><Settings2 size={14}/></button></div><div className="goal-numbers"><b>{count.toLocaleString('es-AR')}</b><span>/ {goal.toLocaleString('es-AR')} palabras</span></div><div className="progress"><i style={{ width: `${Math.min(100, count / goal * 100)}%` }}/></div><small>{count >= goal ? '¡Meta cumplida! Seguí así.' : `Te faltan ${Math.max(0, goal-count).toLocaleString('es-AR')} palabras para tu meta.`}</small></div>
      <button className="profile"><div className="avatar">L</div><span><b>Mi espacio</b><small>Escritura privada</small></span><MoreHorizontal size={17}/></button></div></>}
      {collapsed && <button className="add-icon" onClick={addNovel} title="Crear historia"><Plus size={18}/></button>}
    </aside>
    <section className="main-area"><header className="topbar"><div className="breadcrumbs"><span>Mis historias</span><ChevronRight size={14}/><b>{novel?.title || 'Sin historias'}</b></div><div className="top-actions"><span className="save-state"><Cloud size={14}/>{saved ? 'Guardado' : 'Guardando…'}</span><button className="secondary-btn" onClick={exportBook}><Download size={15}/> Exportar</button><button className="avatar mini">L</button></div></header>
      {novel && chapter ? <div className="writing-layout"><section className="editor-column"><div className="book-heading"><div><div className="eyebrow"><span className="status-pill"><i/> EN PROGRESO</span><span>·</span>{novel.genre}</div><h1>{novel.title}</h1></div><button className="icon-button more" title="Opciones"><MoreHorizontal size={20}/></button></div>
        <div className="chapter-tabs"><span className="tabs-caption">MANUSCRITO</span><div className="chapter-strip">{novel.chapters.map((c,i)=><button key={c.id} className={`chapter-tab ${c.id === chapter.id ? 'current' : ''}`} onClick={() => setChapterId(c.id)}>{i===0?'◈':''} {c.title}</button>)}<button className="new-chapter" onClick={addChapter} title="Añadir capítulo"><Plus size={16}/></button></div></div>
        <div className="paper"><input aria-label="Título del capítulo" className="chapter-title" value={chapter.title} onChange={e => patchChapter('title', e.target.value)} placeholder="Título del capítulo"/><textarea aria-label="Texto del capítulo" className="writing-area" value={chapter.text} onChange={e => patchChapter('text', e.target.value)} placeholder="Deja que la historia empiece…\n\nEscribe tu primer párrafo aquí." spellCheck="true"/><div className="paper-footer"><span>✦ &nbsp; Un párrafo a la vez.</span><span>{words(chapter.text).toLocaleString('es-AR')} palabras</span></div></div>
        <div className="editor-foot"><span><kbd>⌘</kbd> + <kbd>↵</kbd> nueva línea</span><span>Tu historia se guarda en este dispositivo</span></div>
      </section><aside className="right-rail"><div className="rail-block"><div className="rail-title"><span>EN ESTA HISTORIA</span><button className="icon-button"><MoreHorizontal size={16}/></button></div><div className="stats-card"><span>PALABRAS</span><b>{count.toLocaleString('es-AR')}</b><small>de tu manuscrito</small><div className="stats-divider"/><div className="stat-row"><span>Capítulos</span><b>{novel.chapters.length}</b></div><div className="stat-row"><span>Última edición</span><b>{novel.updated}</b></div></div></div>
        <div className="rail-block outline-block"><div className="rail-title"><span>ESQUEMA</span><button className="icon-button" onClick={addChapter}><Plus size={15}/></button></div>{novel.chapters.map((c,i)=><button key={c.id} className={`outline-item ${c.id === chapter.id?'outline-selected':''}`} onClick={() => setChapterId(c.id)}><span className="outline-num">{String(i+1).padStart(2,'0')}</span><span>{c.title}</span></button>)}</div>
        <div className="tip-card"><div className="tip-icon"><Sparkles size={16}/></div><b>Un pequeño consejo</b><p>Escribir aunque sea un poco cada día hace que las historias encuentren su propio ritmo.</p><span>PARA TU PRÓXIMA SESIÓN</span></div><button className="help-link"><CircleHelp size={15}/> Ayuda y atajos</button>
      </aside></div> : <div className="empty"><WandSparkles size={34}/><h2>Tu próxima historia empieza aquí</h2><p>Crea un espacio para tus ideas, personajes y mundos.</p><button className="primary-btn" onClick={addNovel}><Plus size={16}/> Crear una historia</button></div>}
      <footer className="statusbar"><span><i/> Todos los cambios guardados</span><span>ESPAÑOL (ARG) <span className="status-sep">·</span> MODO ENFOQUE</span></footer>
    </section>
  </main>;
}
