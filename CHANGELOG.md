# Changelog

Los cambios notables de Tsukikage se registran aquí.

## [0.39.1] - 2026-11-09

### Corregido
- Editor integrado en temas claro y oscuro: barra de herramientas unida al borde, márgenes internos compactos y pie sin espacio sobrante, también en personajes y lugares.
- El foco se indica en el contorno exterior del editor, sin un rectángulo de color dentro del área de escritura.

## [0.39.0] - 2026-11-09

### Añadido
- Imágenes locales en capítulos, descripciones libres y guiadas de personajes y lugares, y notas, mediante la barra de herramientas compartida.
- Tamaño relativo, descripción alternativa y eliminación de imágenes. Las imágenes se optimizan y guardan dentro del proyecto y sus copias JSON, sin depender de servicios externos.
- Conservación de imágenes en EPUB, Word, PDF y Markdown. Se admiten PNG, JPG, WebP y GIF de hasta 10 MB; se insertan como imágenes estáticas optimizadas.

## [0.38.0] - 2026-11-09

### Añadido
- Enlaces wiki en los editores de capítulos, descripciones libres y guiadas, y notas: búsqueda de personajes, lugares, capítulos, escenas y notas del proyecto.
- Inserción sobre texto seleccionado, apertura con Ctrl/Cmd + clic, eliminación de enlaces y aviso de destinos eliminados. Los enlaces se conservan en JSON y se adaptan al crear proyectos desde plantillas.
- Notas con el mismo editor enriquecido. Los formatos de manuscrito conservan el texto de las referencias internas sin enlaces a destinos ajenos al libro.

## [0.37.0] - 2026-11-09

### Añadido
- Menú «Importar/Exportar» con copias JSON de un proyecto completo o de toda la biblioteca.
- Importación individual con historial, sin modificar otros proyectos ni preferencias. Reemplazar un proyecto existente requiere confirmación y descarga previa de una copia de seguridad.

## [0.36.0] - 2026-11-09

### Añadido
- Historial completo de proyectos con restauración segura y punto de retorno, además de las versiones de capítulos.
- Plantillas personales reutilizables que conservan estructura, textos y mundo con identificadores independientes. Las versiones y plantillas se incluyen en las copias JSON.
- Opciones editoriales por proyecto para EPUB, DOCX y PDF: autoría, subtítulo, idioma, portada, tipografía y papel. El DOCX conserva formato enriquecido y los capítulos comienzan en páginas nuevas.

### Corregido
- Foco, navegación por teclado y nombres accesibles en los diálogos, la barra lateral contraída, el editor y los avisos.
- EPUB con capítulos XHTML válidos y metadatos localizados. Roadmap actualizado sin marcar como realizadas las verificaciones externas pendientes.

## [0.35.0] - 2026-11-09

### Añadido
- Reordenamiento de capítulos mediante arrastre con inserción y controles alternativos por teclado.
- Metas opcionales de palabras por proyecto y objetivos de sesión con progreso neto y persistencia tras recargar, disponibles desde el proyecto y la planificación.
- Roadmap actualizado para distinguir funciones entregadas y comprobaciones pendientes de la beta local.

## [0.34.3] - 2026-11-08

### Mejorado
- Las páginas de personajes y lugares y la biblioteca de sincronización opcional se cargan por separado para reducir el paquete inicial, manteniendo el funcionamiento local y la disponibilidad offline.

## [0.34.2] - 2026-11-08

### Corregido
- Personalización de portadas en un diálogo con vista previa, navegación por teclado y retorno del foco, sin estirar las tarjetas.
- Preferencias separa su contenido desplazable del pie, manteniendo accesible la instalación en pantallas pequeñas.
- Nombres y aclaraciones de las preferencias de escritura más precisos, con vista previa real del manuscrito. Las portadas limitan su tamaño y permiten recorrer textos extensos.

## [0.34.1] - 2026-11-08

### Corregido
- Las portadas muestran únicamente el título y el género, sin el encabezado «Una historia» / «A story».

## [0.34.0] - 2026-11-08

### Añadido
- Portadas editoriales con título y género, cuatro paletas y tres estilos personalizables por historia; la elección se conserva en copias JSON.
- Preferencias de tipografía serif/sans-serif e interlineado para el manuscrito, sin cambiar el contenido ni los formatos de exportación.

### Mejorado
- Mayor legibilidad de navegación, metadatos, campos y planificación; ancho de lectura y márgenes del manuscrito refinados.
- Salida del modo enfoque legible también en móvil. Los proyectos antiguos conservan sus datos y reciben portadas y preferencias predeterminadas.

## [0.33.0] - 2026-11-08

### Mejorado
- Superficies y textos de Claro/Oscuro con mayor separación y contraste, conservando las paletas personalizadas.
- Portadas editoriales discretas, jerarquía del proyecto y lectura del manuscrito refinadas.
- Foco visible y reducción de movimiento coherentes con las preferencias del sistema.

## [0.32.0] - 2026-11-06

### Añadido
- Proyecto de muestra en español o inglés según el idioma de la primera apertura: tres capítulos completos con seis escenas, personajes, lugares jerárquicos, relaciones, apariciones y notas. Se identifica como proyecto de prueba y solo se incorpora cuando no hay un espacio guardado.

