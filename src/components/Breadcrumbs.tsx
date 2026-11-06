import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
export type BreadcrumbItem={label:string;onNavigate?:()=>void};
export default function Breadcrumbs({items,language}:{items:BreadcrumbItem[];language:'es'|'en'}){
 const current=useRef<HTMLSpanElement>(null);
 useEffect(()=>{const trail=current.current?.closest('nav');if(trail)trail.scrollLeft=trail.scrollWidth},[items.map(item=>item.label).join('\n')]);
 return <nav className="breadcrumb-trail" aria-label={language==='es'?'Ruta de navegación':'Breadcrumb'}><ol>{items.map((item,index)=><li key={index}>{index>0&&<ChevronRight size={12} aria-hidden="true"/>}{index===items.length-1?<span ref={current} aria-current="page" title={item.label}>{item.label}</span>:<button type="button" className="breadcrumb-link" onClick={item.onNavigate} title={item.label}>{item.label}</button>}</li>)}</ol></nav>
}
