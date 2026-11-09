import {useId,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {X} from 'lucide-react';
import {useDialogFocus} from './useDialogFocus';
import type { Novel, StoryCoverSettings } from '../model';

import {coverPalettes,coverStyles,resolveCover} from '../cover';
export {resolveCover} from '../cover';
export default function StoryCover({novel,language,onChange}:{novel:Novel;language:'es'|'en';onChange:(cover:StoryCoverSettings)=>void}){
 const es=language==='es';const cover=resolveCover(novel);
 const [open,setOpen]=useState(false);const dialog=useRef<HTMLElement>(null);const titleId=useId();useDialogFocus(open,dialog,()=>setOpen(false));
 const paletteNames=es?['Lunar','Tinta','Bosque','Rosa antigua']:['Lunar','Ink','Forest','Antique rose'];
 const styleNames=es?['Clásica','Marco','Órbita']:['Classic','Frame','Orbit'];
 const artwork=(<div className="editorial-cover" data-palette={cover.palette} data-cover-style={cover.style} aria-label={es?'Vista previa de portada':'Cover preview'}>
   <strong className="cover-title" tabIndex={novel.title.length>90?0:undefined} title={novel.title}>{novel.title||(es?'Historia sin título':'Untitled story')}</strong>
   <span className="cover-genre" tabIndex={(novel.genre||'').length>80?0:undefined} title={novel.genre}>{novel.genre||(es?'Manuscrito':'Manuscript')}</span>
  </div>);
 return <div className="story-cover-wrapper">
  {artwork}
  <button type="button" className="cover-edit" aria-haspopup="dialog" onClick={()=>setOpen(true)} onDragStart={e=>e.stopPropagation()}>{es?'Personalizar portada':'Customize cover'}</button>
  {open&&createPortal(<div className="modal-backdrop cover-modal-backdrop" onDragStart={e=>e.stopPropagation()} onClick={()=>setOpen(false)}><section className="modal-card cover-modal" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={dialog} tabIndex={-1} onClick={e=>e.stopPropagation()}><div className="modal-head"><h2 id={titleId}>{es?'Personalizar portada':'Customize cover'}</h2><button type="button" className="icon-button" aria-label={es?'Cerrar':'Close'} onClick={()=>setOpen(false)}><X size={18}/></button></div><div className="cover-modal-content">{artwork}
   <div className="cover-options">
    <label>{es?'Paleta':'Palette'}<select value={cover.palette} onChange={e=>onChange({...cover,palette:e.target.value as StoryCoverSettings['palette']})}>{coverPalettes.map((palette,i)=><option key={palette} value={palette}>{paletteNames[i]}</option>)}</select></label>
    <label>{es?'Estilo':'Style'}<select value={cover.style} onChange={e=>onChange({...cover,style:e.target.value as StoryCoverSettings['style']})}>{coverStyles.map((style,i)=><option key={style} value={style}>{styleNames[i]}</option>)}</select></label>
    <small>{es?'Los cambios se guardan automáticamente.':'Changes save automatically.'}</small>
   </div>
  </div></section></div>,document.querySelector('.app-shell')||document.body)}
 </div>;
}
