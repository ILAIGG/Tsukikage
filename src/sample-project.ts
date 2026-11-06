import type { Novel, Settings } from './model';

/** A self-contained example, used only when the browser has no saved workspace. */
export function createSampleProject(language:Settings['language']):Novel[]{
 const es=language==='es';
 const html=(text:string)=>text.split('\n\n').map(p=>`<p>${p}</p>`).join('');
 const chapterData=es?[
 ['Prólogo — La última campana','Lía descubre que la oscuridad de Asteria tiene una causa humana.',[
 ['Trece golpes','Lía recibe la carta y decide acudir a la torre.',`La campana sonó trece veces aquella noche. Lía Sol dejó las herramientas sobre el tejado y contó de nuevo, aunque el último golpe ya se había disuelto en la lluvia. En Asteria, la campana del reloj solo daba doce. Su padre lo había construido así para que nadie confundiera la hora con una advertencia.

Una carta se deslizó bajo su caja de herramientas. El papel estaba seco. En el sobre aparecía la letra de su padre, muerto hacía siete años: «Si oyes la decimotercera campana, busca lo que dejamos sin terminar». Dentro había una pequeña llave de cobre y un dibujo de la torre.

Lía acercó el papel a la lámpara. No encontró trucos, ni marcas de un mensajero. Solo una mancha de aceite con olor a romero, el mismo que su padre utilizaba para limpiar los engranajes. Quiso romper la carta. Resultaba más fácil enfadarse con una broma que admitir cuánto deseaba creerla.

Entonces la luna se apagó. No desapareció tras una nube: quedó suspendida sobre la ciudad como una moneda negra. En las calles alguien gritó. Lía guardó la llave, sujetó la escalera al canalón y bajó. Si aquella era una advertencia, ya no tenía tiempo para discutir con ella.`],
 ['El vigilante de la torre','Noa revela que la luz procede de una máquina.',`Noa Vela la esperaba en la puerta de la Torre de las Horas. Sostenía una linterna apagada y tenía el abrigo puesto del revés. Lía lo conocía del mercado, donde vendía relojes que siempre adelantaban cinco minutos. «Para que nadie llegue tarde a lo importante», decía.

—La llave —pidió él.

—Primero, una explicación.

Noa señaló el cielo. La luna verdadera había dejado de verse muchos años atrás, cuando una niebla espesa cubrió el valle. Su resplandor era obra de una máquina instalada bajo la torre. El padre de Lía había ayudado a construirla. Desde entonces, cada noche, la ciudad le entregaba una parte de su electricidad.

—Esta noche alguien ha cerrado el conducto principal. La campana de emergencia ha sonado por primera vez.

Lía pensó en todas las noches que había pasado mirando aquel círculo de luz para sentirse menos sola. La mentira le dolió más que la oscuridad. Noa no intentó consolarla. Le ofreció la linterna y se apartó de la puerta.

La llave giró sin resistencia. Al otro lado, unas escaleras descendían hacia un latido de metal. Lía encendió la linterna con su pedernal. No sabía si quería reparar la máquina o romperla, pero necesitaba verla con sus propios ojos.`]
 ]],
 ['Capítulo 1 — Una carta imposible','El mapa de una antigua mecánica revela el precio de la luz.',[
 ['La biblioteca de las mareas','Iria conserva las instrucciones originales.',`Las escaleras terminaban ante una compuerta soldada. Noa examinó las bisagras mientras Lía buscaba una entrada lateral. Sobre el muro encontró un símbolo: tres líneas curvas y una estrella. Lo había visto grabado en la puerta de la Biblioteca de las Mareas.

Llegaron allí antes del amanecer. Iria Mar abrió sin preguntar por qué traían barro hasta las rodillas. La bibliotecaria escuchó la historia, puso agua al fuego y sacó de un cajón un cuaderno encuadernado con hilo rojo.

—Tu padre me pidió que lo guardara hasta que alguien viniera a hacer la pregunta correcta.

—¿Cómo encendemos la luna? —preguntó Lía.

Iria negó con la cabeza.

Noa dejó la linterna sobre la mesa.

—¿Por qué se ha apagado?

Entre las páginas había un mapa del subsuelo y un registro de consumo. Durante años, la máquina había tomado energía de los talleres. El último invierno, el consejo había conectado también las viviendas del barrio bajo. La luz del cielo se alimentaba de estufas apagadas.

Lía recordó los dedos amoratados de una vecina que le había pedido reparar una resistencia. Había culpado al frío, a las instalaciones viejas, a cualquier cosa menos a aquel resplandor hermoso. Ahora las cifras tenían rostros. Iria desplegó el mapa y señaló un canal que desembocaba bajo la torre. Todavía podían llegar a la sala del mecanismo.`],
 ['El mapa de ceniza','Los compañeros eligen reparar la ciudad antes que su apariencia.',`El canal olía a piedra mojada y hojas podridas. Noa caminaba delante, probando el suelo con una vara. Lía llevaba el cuaderno dentro del abrigo. Cada pocos pasos, el mapa mostraba una marca distinta: una válvula, un puente de servicio, una salida que ya no existía.

Al llegar a una bifurcación encontraron ceniza reciente. Alguien había quemado una copia de los planos. Bajo un fragmento de papel, Lía reconoció una anotación de Iria. La bibliotecaria los había seguido y los alcanzó poco después, sin aliento.

—Yo cerré el conducto y llevé la carta a tu taller —admitió—. Tu padre la dejó preparada por si llegábamos a este punto. Anoche murió otra estufa. No iba a esperar a que el consejo decidiera cuántas más podían apagarse.

Noa dio un paso atrás. Su hermana vivía junto al mercado; él había mantenido la máquina durante años sin preguntar de dónde venía la energía. Lía esperaba una discusión, pero él solo pidió el mapa.

—Entonces no volvemos a encenderla igual.

En el cuaderno, su padre había dibujado una alternativa: pequeñas lámparas distribuidas por la ciudad. El consejo la había tachado por «falta de grandeza». Lía trazó la ruta hasta la sala de distribución. Necesitarían todas las piezas del proyector y alguien dispuesto a trabajar desde el otro lado de la compuerta. Noa levantó la vara a modo de saludo. Por primera vez, sus cinco minutos de adelanto parecían una promesa útil.`]
 ]],
 ['Capítulo 2 — La luz que elegimos','Asteria sustituye una ilusión por una red de luces compartidas.',[
 ['La sala del mecanismo','Lía y Noa desconectan el proyector de forma segura.',`La máquina ocupaba toda la cámara. Sus anillos de cobre giraban todavía por inercia, con un gemido que hacía vibrar el suelo. Lía apoyó una mano en la barandilla. Allí estaban las limaduras, el olor a romero, la manera de ordenar las herramientas. Su padre había existido en aquel lugar, pero sus decisiones no tenían por qué gobernarlo para siempre.

Noa consiguió abrir la compuerta desde dentro. Iria subió a buscar ayuda mientras ellos soltaron la correa del proyector. La primera abrazadera cedió; la segunda estaba soldada por el calor. Lía golpeó con demasiada fuerza y la llave cayó entre los anillos.

Se quedó inmóvil. Era lo único que conservaba de la carta, la prueba de que aquella noche había empezado con una voz conocida. Noa sujetó su muñeca antes de que metiera la mano.

—Podemos fabricar otra.

Lía miró la llave una última vez y tomó una herramienta nueva. Juntos aflojaron el soporte, cerraron la válvula y esperaron a que la rueda se detuviera. Cuando el mecanismo calló, escucharon algo pequeño y lejano: las tuberías de calefacción volvían a circular. Arriba, en una vivienda del barrio bajo, alguien tendría una razón para quitarse los guantes.`],
 ['Una ciudad de ventanas','El barrio construye una solución y Lía encuentra una nueva tarea.',`Al mediodía, la plaza estaba llena de mesas prestadas. Iria había llevado los planos. Las familias trajeron cables, botellas de vidrio y lámparas rotas. Nadie sabía construir una luna, pero casi todo el mundo sabía hacer algo que otra persona necesitaba.

Lía explicó cómo repartir la corriente sin volver a vaciar las casas. Noa anotó cada conexión y pidió a dos vecinas que comprobaran sus cálculos. Cuando un representante del consejo preguntó quién había autorizado el desmontaje, Iria le ofreció una silla y un rollo de alambre. Tras un largo silencio, el hombre se sentó.

La primera lámpara se encendió al atardecer. Después otra, y otra más, hasta que las calles parecieron un mapa dibujado a mano. No iluminaban los tejados como antes. Dejaban rincones oscuros y obligaban a mirar por dónde se caminaba. También permitían ver las caras.

Lía regresó a su taller. Guardó la carta en un cajón y dejó sobre la mesa una lista de reparaciones para el día siguiente. Ya no buscaba en el cielo una respuesta que le debiera su padre.

Antes de acostarse abrió la ventana. La niebla seguía allí, y detrás de ella habría una luna que nadie podía prometerle. Abajo, Noa ajustaba el reloj de la plaza. Esta vez lo dejó en hora. Lía levantó una mano y él respondió desde la luz de una ventana. Por aquella noche, bastaba.`]
 ]]
 ]:[
 ['Prologue — The Last Bell','Lía discovers that Asteria’s darkness has a human cause.',[
 ['Thirteen strokes','Lía receives a letter and heads for the tower.',`The bell rang thirteen times that night. Lía Sol set her tools on the roof and counted again, though the final stroke had already dissolved into the rain. In Asteria, the clock bell only rang twelve times. Her father had built it that way so nobody would mistake the hour for a warning.

A letter slid beneath her toolbox. The paper was dry. Her father’s handwriting covered the envelope, although he had been dead for seven years: “If you hear the thirteenth bell, look for what we left unfinished.” Inside lay a small copper key and a drawing of the tower.

Lía held the paper beside her lamp. There were no tricks or messenger’s marks, only an oil stain that smelled of rosemary, the oil her father had used to clean his gears. She wanted to tear the letter up. Anger at a cruel joke was easier than admitting how badly she wanted to believe it.

Then the moon went out. It did not vanish behind a cloud; it hung over the city like a black coin. Someone screamed in the street. Lía pocketed the key, secured her ladder to the gutter and climbed down. If this was a warning, there was no time left to argue with it.`],
 ['The tower keeper','Noa reveals the machine behind the moonlight.',`Noa Vela waited outside the Tower of Hours. He held an unlit lantern and wore his coat inside out. Lía knew him from the market, where he sold clocks that always ran five minutes fast. “So nobody misses what matters,” he used to say.

“The key,” he said.

“An explanation first.”

Noa pointed at the sky. The real moon had disappeared years ago, when a thick mist settled over the valley. Its glow came from a machine beneath the tower. Lía’s father had helped build it. Every night since then, the city had given it a share of its electricity.

“Someone shut the main conduit tonight. That was the emergency bell. It’s never rung before.”

Lía thought of all the nights she had watched that circle of light to feel less alone. The lie hurt more than the darkness. Noa did not try to comfort her. He offered her the lantern and stepped away from the door.

The key turned without resistance. Beyond the doorway, stairs descended towards a metallic heartbeat. Lía lit the lantern with her flint. She did not know whether she wanted to repair the machine or break it, but she needed to see it for herself.`]
 ]],
 ['Chapter 1 — An Impossible Letter','An old mechanic’s map reveals the price of the light.',[
 ['The Library of Tides','Iria keeps the original instructions.',`The stairs ended at a welded hatch. Noa examined the hinges while Lía searched for another entrance. On the wall she found a symbol: three curved lines and a star. She had seen it carved into the door of the Library of Tides.

They reached the library before dawn. Iria Mar opened without asking why they were covered in mud. She listened, put water on to boil and took a notebook bound with red thread from a drawer.

“Your father asked me to keep this until someone came with the right question.”

“How do we light the moon?” Lía asked.

Iria shook her head.

Noa set the lantern on the table.

“Why did it go out?”

Between the pages lay a map of the tunnels and a consumption ledger. For years the machine had drawn power from workshops. Last winter, the council had connected the houses in the lower district as well. The light in the sky was fed by extinguished heaters.

Lía remembered a neighbour’s purple fingers as she asked her to mend a heating coil. She had blamed the cold, the old wiring, anything but that beautiful glow. Now the figures had faces. Iria spread the map out and pointed to a channel beneath the tower. They could still reach the distribution chamber.`],
 ['The map of ash','The companions choose the city over its appearance.',`The channel smelled of wet stone and rotting leaves. Noa went first, testing the ground with a pole. Lía kept the notebook inside her coat. Every few steps the map showed another marker: a valve, a service bridge, an exit that no longer existed.

At a junction they found fresh ash. Someone had burned a copy of the plans. On one surviving scrap Lía recognised Iria’s handwriting. The librarian had followed them and caught up a moment later, breathless.

“I closed the conduit and brought the letter to your workshop,” she admitted. “Your father left it ready in case we reached this point. Another heater died last night. I wasn’t going to wait for the council to decide how many more could go dark.”

Noa stepped back. His sister lived beside the market. He had maintained the machine for years without asking where its power came from. Lía expected an argument, but he only asked for the map.

“Then we don’t turn it back on the same way.”

In the notebook, her father had sketched an alternative: small lamps distributed throughout the city. The council had crossed it out for its “lack of grandeur.” Lía traced a route to the distribution chamber. They would need every part of the projector and someone working on the other side of the hatch. Noa raised his pole in salute. For once, his five minutes of borrowed time felt like a useful promise.`]
 ]],
 ['Chapter 2 — The Light We Choose','Asteria replaces an illusion with a shared network of lights.',[
 ['The mechanism chamber','Lía and Noa safely disconnect the projector.',`The machine filled the chamber. Its copper rings still turned under their own momentum, groaning hard enough to shake the floor. Lía rested a hand on the railing. There were the metal filings, the rosemary smell, the carefully ordered tools. Her father had existed in this room, but his decisions did not have to rule it forever.

Noa opened the hatch from within. Iria went upstairs for help while they loosened the projector belt. The first clamp gave way; the second had welded itself shut with heat. Lía struck too hard and the key fell between the rings.

She froze. It was all she had kept from the letter, proof that this night had begun with a familiar voice. Noa caught her wrist before she could reach inside.

“We can make another.”

Lía looked at the key one last time and picked up a different tool. Together they loosened the mounting, closed the valve and waited for the wheel to stop. When the mechanism fell silent, they heard something small and distant: water was flowing through the heating pipes again. Somewhere above them, someone in the lower district would have a reason to take their gloves off.`],
 ['A city of windows','The neighbourhood builds a solution and Lía finds new work.',`By noon, the square was full of borrowed tables. Iria had brought the plans. Families arrived with wires, glass bottles and broken lamps. Nobody knew how to build a moon, but almost everyone knew how to do something another person needed.

Lía explained how to share the current without draining the houses again. Noa recorded every connection and asked two neighbours to check his calculations. When a council representative asked who had authorised the dismantling, Iria offered him a chair and a spool of wire. After a long silence, he sat down.

The first lamp came on at dusk. Then another, and another, until the streets resembled a hand-drawn map. They did not light the rooftops as before. They left dark corners and made people watch their steps. They also made it possible to see each other’s faces.

Lía returned to her workshop. She put the letter in a drawer and left tomorrow’s repair list on the table. She no longer searched the sky for an answer her father owed her.

Before bed, she opened the window. The mist was still there, and behind it was a moon nobody could promise her. Below, Noa adjusted the square’s clock. This time he set it correctly. Lía raised a hand, and he answered from the light of a window. For tonight, that was enough.`]
 ]]
 ];
 const characters=['sample-lia','sample-noa','sample-iria'];
 const locations=[['sample-tower','sample-roof'],['sample-library','sample-channel'],['sample-chamber','sample-square']];
 const chapters=chapterData.map(([title,synopsis,raw],i)=>{
  const scenes=(raw as string[][]).map(([title,description,text],j)=>({id:`sample-c${i+1}-s${j+1}`,title,description,text:html(text),characterIds:i===0?characters.slice(0,2):characters,placeIds:[locations[i][j]]}));
  return {id:`c${i+1}`,title:title as string,synopsis:synopsis as string,progress:100,scenes,text:scenes.map(s=>s.text).join('<p><br></p>'),characterIds:i===0?characters.slice(0,2):characters,placeIds:locations[i]};
 });
 const pick=(spanish:string,english:string)=>es?spanish:english;
 return [{id:'moon',title:pick('La ciudad bajo la luna','The City Beneath the Moon'),genre:pick('Fantasía, Proyecto de prueba','Fantasy, Sample project'),updated:pick('Proyecto de muestra','Sample project'),synopsis:pick('Cuando la luna artificial de Asteria se apaga, una mecánica descubre el precio de su luz y ayuda a su barrio a elegir un futuro diferente.','When Asteria’s artificial moon goes dark, a mechanic discovers the price of its light and helps her neighbourhood choose a different future.'),chapters,revisions:{},entries:[
  ...characters.map((id,i)=>({id,kind:'character' as const,name:['Lía Sol','Noa Vela','Iria Mar'][i],description:html([pick('Mecánica de tejados. Lleva un abrigo remendado y reconoce los engranajes por su sonido. Le cuesta pedir ayuda.','A rooftop mechanic with a patched coat who recognises gears by their sound. Asking for help is difficult for her.'),pick('Relojero y guardián de la torre. Su humor esconde el miedo a haber contribuido al daño de su barrio.','A clockmaker and tower keeper whose humour hides his fear of having hurt his own neighbourhood.'),pick('Bibliotecaria y antigua colaboradora del padre de Lía. Conserva los planos y decide actuar cuando el consejo no lo hace.','A librarian and former colleague of Lía’s father. She preserves the plans and acts when the council will not.')][i]),character:{firstName:['Lía','Noa','Iria'][i],surname:['Sol','Vela','Mar'][i],role:i===0?'protagonist':'main',descriptionMode:'guided' as const,guided:{goal:html([pick('Devolver la luz sin quitar calor a las viviendas.','Restore light without taking heat from homes.'),pick('Reparar el daño y recuperar la confianza del barrio.','Repair the damage and regain the neighbourhood’s trust.'),pick('Compartir el conocimiento que el consejo mantuvo oculto.','Share the knowledge the council kept hidden.')][i]),arc:html(pick('Aprende a compartir la responsabilidad y aceptar ayuda.','Learns to share responsibility and accept help.'))},relatedCharacterIds:characters.filter(other=>other!==id),relationshipLabels:Object.fromEntries(characters.filter(other=>other!==id).map(other=>[other,pick('Aliado en la reparación de Asteria','Ally in repairing Asteria')])),placeLinks:[{placeId:i===2?'sample-library':'sample-tower',role:'work' as const}]}})),
  {id:'sample-city',kind:'place',name:'Asteria',description:html(pick('Una ciudad de talleres en un valle cubierto de niebla. Sus habitantes comienzan a decidir cómo repartir la energía que producen.','A workshop city in a mist-covered valley. Its inhabitants begin to decide how to share the energy they produce.')),place:{type:'city',descriptionMode:'free'}},
  ...[
   ['sample-tower',pick('Torre de las Horas','Tower of Hours'),'building','sample-city',pick('Reloj público y entrada al mecanismo de la luna artificial.','Public clock and entrance to the artificial moon mechanism.')],
   ['sample-roof',pick('Tejado del taller','Workshop roof'),'room','sample-tower',pick('Tejas resbaladizas y una vista abierta al cielo. Aquí llega la carta.','Slippery tiles and an open view of the sky. The letter arrives here.')],
   ['sample-library',pick('Biblioteca de las Mareas','Library of Tides'),'building','sample-city',pick('Un refugio de libros técnicos, mapas y mesas de trabajo. Iria guarda aquí los planos originales.','A refuge of technical books, maps and worktables. Iria keeps the original plans here.')],
   ['sample-channel',pick('Canal de servicio','Service channel'),'building','sample-city',pick('Pasaje húmedo bajo las calles que permite llegar a la torre.','A damp passage beneath the streets that leads to the tower.')],
   ['sample-chamber',pick('Sala del mecanismo','Mechanism chamber'),'room','sample-tower',pick('Cámara de anillos de cobre, válvulas y tuberías de calefacción.','A chamber of copper rings, valves and heating pipes.')],
   ['sample-square',pick('Plaza de las Ventanas','Square of Windows'),'other','sample-city',pick('Espacio de encuentro donde el barrio construye su nueva red de lámparas.','A gathering place where the neighbourhood builds its new lamp network.')]
  ].map(([id,name,type,parentId,description])=>({id,name,kind:'place' as const,description:html(description),place:{type:type as 'building'|'room'|'other',parentId,descriptionMode:'free' as const}})),
  {id:'sample-note-guide',kind:'note',name:pick('Acerca de este proyecto de prueba','About this sample project'),description:pick('Este es un proyecto de prueba incluido con Tsukikage. Todos sus textos y personajes son ficticios. Se puede editar o eliminar libremente. Los tres capítulos forman un relato completo; las escenas, apariciones y relaciones permiten explorar las funciones de la aplicación. Eliminar esta muestra no elimina los proyectos propios.','This is a sample project included with Tsukikage. All its characters and text are fictional. It can be freely edited or deleted. Its three chapters form a complete short story; scenes, appearances and relationships demonstrate the app’s features. Deleting this sample does not delete personal projects.')},
  {id:'sample-note-theme',kind:'note',chapterId:'c2',name:pick('Tema y continuidad','Theme and continuity'),description:pick('Tema: una comunidad elige el bienestar compartido frente a una apariencia perfecta. La carta fue preparada por el padre antes de morir; Iria la entrega cuando cierra el conducto. La llave se pierde en el tercer capítulo. La niebla no desaparece al final: cambia la forma de vivir con ella.','Theme: a community chooses shared wellbeing over a perfect appearance. The father prepared the letter before his death; Iria delivers it when she closes the conduit. The key is lost in the third chapter. The mist does not disappear at the end: people change how they live with it.')},
  {id:'sample-note-explore',kind:'note',chapterId:'c3',name:pick('Explorar la muestra','Explore the sample'),description:pick('Prueba la búsqueda de «lámpara», abre las apariciones de Lía y recorre la jerarquía de la torre. Las relaciones y los lugares de trabajo están vinculados. Antes de experimentar con importaciones, descarga una copia JSON.','Try searching for “lamp”, open Lía’s appearances and explore the tower hierarchy. Relationships and workplaces are linked. Download a JSON backup before experimenting with imports.')}
 ]}];
}
