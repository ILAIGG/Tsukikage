import type { Entry, PlaceType } from '../model';
import { placeTypes } from '../place-guide';
import RolePicker from './ThemedPicker';
export type PlaceFilterValue={query:string;type:PlaceType|'all';parent:string};
export const emptyPlaceFilters:PlaceFilterValue={query:'',type:'all',parent:'all'};
export default function PlaceFilters({places,language,value,onChange}:{places:Entry[];language:'es'|'en';value:PlaceFilterValue;onChange:(value:PlaceFilterValue)=>void}){
 const es=language==='es';
 return <section className="place-list-filters" aria-label={es?'Filtrar lugares':'Filter places'}><label>{es?'Buscar por nombre o nombre alternativo':'Search by name or alternate name'}<input className="place-list-search" type="search" value={value.query} onChange={e=>onChange({...value,query:e.target.value})} placeholder={es?'Buscar lugares…':'Search places…'}/></label><label>{es?'Tipo':'Type'}<RolePicker label={es?'Filtrar por tipo':'Filter by type'} value={value.type} options={[["all",es?'Todos los tipos':'All types'],...placeTypes.map(t=>[t.id,t.label[language]])]} onChange={type=>onChange({...value,type:type as PlaceType|'all'})}/></label><label>{es?'Ubicación superior':'Containing place'}<RolePicker label={es?'Filtrar por ubicación':'Filter by location'} value={value.parent} options={[["all",es?'Todas las ubicaciones':'All locations'],["none",es?'Sin ubicación superior':'No containing place'],...places.map(e=>[e.id,e.name])]} onChange={parent=>onChange({...value,parent})}/></label><button type="button" className="secondary-btn" onClick={()=>onChange({...emptyPlaceFilters})}>{es?'Limpiar filtros':'Clear filters'}</button></section>
}
