# Changelog

Los cambios notables de Tsukikage se registran aquí.

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
