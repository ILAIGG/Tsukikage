import { useState } from 'react';
import type { Entry } from '../model';

export default function CharacterPage({entry,language,onSave}:{entry:Entry|null;language:'es'|'en';onSave:(entry:Entry)=>void}){
 const es=language==='es';const [name,setName]=useState(entry?.name||'');const [description,setDescription]=useState(entry?.description||'');
 return <section className="character-page"><header className="character-page-heading"><div><div className="eyebrow">{es?'MUNDO · PERSONAJES':'WORLD · CHARACTERS'}</div><h1>{entry?.name||(es?'Nuevo personaje':'New character')}</h1></div></header><form onSubmit={e=>{e.preventDefault();if(name.trim())onSave({...entry,id:entry?.id||crypto.randomUUID(),kind:'character',name:name.trim(),description})}}><label>{es?'Nombre':'Name'}<input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder={es?'Nombre del personaje':'Character name'}/></label><label>{es?'Descripción':'Description'}<textarea rows={12} value={description} onChange={e=>setDescription(e.target.value)} placeholder={es?'Empieza a conocer a tu personaje…':'Start getting to know your character…'}/></label><button className="primary-btn" type="submit" disabled={!name.trim()}>{es?'Guardar personaje':'Save character'}</button></form></section>
}