## [0.31.5] - 2026-11-06

### Documentación
- README en español e inglés orientado a visitantes y colaboradores, con funciones, instalación, copias y estado de la beta. Las notas operativas de publicación se conservan solo de forma local.

## [0.31.4] - 2026-11-06

### Corregido
- La instalación offline precarga el editor y las exportaciones con cachés por compilación, sin eliminar cachés ajenas ni mezclar versiones.
- El contenido enriquecido elimina recursos incrustados y atributos activos antes de convertirse a texto, mostrarse o exportarse.
- Configuración de seguridad para la beta local en Vercel y README renovado en español e inglés, con límites, instalación, copias y migración entre dominios.

## [0.31.3] - 2026-11-06

### Corregido
- Preferencias muestra un botón visible para instalar Tsukikage, abre la instalación nativa cuando está disponible y ofrece instrucciones en otros navegadores. Reconoce la aplicación instalada.

## [0.31.2] - 2026-11-06

### Corregido
- Los botones para borrar proyectos en Pop y DarkPop centran su icono dentro de una superficie cuadrada uniforme.

## [0.31.1] - 2026-11-06

### Corregido
- El selector de géneros mantiene su tamaño al añadir o quitar etiquetas, con áreas de desplazamiento para la selección y las sugerencias. Las sugerencias conservan su posición y muestran su estado seleccionado.

## [0.31.0] - 2026-11-06

### Añadido
- Reordenar proyectos por arrastre y crear géneros como etiquetas con sugerencias y separación por comas.
### Corregido
- Fondo del título de tarjetas consistente con el tema. Se retira el selector de plantillas y las flechas de reordenamiento.

## [0.30.0] - 2026-11-06

### Añadido
- La revisión señala capítulos vacíos y descripciones pendientes como sugerencias.
- Buscar en el proyecto con Ctrl/Cmd + Mayús + F; cerrar Preferencias con Escape.
- Buscar personajes por apodo, nombre y apellido. Roadmap actualizado con funciones entregadas y pendientes, manteniendo aplazada la nube.

## [0.29.0] - 2026-11-06

### Añadido
- Vista rápida del personaje con sus objetivos, conflictos, voz y evolución a partir de las respuestas guardadas.
- Preguntas opcionales sobre comportamiento bajo presión, forma de hablar, riesgos y etapas del arco narrativo.
- Las relaciones invitan a describir sentimientos y cambios a lo largo de la historia.

## [0.28.0] - 2026-11-06

### Añadido
- Las páginas de personajes y lugares permiten eliminarlos con confirmación y regresar a su lista; se limpian sus vínculos sin borrar los textos de capítulos ni las notas.

### Corregido
- Las secciones vacías de Personajes y Lugares del panel lateral muestran un mensaje compacto al desplegarse, respetando el diseño de cada tema.

## [0.27.3] - 2026-11-06

### Corregido
- El personaje o lugar abierto queda resaltado en el panel lateral con el estado seleccionado de su tema, también al guardarse por primera vez.
- Abrir personajes o lugares desde vínculos despliega su sección en el panel para mostrar la selección activa.

## [0.27.2] - 2026-11-06

### Corregido
- La gráfica de relaciones es ahora la cuarta pregunta de «Relaciones» dentro de la descripción guiada, con navegación anterior/siguiente y consulta desde el resumen de respuestas.
- Se elimina el apartado independiente y su selector Entrevista/Gráfica. Los textos de la antigua entrevista se integran en «Relaciones importantes», conservando las respuestas existentes y su formato.
- Los vínculos gráficos y sus etiquetas se conservan, incluidos los vínculos recibidos desde otros personajes, y se incluyen en el progreso de la categoría.

## [0.27.1] - 2026-11-06

### Corregido
- La lista principal de Personajes incorpora búsqueda por nombre, apellido o apodo y filtros combinables de tipo y lugar relacionado, con contador de resultados y limpieza de filtros, siguiendo el diseño de Lugares.
- Se retiran los filtros añadidos por error dentro de «Lugares del personaje», que vuelve a su selector sencillo sin alterar los vínculos guardados.

## [0.27.0] - 2026-11-06

### Añadido
- «Lugares del personaje» incorpora búsqueda por nombre o nombre alternativo, filtros combinables de tipo y ubicación superior, contador de resultados y limpieza de filtros, con el mismo diseño que la lista de Lugares.
- Los filtros permiten encontrar tanto lugares para añadir como vínculos ya guardados. Cambiar un filtro limpia la selección pendiente sin eliminar vínculos existentes.

## [0.26.0] - 2026-11-06

### Añadido
- Planificación permite seleccionar personajes y lugares por capítulo y por escena. Las apariciones de escenas también se muestran en el capítulo, y las páginas de personajes y lugares enlazan de vuelta al capítulo o escena correspondiente.
- Los personajes pueden vincularse a lugares como residencia, trabajo, nacimiento o lugar importante. Los lugares muestran los personajes relacionados y permiten abrir sus páginas.
- La lista de Lugares permite buscar por nombre o nombre alternativo y combinar filtros de tipo y ubicación superior.
- Los lugares muestran su jerarquía completa con cada nivel pulsable. Se pueden duplicar desde la lista o su página; la copia conserva su descripción, imagen y ubicación superior, sin trasladar hijos ni apariciones del original.

