import type { Novel, StoryCoverSettings } from '../model';

export const coverPalettes = ['lunar','ink','forest','rose'] as const;
export const coverStyles = ['classic','frame','orbit'] as const;
export function resolveCover(novel:Pick<Novel,'id'|'cover'>):StoryCoverSettings {
 let hash=0;for(const char of novel.id)hash=(hash*31+char.charCodeAt(0))>>>0;
 return {palette:coverPalettes.includes(novel.cover?.palette as typeof coverPalettes[number])?novel.cover!.palette:coverPalettes[hash%coverPalettes.length],style:coverStyles.includes(novel.cover?.style as typeof coverStyles[number])?novel.cover!.style:coverStyles[hash%coverStyles.length]};
}
export default function StoryCover({novel,language,onChange}:{novel:Novel;language:'es'|'en';onChange:(cover:StoryCoverSettings)=>void}){
 const es=language==='es';const cover=resolveCover(novel);
 const paletteNames=es?['Lunar','Tinta','Bosque','Rosa antigua']:['Lunar','Ink','Forest','Antique rose'];
 const styleNames=es?['Clásica','Marco','Órbita']:['Classic','Frame','Orbit'];
 return <div className="story-cover-wrapper">
  <div className="editorial-cover" data-palette={cover.palette} data-cover-style={cover.style} aria-label={es?'Vista previa de portada':'Cover preview'}>
   <strong className="cover-title">{novel.title||(es?'Historia sin título':'Untitled story')}</strong>
   <span className="cover-genre">{novel.genre||(es?'Manuscrito':'Manuscript')}</span>
  </div>
  <details className="cover-picker" onDragStart={e=>e.stopPropagation()}>
   <summary>{es?'Personalizar portada':'Customize cover'}</summary>
   <div className="cover-options">
    <label>{es?'Paleta':'Palette'}<select value={cover.palette} onChange={e=>onChange({...cover,palette:e.target.value as StoryCoverSettings['palette']})}>{coverPalettes.map((palette,i)=><option key={palette} value={palette}>{paletteNames[i]}</option>)}</select></label>
    <label>{es?'Estilo':'Style'}<select value={cover.style} onChange={e=>onChange({...cover,style:e.target.value as StoryCoverSettings['style']})}>{coverStyles.map((style,i)=><option key={style} value={style}>{styleNames[i]}</option>)}</select></label>
    <small>{es?'La portada se actualiza arriba y se guarda automáticamente.':'The preview above updates and saves automatically.'}</small>
   </div>
  </details>
 </div>;
}
