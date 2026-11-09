import {useState} from 'react';
import type {Novel,ProjectSnapshot,Publication,StoryTemplate} from '../model';
export default function ProjectTools({novel,history,templates,language,onPublication,onCheckpoint,onRestore,onDeleteSnapshot,onTemplate,onDeleteTemplate}:{novel:Novel;history:ProjectSnapshot[];templates:StoryTemplate[];language:'es'|'en';onPublication:(publication:Publication)=>void;onCheckpoint:(label:string)=>void;onRestore:(id:string)=>void;onDeleteSnapshot:(id:string)=>void;onTemplate:(name:string)=>void;onDeleteTemplate:(id:string)=>void}){
 const es=language==='es';const [label,setLabel]=useState('');const [name,setName]=useState('');const p=novel.publication||{};
 const patch=(value:Partial<Publication>)=>onPublication({...p,...value});
 return <section className="project-tools">
 <details><summary>{es?'Preparar edición y exportación':'Publication and export settings'}</summary><div className="project-tools-content">
 <label>{es?'Autoría':'Author'}<input value={p.author||''} maxLength={200} onChange={e=>patch({author:e.target.value})}/></label>
 <label>{es?'Subtítulo':'Subtitle'}<input value={p.subtitle||''} maxLength={300} onChange={e=>patch({subtitle:e.target.value})}/></label>
 <label>{es?'Idioma del libro':'Book language'}<select value={p.language||language} onChange={e=>patch({language:e.target.value as 'es'|'en'})}><option value="es">Español</option><option value="en">English</option></select></label>
 <label>{es?'Tipografía de exportación':'Export typeface'}<select value={p.font||'serif'} onChange={e=>patch({font:e.target.value as 'serif'|'sans'})}><option value="serif">Serif</option><option value="sans">Sans-serif</option></select></label>
 <label>{es?'Tamaño de impresión (pt)':'Print size (pt)'}<select value={p.fontSize||12} onChange={e=>patch({fontSize:Number(e.target.value)})}>{[11,12,14].map(n=><option key={n}>{n}</option>)}</select></label>
 <label>{es?'Papel para DOCX y PDF':'Paper for DOCX and PDF'}<select value={p.paper||'a4'} onChange={e=>patch({paper:e.target.value as Publication['paper']})}><option value="a4">A4</option><option value="a5">A5</option><option value="letter">Letter</option></select></label>
 <label className="project-cover-choice"><input type="checkbox" checked={p.includeCover!==false} onChange={e=>patch({includeCover:e.target.checked})}/>{es?'Incluir portada editorial':'Include editorial cover'}</label>
 <small>{es?'Se aplica a EPUB, DOCX y PDF. El tamaño de lectura del EPUB depende del lector. Las preferencias del editor no cambian.':'Applies to EPUB, DOCX and PDF. EPUB reading size depends on the reader. Editor preferences are unchanged.'}</small>
 </div></details>
 <details><summary>{es?'Versiones del proyecto completo':'Full project versions'} · {history.length}</summary><div className="project-tools-content">
 <p>{es?'Guarda hasta 10 versiones completas: capítulos, escenas, mundo, notas y configuración del proyecto. Al restaurar se guarda primero el estado actual.':'Keep up to 10 full versions: chapters, scenes, world, notes and project settings. Restoring first saves the current state.'}</p>
 <label>{es?'Nombre de versión (opcional)':'Version name (optional)'}<input className="snapshot-label" maxLength={120} value={label} onChange={e=>setLabel(e.target.value)}/></label><button className="secondary-btn" onClick={()=>{onCheckpoint(label|| (es?'Versión manual':'Manual version'));setLabel('')}}>{es?'Guardar versión completa':'Save full version'}</button>
 {!history.length&&<p>{es?'Aún no hay versiones completas guardadas.':'No full versions saved yet.'}</p>}
 {history.map(s=><article className="project-version" key={s.id}><b>{s.label}</b><time dateTime={s.at}>{new Date(s.at).toLocaleString(language)}</time><span>{s.novel.chapters.length} {es?'capítulos':'chapters'} · {s.novel.entries?.length||0} {es?'elementos del mundo':'world entries'}</span><div><button className="secondary-btn" onClick={()=>onRestore(s.id)}>{es?'Restaurar versión':'Restore version'}</button><button className="secondary-btn" onClick={()=>onDeleteSnapshot(s.id)}>{es?'Eliminar versión':'Delete version'}</button></div></article>)}
 </div></details>
 <details><summary>{es?'Plantillas personales':'Personal templates'}</summary><div className="project-tools-content"><p>{es?'Una plantilla copia la estructura, los textos y el mundo de este proyecto. Los proyectos nuevos reciben identificadores propios y no heredan el historial ni la sesión de escritura.':'A template copies this project’s structure, text and world. New projects get their own IDs without inheriting history or writing sessions.'}</p>
 <label>{es?'Nombre de plantilla':'Template name'}<input className="template-name" maxLength={120} value={name} placeholder={novel.title} onChange={e=>setName(e.target.value)}/></label><button className="secondary-btn" onClick={()=>{onTemplate(name.trim()||novel.title);setName('')}}>{es?'Guardar como plantilla':'Save as template'}</button>
 {templates.map(t=><div className="template-row" key={t.id}><span>{t.name}</span><button className="secondary-btn" onClick={()=>onDeleteTemplate(t.id)}>{es?'Eliminar plantilla':'Delete template'}</button></div>)}
 <small>{es?'Las plantillas son copias independientes: eliminar el proyecto original no las elimina. Se eligen y pueden borrarse al crear una historia, y se incluyen en la copia completa JSON.':'Templates are independent copies: deleting the original project does not delete them. They can be selected or deleted when creating a story, and are included in full JSON backups.'}</small>
 </div></details>
 </section>;
}