### Corregido
- Los vínculos de escenas se conservan al cargar proyectos e importar copias JSON. Las asignaciones antiguas a capítulos pasan a los nuevos selectores. Eliminar elementos del mundo limpia sus referencias sin borrar el texto del manuscrito.
- Los nuevos paneles de consulta y la barra de formato conservan superficies claras en el tema Claro.

## [0.25.2] - 2026-11-06

### Cambiado
- Las 27 preguntas de la entrevista de Lugares adaptan su redacción y sus ejemplos al tipo seleccionado, en español e inglés. «Otro» mantiene las ayudas generales.

### Corregido
- Cambiar el tipo actualiza también el ejemplo del editor sin perder las respuestas, su formato ni sus estados. Explorar todas las preguntas mantiene las ayudas del tipo elegido.

## [0.25.1] - 2026-11-06

### Cambiado
- Las opciones de tipo de lugar ahora muestran «Región / Nación / Reino» y «Ciudad / Pueblo / Asentamiento», con sus equivalentes en inglés.

## [0.25.0] - 2026-11-06

### Añadido
- Lugares tiene páginas completas dentro de Mundo, con resumen editable, guardado automático, nombre, nombres alternativos, tipo e imagen optimizada.
- Descripción libre con el editor de capítulos y entrevista guiada en seis categorías, con preguntas adaptadas al tipo de lugar, ejemplos y navegación anterior/siguiente. Todas las preguntas son opcionales; se puede explorar la entrevista completa y marcar «Por definir» o «No aplica» sin borrar respuestas.
- Ubicación dentro de otro lugar y navegación entre lugares superiores e inferiores del mismo proyecto. Se impiden vínculos consigo mismo y ciclos; al borrar un lugar, sus hijos se conservan sin esa ubicación superior.
- Los nombres alternativos y las respuestas guiadas se incluyen en la búsqueda del proyecto; imágenes, jerarquías y estados se conservan en las copias JSON.

### Corregido
- La ruta de navegación conserva un color legible en el tema Claro.

## [0.24.5] - 2026-11-06

### Corregido
- Progreso, descripción y eliminación de escena se agrupan en Planificación, al inicio del panel derecho. En pantallas estrechas aparecen antes del editor.
- Eliminar escena muestra una confirmación con su nombre y advierte que se borrará su texto; el botón tiene una etiqueta visible.
- El panel derecho se alinea desde arriba y sus elementos del esquema respetan el ancho disponible.

## [0.24.4] - 2026-11-06

### Corregido
- El editor de capítulos ocupa el mismo ancho que los controles de su sección en todos los temas.
- El papel ajusta su altura al contenido de escritura y al contador, eliminando el hueco inferior causado por una altura mínima adicional, también en personajes.

## [0.24.3] - 2026-11-06

### Corregido
- Se elimina el espacio extra entre la barra de formato y el texto. Se reducen y unifican los márgenes interiores del manuscrito y las descripciones del personaje en escritorio y móvil.

## [0.24.2] - 2026-11-06

### Corregido
- El papel del editor de capítulos usa el mismo radio y relieve de tecla que los demás controles de Pop y DarkPop; la barra de formato sigue la misma línea del marco.

## [0.24.1] - 2026-11-06

### Corregido
- Los campos de texto mantienen el tamaño y la apariencia definidos por cada tema, sin controles manuales para redimensionarlos.

## [0.24.0] - 2026-11-06

### Añadido
- Navegación jerárquica pulsable desde Mis historias hasta el proyecto, capítulos, Mundo, personajes y notas. La página actual se identifica y las rutas largas se pueden desplazar también en móvil.

### Corregido
- Se eliminan los títulos duplicados de la cabecera y se muestra el nombre real del capítulo o personaje abierto.

## [0.23.4] - 2026-11-06

### Corregido
- El avión de papel del logo es un 20 % más pequeño para dar mayor protagonismo a la luna, manteniendo sus pliegues y el contraste. Se actualizan también los iconos de instalación.

## [0.23.3] - 2026-11-06

### Corregido
- El avión de papel del logo se distingue de la luna mediante alas asimétricas, un pliegue visible y mayor contraste, conservando la identidad lunar de Tsukikage.
- Los iconos de instalación de 192 y 512 píxeles se regeneran desde el vector para evitar el aspecto borroso y se actualiza la caché de la aplicación.

## [0.23.2] - 2026-11-06

### Mantenimiento
- Se retiran del repositorio las pautas internas de trabajo de los temas y se amplían las exclusiones de configuración local para mantener limpia la documentación pública.

## [0.23.1] - 2026-11-06

### Corregido
- En Pop y DarkPop, el slider de tamaño de texto se rellena con el color del tema según su valor.
- Los botones inferiores de Preferencias tienen la misma altura y más separación respecto de la versión, sin superponerse con su línea divisoria.

### Cambiado
- Se elimina de Preferencias el control de ancho del editor.

## [0.23.0] - 2026-11-06

