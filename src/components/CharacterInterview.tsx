import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { characterGuide, type GuideLanguage } from '../character-guide';

type Props={language:GuideLanguage;answers:Record<string,string>;onChange:(answers:Record<string,string>)=>void};
export default function CharacterInterview({language,answers,onChange}:Props){
 const es=language==='es';
 const [view,setView]=useState<'categories'|'question'|'summary'>(()=>Object.values(answers).some(v=>v.trim())?'summary':'categories');
 const [categoryIndex,setCategoryIndex]=useState(0);
 const [questionIndex,setQuestionIndex]=useState(0);
 const [notice,setNotice]=useState('');
 const surface=useRef<HTMLElement>(null);
 useEffect(()=>{surface.current?.closest('.character-description')?.scrollIntoView({block:'start'});},[view,categoryIndex,questionIndex]);
 const category=characterGuide[categoryIndex];
 const question=category.questions[questionIndex];
 const hasAnswers=Object.values(answers).some(value=>value.trim());
 const openQuestion=(c:number,q=0)=>{setCategoryIndex(c);setQuestionIndex(q);setView('question');setNotice('')};
 const knownIds=new Set(characterGuide.flatMap(c=>c.questions.map(q=>q.id)));
 const extras=Object.entries(answers).filter(([key,value])=>!knownIds.has(key)&&value.trim());
 if(view==='question')return <section ref={surface} className="character-interview" aria-label={es?'Entrevista del personaje':'Character interview'}>
  <div className="interview-breadcrumb"><button type="button" className="secondary-btn" onClick={()=>setView('categories')}><ArrowLeft size={14}/>{es?'Categorías':'Categories'}</button><span>{category.title[language]} · {questionIndex+1} / {category.questions.length}</span></div>
  <h3 id="interview-question">{question.label[language]}</h3><p className="interview-prompt">{question.prompt[language]}</p>
  <textarea key={question.id} aria-labelledby="interview-question" rows={9} value={answers[question.id]||''} onChange={event=>onChange({...answers,[question.id]:event.target.value})} placeholder={`${es?'Ejemplo':'Example'}: ${question.example[language]}`}/>
  <small>{es?'Puedes dejar esta respuesta vacía. Escribe con libertad y guarda el personaje al terminar.':'You may leave this answer empty. Write freely and save the character when finished.'}</small>
  <div className="interview-actions"><button type="button" className="secondary-btn" disabled={questionIndex===0} onClick={()=>setQuestionIndex(i=>i-1)}><ArrowLeft size={14}/>{es?'Pregunta anterior':'Previous question'}</button><button type="button" className="primary-btn" onClick={()=>{if(questionIndex+1<category.questions.length)setQuestionIndex(i=>i+1);else{setView('categories');setNotice(es?`Terminaste el recorrido de ${category.title.es}. Puedes elegir otra categoría o ver tus respuestas.`:`You finished ${category.title.en}. Choose another category or review your answers.`)}}}>{questionIndex+1===category.questions.length?(es?'Terminar categoría':'Finish category'):(es?'Pregunta siguiente':'Next question')}<ArrowRight size={14}/></button></div>
  <button type="button" className="secondary-btn interview-exit" onClick={()=>setView('summary')}>{es?'Salir de la entrevista y ver respuestas':'Exit interview and view answers'}</button>
 </section>;
 if(view==='summary')return <section ref={surface} className="character-interview-summary"><div className="interview-summary-heading"><h3>{es?'Descripción guiada':'Guided description'}</h3><button type="button" className="secondary-btn" onClick={()=>setView('categories')}>{es?'Continuar entrevista':'Continue interview'}</button></div>
  {!hasAnswers&&<p>{es?'Todavía no hay respuestas. Puedes empezar por cualquier categoría.':'No answers yet. You can start with any category.'}</p>}
  {characterGuide.map((c,cIndex)=>{const completed=c.questions.filter(q=>answers[q.id]?.trim());return completed.length>0&&<details key={c.id} className="interview-answer-category"><summary>{c.title[language]} <small>{completed.length}</small></summary>{completed.map(q=><details key={q.id} className="interview-answer"><summary>{q.label[language]}</summary><p>{answers[q.id]}</p><button type="button" className="secondary-btn" onClick={()=>openQuestion(cIndex,c.questions.indexOf(q))}>{es?'Editar respuesta':'Edit answer'}</button></details>)}</details>})}
  {extras.length>0&&<details className="interview-answer-category"><summary>{es?'Otras respuestas guardadas':'Other saved answers'}</summary>{extras.map(([key,value])=><details className="interview-answer" key={key}><summary>{key}</summary><p>{value}</p><label>{es?'Editar respuesta':'Edit answer'}<textarea value={value} onChange={e=>onChange({...answers,[key]:e.target.value})}/></label></details>)}</details>}
 </section>;
 return <section ref={surface} className="character-interview-categories"><h3>{es?'Conoce a tu personaje':'Get to know your character'}</h3><p>{es?'Elige una categoría para empezar la entrevista. Todas las preguntas son opcionales y puedes volver a ellas cuando quieras.':'Choose a category to start the interview. Every question is optional and you can return to it anytime.'}</p>{notice&&<p role="status" className="interview-notice"><Check size={16}/>{notice}</p>}<div className="interview-category-grid">{characterGuide.map((c,index)=>{const done=c.questions.filter(q=>answers[q.id]?.trim()).length;return <button type="button" className="secondary-btn interview-category" key={c.id} onClick={()=>openQuestion(index)}><span>{c.title[language]}</span><small>{done} / {c.questions.length} {es?'respuestas':'answers'}</small><ArrowRight size={16}/></button>})}</div><button type="button" className="secondary-btn" onClick={()=>setView('summary')}>{es?'Ver respuestas / finalizar entrevista':'View answers / finish interview'}</button></section>;
}
