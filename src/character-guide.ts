export type GuideLanguage = 'es' | 'en';
type LocalText = Record<GuideLanguage, string>;
export type GuideQuestion = { id: string; label: LocalText; prompt: LocalText; example: LocalText };
export type GuideCategory = { id: string; title: LocalText; questions: GuideQuestion[] };
const q = (id:string, es:string, en:string, promptEs:string, promptEn:string, exampleEs:string, exampleEn:string):GuideQuestion => ({id,label:{es,en},prompt:{es:promptEs,en:promptEn},example:{es:exampleEs,en:exampleEn}});
export const characterGuide: GuideCategory[] = [
 {id:'physical',title:{es:'Físico y presencia',en:'Appearance and presence'},questions:[
  q('gender','Género','Gender','¿Cuál es su género?','What is their gender?','Ella es una mujer; etc.','She is a woman; etc.'),
  q('skin','Piel','Skin','¿Cómo es su piel y qué huellas deja su entorno en ella?','What is their skin like, and how does their environment leave its mark?','El sol ha curtido sus brazos; siempre tiene manchas de tinta en los dedos.','The sun has weathered their arms; ink always stains their fingers.'),
  q('marks','Marcas o cicatrices','Marks or scars','¿Qué marcas tiene y qué historia se esconde detrás?','Which marks do they have, and what stories lie behind them?','Oculta una quemadura que le recuerda a la persona que salvó.','They hide a burn that reminds them of someone they saved.'),
  q('height','Altura','Height','¿Cómo influye su altura en su forma de moverse o en cómo lo perciben?','How does their height affect their movement or how others perceive them?','Es muy alto, pero se encorva para no llamar la atención.','They are tall but stoop to avoid attracting attention.'),
  q('build','Complexión','Build','¿Qué cuenta su cuerpo sobre su vida, su salud y sus hábitos?','What does their body reveal about their life, health and habits?','Sus manos fuertes contrastan con su andar cansado de tantos viajes.','Strong hands contrast with a weary gait after years of travelling.'),
  q('hair','Cabello','Hair','¿Cómo lleva el cabello? ¿Por elección, costumbre o necesidad?','How do they wear their hair? Is it a choice, habit or necessity?','Lo lleva corto desde que empezó a trabajar en el taller.','They have kept it short since starting work at the workshop.'),
  q('hairColor','Color de cabello','Hair color','¿Qué color y matices tiene? ¿Es natural o lo cambia por algún motivo?','What colour and shades does it have? Is it natural, or changed for a reason?','Una mecha azul es el único recuerdo visible de su vida anterior.','A blue streak is the only visible reminder of their former life.'),
  q('eyes','Ojos','Eyes','¿Cómo son sus ojos y su mirada? ¿Qué revelan o intentan ocultar?','What are their eyes and gaze like? What do they reveal or conceal?','Tiene ojos oscuros y aparta la mirada cuando le preguntan por su familia.','They have dark eyes and look away when asked about their family.'),
  q('face','Rostro','Face','¿Qué rasgos, expresiones o marcas lo hacen reconocible?','Which features, expressions or marks make them recognisable?','Una pequeña cicatriz divide su ceja; sonríe solo con un lado de la boca.','A small scar splits their eyebrow; they smile with one side of their mouth.'),
  q('voice','Voz','Voice','¿Cómo suena su voz y qué cambia cuando se emociona?','What does their voice sound like, and how does emotion change it?','Habla con suavidad, pero al enfadarse deja pausas muy largas.','They speak softly but leave long pauses when angry.'),
  q('clothing','Ropa habitual','Usual clothing','¿Qué elige llevar y qué revela esa elección?','What do they choose to wear, and what does it reveal?','Conserva un abrigo remendado aunque podría comprar otro.','They keep a patched coat despite being able to afford a new one.'),
  q('gestures','Postura y gestos','Posture and gestures','¿Qué hace con las manos o el cuerpo cuando se siente observado?','What do their hands and body do when they feel watched?','Gira un anillo antes de responder una pregunta difícil.','They twist a ring before answering a difficult question.')
 ]},
 {id:'psychology',title:{es:'Psicología',en:'Psychology'},questions:[
  q('personality','Personalidad','Personality','¿Cómo es en confianza y cómo cambia ante desconocidos?','What are they like with trusted people, and how do strangers change that?','Parece distante, pero con sus amigos hace bromas absurdas.','They seem distant but tell absurd jokes among friends.'),
  q('strengths','Fortalezas','Strengths','¿Qué habilidad o cualidad lo ayuda cuando todo se complica?','Which skill or quality helps when things get difficult?','Escucha sin interrumpir y detecta lo que nadie se atreve a decir.','They listen without interrupting and notice what nobody dares to say.'),
  q('flaws','Defectos','Flaws','¿Qué rasgo le causa problemas? ¿Cómo lo justifica?','Which trait causes trouble? How do they justify it?','Confunde proteger a otros con decidir siempre por ellos.','They confuse protecting others with always deciding for them.'),
  q('fears','Miedos','Fears','¿Qué teme perder o enfrentar? ¿Cómo evita ese miedo?','What do they fear losing or facing? How do they avoid it?','Teme quedarse solo y promete más de lo que puede cumplir.','They fear being alone and promise more than they can deliver.'),
  q('insecurities','Inseguridades','Insecurities','¿Qué duda de sí mismo evita mostrar? ¿Qué activa esa inseguridad?','Which self-doubt do they hide? What triggers it?','Bromea sobre sus logros porque teme que descubran que no se siente capaz.','They joke about their achievements to hide feeling inadequate.'),
  q('contradictions','Contradicciones','Contradictions','¿Qué hace que contradice lo que dice creer?','What do they do that contradicts their stated beliefs?','Defiende la sinceridad, pero oculta su verdadero nombre.','They defend honesty but hide their real name.')
 ]},
 {id:'habits',title:{es:'Valores, gustos y hábitos',en:'Values, interests and habits'},questions:[
  q('values','Valores','Values','¿Qué principio se niega a traicionar? ¿Qué podría ponerlo a prueba?','Which principle will they not betray? What could test it?','Nunca abandona a alguien, incluso cuando eso pone en riesgo su misión.','They never abandon anyone, even when it endangers their mission.'),
  q('passions','Pasiones e intereses','Passions and interests','¿Qué hace por placer cuando nadie le exige nada?','What do they do for pleasure when nobody needs anything from them?','Dibuja mapas de lugares imaginarios en los márgenes de sus cartas.','They sketch imaginary maps in the margins of letters.'),
  q('habits','Hábitos','Habits','¿Qué rutina le da seguridad y qué ocurre si se rompe?','Which routine provides comfort, and what happens when it is disrupted?','Prepara dos tazas de té aunque vive solo.','They prepare two cups of tea despite living alone.'),
  q('beliefs','Creencias','Beliefs','¿Qué cree sobre el mundo y de dónde viene esa certeza?','What do they believe about the world, and where does that certainty come from?','Cree que las deudas siempre se pagan porque su madre se lo enseñó.','They believe debts must always be repaid because their mother taught them so.')
 ]},
 {id:'history',title:{es:'Historia personal',en:'Personal history'},questions:[
  q('origin','Lugar de origen','Place of origin','¿Dónde creció? ¿Qué de ese lugar lleva todavía consigo?','Where did they grow up? What do they still carry from that place?','Viene de un pueblo costero y calcula el tiempo por las mareas.','They come from a coastal village and measure time by the tides.'),
  q('past','Pasado','Past','¿Qué experiencia cambió su manera de vivir?','Which experience changed the way they live?','Una noche no llegó a tiempo para ayudar a su hermano.','One night they failed to reach their brother in time.'),
  q('education','Educación u oficio','Education or occupation','¿Qué sabe hacer y quién se lo enseñó?','What can they do, and who taught them?','Aprendió a leer reparando las máquinas de una biblioteca.','They learned to read while repairing machines at a library.'),
  q('secret','Secreto','Secret','¿Qué no quiere que se sepa? ¿A quién dañaría revelarlo?','What do they want to keep hidden? Who would be hurt if it came out?','La carta que busca fue escrita por él mismo años atrás.','The letter they seek was written by their younger self.')
 ]},
 {id:'relationships',title:{es:'Relaciones',en:'Relationships'},questions:[
  q('family','Familia','Family','¿A quién considera su familia, y por qué?','Who do they consider family, and why?','Su verdadera familia son las personas con las que compartió el viaje.','Their true family are the people who shared their journey.'),
  q('relationships','Relaciones importantes','Important relationships','¿Quién lo comprende mejor? ¿Con quién mantiene un conflicto sin resolver?','Who understands them best? With whom is there unresolved conflict?','Confía en su antigua maestra, aunque nunca le perdonó una mentira.','They trust their former teacher but never forgave one lie.'),
  q('trust','Confianza e intimidad','Trust and intimacy','¿Cómo demuestra afecto y qué necesita para confiar?','How do they show affection, and what do they need to trust someone?','Arregla las cosas de otros en silencio; le cuesta pedir ayuda.','They quietly fix other people’s belongings but struggle to ask for help.')
 ]},
 {id:'story',title:{es:'Papel en la historia',en:'Role in the story'},questions:[
  q('goal','Objetivo en la historia','Story goal','¿Qué quiere conseguir y qué cree que eso solucionará?','What do they want, and what do they believe it will solve?','Busca una llave para volver a casa, convencida de que allí todo seguirá igual.','They seek a key to return home, believing everything there will be unchanged.'),
  q('motivation','Motivación','Motivation','¿Por qué actúa ahora? ¿Qué pasaría si no hiciera nada?','Why act now? What would happen if they did nothing?','La última persona que recuerda su ciudad está empezando a olvidarla.','The last person who remembers their city is beginning to forget it.'),
  q('conflict','Conflicto','Conflict','¿Qué obstáculo externo y qué lucha interna se interponen?','Which external obstacle and inner struggle stand in the way?','Debe pedir ayuda al enemigo al que juró no volver a hablar.','They must ask for help from the enemy they swore never to speak to again.'),
  q('arc','Arco del personaje','Character arc','¿Qué tendrá que aprender, aceptar o dejar atrás?','What must they learn, accept or leave behind?','Aprende que volver a casa no significa regresar al pasado.','They learn that returning home does not mean returning to the past.')
 ]}
];
/** Read old localized question keys without tying new answers to the UI language. */
export function normalizeGuideAnswers(answers:Record<string,string> = {}):Record<string,string>{
 const normalized={...answers};
 for(const category of characterGuide)for(const question of category.questions){
  const values=[answers[question.id],answers[question.label.es],answers[question.label.en]].filter((v):v is string=>v!==undefined);if(values.length)normalized[question.id]=[...new Set(values)].join('\n\n');
  delete normalized[question.label.es];delete normalized[question.label.en];
 }
 return normalized;
}
export function guideAnswerText(answers:Record<string,string>,language:GuideLanguage):string{
 const labels=new Map(characterGuide.flatMap(c=>c.questions.map(q=>[q.id,q.label[language]] as const)));
 return Object.entries(normalizeGuideAnswers(answers)).filter(([,value])=>value.trim()).map(([id,value])=>`${labels.get(id)||id}: ${value}`).join('\n\n');
}