### Añadido
- Los personajes guardan automáticamente sus cambios y muestran el estado de guardado, con un resumen al abrirlos y accesos para editar su identidad, descripción libre y respuestas guiadas.
- Apodo y fecha de nacimiento opcionales, e imágenes que se pueden elegir, reemplazar o quitar. Las imágenes se optimizan y se conservan en las copias JSON.
- Relaciones con entrevista de texto enriquecido y una gráfica de vínculos entre personajes del mismo proyecto, etiquetas opcionales y navegación a cada personaje. Los vínculos también se muestran desde el personaje relacionado.

### Corregido
- Editar un personaje conserva su posición en la lista y no reinicia el editor al guardarlo por primera vez.
- Los textos con formato del personaje conservan el color de su tema, también en el resumen.

## [0.22.2] - 2026-11-06

### Corregido
- Los editores de Pop y DarkPop ya no muestran un contorno rectangular adicional al escribir; los controles conservan su indicador de foco.
- La tarjeta de Personajes en Mundo queda alineada con el título de la página.

## [0.22.1] - 2026-11-06

### Corregido
- Los editores Libre y Guiado del personaje ocupan el ancho de su sección, alineados con los textos y botones de navegación.

## [0.22.0] - 2026-11-06

### Cambiado
- Las respuestas de la entrevista del personaje utilizan el mismo editor enriquecido de los capítulos, con barra de formato, contador y tamaño de texto de Preferencias; conservan los ejemplos como placeholders.
- El resumen plegable conserva el formato de las respuestas y los textos antiguos siguen siendo editables. Las respuestas vacías no se cuentan como completadas y los listados y búsquedas muestran texto legible.

### Corregido
- Deshacer y Rehacer del editor no activan accidentalmente el guardado del personaje.

## [0.21.3] - 2026-11-06

### Corregido
- El campo de respuesta de la entrevista muestra solo el ejemplo como ayuda; la pregunta aparece una única vez, encima del campo.

## [0.21.2] - 2026-11-06

### Cambiado
- Se retira la pregunta de Pronombres de la entrevista del personaje en ambos idiomas, conservando las respuestas anteriores en los datos guardados.

## [0.21.1] - 2026-11-06

### Corregido
- La pregunta de Género se centra en la identidad y su expresión; los pronombres se preguntan únicamente en su apartado correspondiente, en ambos idiomas.

## [0.21.0] - 2026-11-06

### Añadido
- La página del personaje ofrece descripción Libre y Guiada, con contenido independiente que se conserva al cambiar de modo y al guardar.
- La entrevista guiada reúne 34 preguntas opcionales en seis categorías, con preguntas disparadoras, ejemplos, navegación anterior/siguiente y resumen de respuestas plegables.
- Las respuestas guiadas guardadas se muestran en el listado de personajes y se incluyen en la búsqueda del proyecto; las respuestas antiguas se conservan al cambiar de idioma.

## [0.20.1] - 2026-11-05

### Corregido
- Los botones principales del panel lateral de Pop y DarkPop comparten altura y tienen más separación; los botones de añadir mantienen un tamaño uniforme sin agrandar sus filas.

## [0.20.0] - 2026-11-05

### Cambiado
- Pop y DarkPop comparten contornos, radios, sombras de tecla y estados de selección, hover, pulsación y foco en navegación, botones, tarjetas, editores y diálogos.
- Se incorporan acentos menta discretos en cabeceras, Mundo y consejos; se mejora la legibilidad de etiquetas y campos, incluidos Notas y Preferencias.
- Los sliders y menús mantienen la paleta del tema; el hover conserva la alineación y la pulsación hunde visualmente los controles.

### Verificación
- Se incorpora una revisión reproducible de las vistas principales y sus controles en Chromium, en escritorio y móvil, con capturas y comprobaciones de desbordamiento, centrado y estados de interacción.

## [0.19.2] - 2026-11-05

### Documentación
- Se renuevan los README en inglés y español con el icono del proyecto, enlaces rápidos y un resumen de funciones actuales. Se aclara el estado aplazado de Supabase y se documenta la prueba de recuperación en ambos idiomas.

## [0.19.1] - 2026-11-05

### Corregido
- El panel lateral de DarkPop utiliza un contorno simple y la misma sombra que los controles del editor, eliminando el doble borde brillante en navegación y contador diario.

## [0.19.0] - 2026-11-05

### Añadido
- La descripción del personaje utiliza el mismo editor enriquecido del manuscrito, con su barra de formato, tipografía y tamaño de texto configurado en Preferencias. Las descripciones existentes conservan su contenido.

## [0.18.2] - 2026-11-05

### Corregido
- El desplegable de tipo de personaje usa la paleta del tema también en su lista de opciones, selección y hover.
- Se corrigen los colores de campos y textos de personajes en Claro y se conservan los saltos de línea de sus descripciones.

## [0.18.1] - 2026-11-05

### Cambiado
- Nombre y Apellido aparecen juntos en la misma fila de la página del personaje, con Tipo debajo.

## [0.18.0] - 2026-11-05

### Añadido
- La página del personaje incluye un espacio reservado para imagen y campos separados de nombre, apellido y tipo de personaje.

## [0.17.1] - 2026-11-05

### Corregido
- Crear o abrir un personaje navega a su propia página principal, con cabecera y área de escritura propias, fuera del sistema de ventanas modales.

## [0.17.0] - 2026-11-05

### Añadido
- Mundo vuelve a ofrecer la sección Personajes y la acción Crear nuevo personaje, con guardado y acceso desde la navegación lateral.

