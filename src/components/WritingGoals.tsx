import {useState} from 'react';
import type {Novel} from '../model';
export type GoalPatch=Pick<Novel,'wordGoal'|'writingSession'>;
export function writingProgress(words:number,target:number,baseline=0){
 const written=Math.max(0,words-baseline);
 return {written,percent:target>0?Math.min(100,Math.round(written/target*100)):0,complete:target>0&&written>=target};
}
export default function WritingGoals({novel,words,language,onChange}:{novel:Novel;words:number;language:'es'|'en';onChange:(patch:GoalPatch)=>void}){
 const es=language==='es';const format=(value:number)=>value.toLocaleString(es?'es':'en');
 const [sessionTarget,setSessionTarget]=useState(novel.writingSession?.targetWords||300);
 const target=novel.wordGoal||0;const session=novel.writingSession;
 const project=writingProgress(words,target);const current=session?writingProgress(words,session.targetWords,session.baselineWords):null;
 return <details className="writing-goals"><summary>{es?'Objetivos de escritura':'Writing goals'}{session&&current&&<span>{format(current.written)} / {format(session.targetWords)}</span>}</summary><div className="writing-goals-content">
  <label>{es?'Meta del proyecto (palabras)':'Project goal (words)'}<input className="project-word-goal" type="number" min="0" max="10000000" step="100" value={target||''} placeholder={es?'Sin meta':'No goal'} onChange={e=>onChange({wordGoal:Math.min(10000000,Math.max(0,Math.round(Number(e.target.value)||0)))||undefined,writingSession:session})}/></label>
  {target>0&&<div className="goal-progress"><progress max={target} value={Math.min(target,words)} aria-label={es?'Progreso del proyecto':'Project progress'}/><span>{format(words)} / {format(target)} · {project.percent}%{project.complete&&(es?' · Meta alcanzada':' · Goal reached')}</span></div>}
  <div className="session-goal"><h3>{es?'Sesión de escritura':'Writing session'}</h3>{session&&current?<><div className="goal-progress"><progress max={session.targetWords} value={Math.min(session.targetWords,current.written)} aria-label={es?'Progreso de la sesión':'Session progress'}/><span>{format(current.written)} / {format(session.targetWords)} · {current.percent}%{current.complete&&(es?' · Objetivo alcanzado':' · Goal reached')}</span></div><button type="button" className="secondary-btn" onClick={()=>onChange({wordGoal:novel.wordGoal,writingSession:undefined})}>{es?'Terminar sesión':'End session'}</button></>:<><label>{es?'Objetivo de esta sesión (palabras)':'Session goal (words)'}<input type="number" min="1" max="100000" value={sessionTarget} onChange={e=>setSessionTarget(Math.min(100000,Math.max(1,Math.round(Number(e.target.value)||1))))}/></label><button type="button" className="secondary-btn" onClick={()=>onChange({wordGoal:novel.wordGoal,writingSession:{targetWords:sessionTarget,baselineWords:words,startedAt:new Date().toISOString()}})}>{es?'Iniciar sesión de escritura':'Start writing session'}</button></>}
  <small>{es?'La sesión mide el aumento neto de palabras de este manuscrito desde el inicio y se conserva al recargar. Borrar texto reduce el avance.':'Sessions track net words added to this manuscript since starting and survive reloads. Deleting text reduces progress.'}</small></div>
 </div></details>;
}
