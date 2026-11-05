# Changelog

Los cambios notables de Tsukikage se registran aquí.

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