## [0.16.0] - 2026-11-05

### Añadido
- Preferencias muestra al pie la versión actual de la aplicación, sincronizada con la compilación.

### Cambiado
- Las instrucciones locales de agentes dejan de formar parte de los archivos publicados del repositorio.

## [0.15.0] - 2026-11-05

### Cambiado
- Se retiran los flujos de creación y edición de personajes, lugares y acontecimientos para reestructurarlos desde cero. Notas conserva su editor y los datos existentes se mantienen.

## [0.14.6] - 2026-11-05

### Corregido
- Se elimina de la ficha el selector que permitía cambiar su categoría entre personaje, lugar, nota y acontecimiento. El tipo queda fijo al crearla.

## [0.14.5] - 2026-11-05

### Corregido
- La vista de ficha deja de quedar centrada dentro del fondo de modal y ocupa el área principal de trabajo, conservando visible la navegación.

## [0.14.4] - 2026-11-05

### Cambiado
- Las fichas de mundo se abren como vistas principales dentro del área de trabajo, con la navegación lateral visible y sin ventana superpuesta. La creación de personaje solicita tipo, nombre y apellido antes de abrir su ficha.

## [0.14.3] - 2026-11-05

### Cambiado
- Crear un personaje empieza con Tipo, Nombre y Apellido; al continuar, abre directamente su ficha a pantalla completa.
- Crear o editar una ficha ocupa la vista completa de la aplicación, como el espacio del manuscrito.

## [0.14.2] - 2026-11-05

### Cambiado
- La descripción guiada recorre una categoría y una pregunta cada vez, permite volver y presenta las respuestas en secciones plegables al terminar o regresar al texto libre.
- La ficha se edita en una vista amplia propia. Relaciones ofrece entrevista o un árbol gráfico para elegir personajes vinculados.

## [0.14.1] - 2026-11-05

### Cambiado
- La descripción guiada de personajes se presenta como una entrevista: categorías plegables, preguntas abiertas y áreas amplias para redactar respuestas.

## [0.14.0] - 2026-11-05

### Añadido
- La ficha de personaje incorpora tipo, nombre, apellido, apodo, fecha de nacimiento y descripción libre o guiada con preguntas opcionales agrupadas por categorías.
- El roadmap aplaza explícitamente la validación de Supabase y continúa con la organización local del mundo.

## [0.13.3] - 2026-11-05

### Verificado
- La recuperación del manuscrito conserva el borrador pendiente tras cerrar Chromium, permite restaurarlo y mantiene el texto recuperado después de otra apertura. Se incorpora una comprobación reproducible con perfil temporal.

## [0.13.2] - 2026-11-05

### Corregido
- El hover de la sinopsis tiene espacio alrededor del texto y esquinas redondeadas con el acento del tema.
- El campo de edición recupera su espaciado y redondeado anteriores.

## [0.13.1] - 2026-11-05

### Corregido
- El campo de edición de la sinopsis tiene más espacio interior y exterior, con esquinas más redondeadas.

## [0.13.0] - 2026-11-05

### Añadido
- La sinopsis del Grimorio se muestra como texto al salir del campo y vuelve a editarse al tocarla. Si está vacía, conserva el campo de escritura.

## [0.12.11] - 2026-11-05

### Corregido
- Los nuevos proyectos comienzan con la sinopsis vacía, conservando la indicación de qué escribir como texto de ayuda.
- El campo de sinopsis del Grimorio ya no se puede redimensionar manualmente.

## [0.12.10] - 2026-11-05

### Corregido
- Se elimina el rectángulo de fondo del contenedor de sinopsis del Grimorio en Pop y DarkPop, incluida la zona detrás de su etiqueta.

## [0.12.9] - 2026-11-05

### Corregido
- Los iconos de Buscar y Exportar quedan centrados dentro de sus botones móviles al eliminar la fila invisible que generaban sus etiquetas.

## [0.12.8] - 2026-11-05

### Corregido
- El campo de sinopsis del Grimorio mantiene el fondo transparente en todas las paletas para integrarse con el panel del proyecto.
- Se verificó el centrado de los controles de la barra móvil en la paleta DarkPop.

## [0.12.7] - 2026-11-05

### Corregido
- La barra superior móvil tiene más altura y centra los botones de navegación, búsqueda y exportación respecto de toda la barra.

## [0.12.6] - 2026-11-05

### Corregido
- Buscar y Exportar mantienen el mismo centro vertical, incluso al pasar el puntero, y sus iconos quedan centrados dentro de los botones en móviles.

## [0.12.5] - 2026-11-05

### Corregido
- La barra de formato móvil queda alineada dentro del papel y permanece visible al desplazarse verticalmente por el manuscrito.
- El contenedor móvil ya no bloquea el desplazamiento de página y los cuatro controles de la barra superior comparten dimensiones y alineación.

## [0.12.4] - 2026-11-05

### Corregido
- En móviles, la barra de formato se distribuye en varias filas y acompaña el desplazamiento vertical para mantener sus controles disponibles mientras se escribe.

## [0.12.3] - 2026-11-05

### Corregido
- La barra de formato móvil conserva una sola fila desplazable horizontalmente y el separador inferior ocupa todo el ancho del editor.

## [0.12.2] - 2026-11-05

### Corregido
- En móviles, los controles de formato se acomodan en varias filas para mostrar todas las opciones y no capturan el desplazamiento horizontal, permitiendo seguir desplazándose por el manuscrito.

## [0.12.1] - 2026-11-05

### Corregido
- Los botones móviles de Buscar y Exportar tienen el mismo tamaño que los controles de navegación y mantienen sus iconos centrados.
- La barra de formato se integra en la superficie del manuscrito y permanece accesible al desplazarse, también en móviles.

## [0.12.0] - 2026-11-05

### Corregido
- La barra superior coloca Buscar y Exportar junto al borde derecho en pantallas pequeñas; el botón de Exportar deja de desplazarse lateralmente en Pop y DarkPop.
- El panel lateral mantiene sus secciones en columna en móviles y muestra la meta diaria como un contador compacto; Preferencias cierra el panel al abrirse.
- Se oculta el ajuste de ancho del editor en móviles y la barra de formato permanece accesible al desplazarse.
- Se elimina la búsqueda redundante dentro del capítulo y se normaliza el fondo de la sinopsis en Pop y DarkPop.

## [0.11.1] - 2026-11-05

### Corregido
- La cursiva vuelve a representarse claramente y conserva el color del texto del manuscrito.
- Los botones de formato reflejan en tiempo real el estilo aplicado donde está el cursor o la selección.
- En Pop y DarkPop, la flecha y el nombre de cada sección comparten el hover de una sola fila; el botón «+» permanece independiente.

## [0.11.0] - 2026-11-05

### Añadido
- El panel del manuscrito ofrece consejos de escritura aleatorios y evita repetir el anterior en la siguiente carga.

### Corregido
- Los botones de Pop y DarkPop resaltan al pasar el puntero, con el acento y la sombra propios del tema.
- La cursiva conserva el color legible del texto en todos los temas.
- La sinopsis del Grimorio y el hover del Esquema usan superficies y colores legibles en el tema claro.
- Preferencias tiene un hover redondeado y centrado en los temas Claro y Oscuro; el consejo ya no incluye el acceso al cuaderno de mundo.

## [0.10.0] - 2026-11-05

### Añadido
- El editor ofrece títulos de tres niveles, subrayado, tachado y listas con viñetas o numeradas.

### Corregido
- Los botones de navegación, preferencias y meta diaria usan hover coherentes con cada tema; las secciones se pliegan también al pulsar su título.
- Se separan las subsecciones de Mundo en Pop y DarkPop y se elimina el panel de fondo redundante en Capítulo completo.
- Se quita el acceso duplicado a Preferencias de la barra superior y se alinea el control de meta diaria para evitar hover fuera de sus botones.

## [0.9.10] - 2026-11-05

### Cambiado
- El panel de progreso muestra el porcentaje y un único slider con pista animada; se quitan la barra duplicada y las etiquetas de extremos.
- El botón de progreso recibe colores legibles en el tema claro y texto/icono con contraste en Pop y DarkPop.
- El campo de búsqueda de capítulo tiene esquinas redondeadas y un borde tipo tecla en Pop/DarkPop.
- El manuscrito se amplía hasta alinearse con sus controles, respetando el ajuste de ancho del editor.
- Se unifica el grosor y la sombra de los controles del editor en DarkPop.

## [0.9.9] - 2026-11-05

### Cambiado
- Se aumenta la altura del buscador del capítulo y se mantienen centrados el icono y el campo.
- Se valida un manuscrito de 60 capítulos: el DOCX se abre y convierte en LibreOffice Writer, y el PDF de impresión se renderiza en Chromium.

## [0.9.8] - 2026-11-05

### Corregido
- Se mejora el contraste de los números de capítulo en DarkPop y el Esquema adopta el estilo de tarjetas del tema.
- El buscador del capítulo separa el icono del campo y los resaltados de búsqueda usan el acento de Pop/DarkPop.
- El arrastre permite mover escenas en ambas direcciones, incluida la primera sobre la segunda.

## [0.9.7] - 2026-11-05

### Añadido
- Las escenas se pueden reordenar arrastrando sus pestañas y renombrar con doble clic.
- Al crear una escena se solicita un nombre, con una sugerencia que se puede editar.

### Corregido
- Se separan las entradas del árbol lateral y los botones «+» dejan de tener un marco doble.
- Se quitan los fondos sobrantes de la vista del resumen y la descripción de escena; el campo de edición conserva su superficie.

## [0.9.6] - 2026-11-05

### Corregido
- El planificador y las pestañas de escenas ya no dibujan marcos dobles.
- El botón para eliminar una escena queda separado del campo de descripción.
- Preferencias alinea su icono y texto al centro vertical del botón del panel.
- El botón para añadir contenido en el árbol lateral deja más margen al borde del grupo.

## [0.9.5] - 2026-11-05

### Corregido
- Las tarjetas de capítulos usan una superficie uniforme, sin una franja interior de otro color.
- Los controles para reordenar/eliminar capítulos, añadir secciones y ajustar la meta diaria tienen más separación y un área de pulsación mayor.

## [0.9.4] - 2026-11-05

### Cambiado
- Pop y DarkPop comparten un estilo de tarjetas y controles con bordes, rellenos de paleta y sombras tipo tecla en la biblioteca, el Grimorio, el editor y las preferencias.
- Se mejora la legibilidad de títulos, etiquetas, capítulos, fichas del mundo, estados y campos de edición en ambos temas.
- Los botones de acento usan texto oscuro de alto contraste; Pop y DarkPop usan Manrope para la interfaz.

## [0.9.3] - 2026-11-05

### Cambiado
- El panel lateral mantiene la meta diaria y Preferencias tanto dentro del Grimorio como en “Mis historias”.
- La navegación del Grimorio se desplaza dentro de su propio panel para dejar visibles los controles inferiores.
- En el panel contraído quedan accesos compactos a la meta y a Preferencias.

## [0.9.2] - 2026-11-05

### Cambiado
- La vista “Capítulo completo” ya no muestra las descripciones de planificación de las escenas.
- En modo enfoque, Claro usa un fondo uniforme; Pop y DarkPop conservan su contraste con más margen y un borde sutil.

## [0.9.1] - 2026-11-05

### Cambiado
- “Capítulo completo” reúne el contenido de todas las escenas en un único editor continuo, con separadores de escena dentro del texto.
- Los cambios en esa vista se guardan en la escena correspondiente y siguen disponibles al volver a editar cada escena por separado.

## [0.9.0] - 2026-11-05

### Añadido
- Texto independiente por escena y vista “Capítulo completo” para revisar y editar todas las escenas en secuencia.
- Migración automática del manuscrito y las descripciones de escenas existentes, conservando ambos contenidos.

### Cambiado
- El resumen del capítulo aparece bajo su título y queda como texto discreto después de editarlo; se puede pulsar para volver a modificarlo.
- La descripción de cada escena pasa debajo del manuscrito, junto a los controles del capítulo.
- Al crear un capítulo se inicia directamente en “Escena 1”.

## [0.8.1] - 2026-11-05

### Cambiado
- El encabezado del manuscrito muestra y permite editar el título del capítulo activo.
- Se quita el selector de capítulos del editor; se puede cambiar desde el panel lateral o volver a la lista.
- La navegación de escenas recupera las pestañas compactas y sus controles adoptan los colores de cada tema.

## [0.8.0] - 2026-11-05

### Añadido
- Selector de capítulo y planificación de escenas editables dentro del manuscrito.
- Control para ajustar el progreso de cada capítulo y marcarlo como completado.
- Botón para volver a la vista anterior y salida clara del modo enfoque.

### Cambiado
- La sinopsis de la historia se edita en el inicio del proyecto; el resumen del capítulo queda junto al manuscrito.
- El título de la historia ya no muestra un campo permanente y el género deja de ocupar el encabezado del editor.
- El modo enfoque muestra solo el texto del capítulo y el control para salir.
- Exportación centrada en móviles y análisis de consistencia que omite palabras comunes al inicio de las frases.

## [0.7.0] - 2026-11-05

### Añadido
- Búsqueda dentro del proyecto abierto en títulos, manuscritos, sinopsis, escenas, personajes, lugares, notas y acontecimientos.
- Filtros por tipo de contenido, fragmentos con el término resaltado y navegación directa al capítulo o ficha encontrada.
- Interfaz de búsqueda traducida al español y al inglés, con cierre mediante Escape.

## [0.6.8] - 2026-11-05

### Cambiado
- Reemplazar la “L” que parecía un avatar por un botón de Preferencias con ícono y nombre accesible.
- Adaptar la navegación móvil a un panel lateral desplegable y ajustar el editor, la biblioteca, los diálogos y los controles para pantallas pequeñas.

### Verificado
- Registrar como completada la comprobación manual informada para la página publicada y el uso offline en varios navegadores y dispositivos.
- Aclarar que la validación RLS de una instancia Supabase sigue pendiente antes de ofrecer sincronización.

## [0.6.7] - 2026-11-05

### Añadido
- Recordatorio periódico en “Mis historias” para descargar una copia JSON y conservarla fuera del navegador.
- Accesos directos para exportar e importar copias desde el recordatorio, con opción de posponerlo una semana.
- Mensaje de confirmación tras descargar una copia que indica dónde conviene conservarla.

## [0.6.6] - 2026-11-05

### Añadido
- Configuración para usar la clave publishable de Supabase en desarrollo local y GitHub Pages, conservando compatibilidad con la variable anon anterior.
- Guía de correo OTP, URL autorizadas y variables de GitHub Actions para habilitar sincronización en el sitio publicado.

## [0.6.5] - 2026-11-05

### Corregido
- La tarjeta para crear una historia sigue la paleta del tema claro, Pop y DarkPop.
- El idioma inglés se aplica a los textos de navegación, la biblioteca, las vistas de proyecto y capítulos, y las preferencias que aparecían en español.

## [0.6.4] - 2026-11-04

### Añadido
- El idioma inicial sigue el idioma preferido del navegador (inglés o español); una preferencia guardada o seleccionada manualmente se conserva.
- Política de privacidad que informa del registro de direcciones IP cuando la app se aloja en GitHub Pages.
- README principal en inglés y guía equivalente en español.

## [0.6.3] - 2026-11-04

### Añadido
- Color de hipervínculos por tema: Pop y DarkPop mantienen el contraste de sus paletas; las paletas importadas aceptan `colors.link` y siguen usando `accentStrong` como valor de respaldo.
- Política de privacidad accesible desde Licencias y publicada como recurso de la app.
- Vista previa manual en GitHub Pages, compatible con rutas de repositorio, con iconos PWA de 192 y 512 px y caché sin conexión adaptada a subdirectorios.
- Cobertura de exportación de manuscritos grandes para DOCX y documento de impresión PDF.

### Seguridad y distribución
- Endurecimiento de privilegios/política RLS para que las filas de sincronización pertenezcan a una cuenta autenticada.
- El workflow de Pages corre pruebas antes de publicar; su ejecución requiere habilitar Pages y lanzarlo manualmente.

## [0.6.2] - 2026-11-04

### Añadido
- Aviso por capítulo del estado de guardado, copias automáticas cada cinco minutos de escritura activa y recuperación de un borrador si IndexedDB no alcanzó a guardar su última versión.

### Corregido
- En Pop y DarkPop, los estados hover del Grimorio y las tarjetas de selección de tema usan la paleta activa.
- Los iconos de Claro, Oscuro y Según el sistema quedan centrados verticalmente; al seleccionar una subopción de Mundo ya no se resalta también el grupo.

## [0.6.1] - 2026-11-04

### Corregido
- Volver a El Grimorio limpia el resaltado de capítulos y fichas; el menú Mundo mantiene marcado solo el nivel seleccionado.
- El diálogo de Preferencias queda centrado respecto de la ventana y adopta el tema claro cuando corresponde.
- Los botones secundarios y controles de meta diaria usan los colores de Pop y DarkPop en lugar de conservar superficies oscuras.
- Los nombres de los temas aparecen centrados y sus iconos alineados a la derecha.

## [0.6.0] - 2026-11-04

### Añadido
- Menú Mundo con submenús de personajes, lugares y línea de tiempo; Notas queda como acceso directo de El Grimorio.
- Preferencias centradas con fondo desenfocado, temas Pop y DarkPop, e importación de temas JSON con plantilla descargable.
- Avisos legales y de dependencias dentro de la app, documentación de seguridad y workflows para compilar y empaquetar releases.

### Cambiado
- Licencia del proyecto identificada como GNU GPL-3.0-only y publicada también junto con la app instalable.
- La caché de la PWA incorpora la licencia, los avisos de terceros y el ejemplo de tema.

## [0.5.0] - 2026-11-04

### Añadido
- Navegación por proyecto con “El Grimorio”: capítulos, personajes, lugares, notas y línea de tiempo en un árbol lateral plegable.
- La sección activa se despliega automáticamente; las secciones abiertas manualmente conservan su estado hasta que se contraen.
- Vista de capítulos para organizar, reordenar, crear, eliminar y abrir partes del manuscrito.
- Línea de tiempo con acontecimientos vinculables a capítulos y ordenados por fecha.

### Cambiado
- “Mis historias” vuelve a ser la pantalla inicial y el panel lateral muestra una indicación hasta abrir un proyecto.
- La biblioteca reúne las acciones para crear, abrir, renombrar, organizar y eliminar proyectos.

### Corregido
- El editor verifica que la instancia Tiptap siga activa antes de sincronizar contenido, evitando operar sobre un esquema ya destruido.

## [0.4.0] - 2026-11-04

### Añadido
- Flujo por proyectos: biblioteca, inicio de proyecto, manuscrito y cuaderno de mundo pertenecen a un libro seleccionado.
- Inicio de proyecto con sinopsis, métricas, capítulos, escenas y accesos a sus materiales de referencia.
- Persistencia del proyecto, capítulo y sección abiertos; pantalla de carga durante la lectura inicial de IndexedDB.
- Pantalla de recuperación con detalle visible cuando una vista de React falla.
- Controles propios para subir y bajar la meta diaria en pasos de 100 palabras.

### Cambiado
- Abrir una historia ahora entra al espacio de ese proyecto; desde ahí se abre el manuscrito o sus recursos.
- La biblioteca continúa siendo el selector de libros y el menú lateral muestra la estructura del proyecto activo.

## [0.3.0] - 2026-11-04

### Añadido
- Preferencias para idioma español/inglés, meta diaria, temas claro/oscuro/sistema y lectura.
- Editor enriquecido, fichas de personajes/lugares/notas, escenas, historial por capítulo y revisión de consistencia.
- Plantillas para novela, relato, guion y cuaderno de mundo; reordenación de historias y capítulos.
- Copias completas JSON con importación, sanitización y migración del contenido creado en la versión anterior.
- Exportación EPUB 3, DOCX, PDF por impresión y Markdown.
- PWA instalable con caché offline y sincronización opcional manual vía Supabase, OTP y RLS.

### Cambiado
- El editor y los exportadores pesados se cargan bajo demanda para reducir el paquete inicial.
- La hoja de ruta identifica funciones locales entregadas y las siguientes mejoras.

## [0.2.0] - 2026-11-04

### Añadido
- Logo SVG original de luna y pluma, integrado en la navegación.
- Hoja de ruta priorizada para la evolución del producto.
- Contrato de repositorio para versionado, changelog, validación y commits publicados en GitHub.

### Cambiado
- Nombre visible de la marca a “Tsukikage”.
