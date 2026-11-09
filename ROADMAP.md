# Hoja de ruta de Tsukikage

## Entregado en 0.36.0

- [x] Versiones completas del proyecto, restauración con punto de retorno y copia JSON previa, hasta diez versiones manuales por proyecto.
- [x] Plantillas personales a partir de proyectos; creación con identificadores nuevos y conservación de vínculos. Gestión y copias JSON incluidas.
- [x] Exportación editorial: autoría, subtítulo, idioma, portada, tipografía, papel, saltos de capítulo y formato enriquecido.
- [x] EPUB de 60 capítulos comprobado en EPUB.js y EPUBCheck 5.4.0 sin errores ni advertencias. DOCX abierto por LibreOffice Writer y PDF comprobado con Chromium y Poppler.
- [x] Prueba real de Firefox: creación, metadatos editoriales, versiones completas, recarga y foco/Escape de Preferencias.
- [x] Gestión de foco ampliada a los diálogos antiguos y nombres accesibles en navegación contraída, editor y avisos.

## Validaciones externas que siguen abiertas

- [ ] Auditoría formal con lector de pantalla, pruebas manuales en Safari/iOS y revisión independiente de seguridad.
- [ ] Instalación y actualización de esta versión en el dominio público final. La inspección de Vercel requiere autorización de acceso al equipo; los recursos públicos de GitHub Pages responden, pero corresponden a otra compilación.
- [ ] Sincronización, cuentas remotas y resolución de conflictos: siguen expresamente aplazadas.

Las comprobaciones automáticas y locales no sustituyen las revisiones externas anteriores.

## Entregado en 0.35.0

- [x] Arrastrar capítulos sin perder el capítulo activo; conservar flechas accesibles.
- [x] Metas opcionales por proyecto y sesiones de escritura persistentes.

La beta abierta local no depende de añadir más funciones. Antes del anuncio queda confirmar instalación, actualización PWA y cabeceras en el dominio público final, y realizar la pasada manual en Safari/iOS. La auditoría formal con lector de pantalla sigue pendiente. La nube continúa aplazada.

## Revisión 0.30.0

- [x] Búsqueda de contenido de capítulos, escenas, descripciones y respuestas guiadas; incluir apodos y nombres del personaje.
- [x] Conexiones navegables entre personajes, lugares y apariciones en capítulos/escenas.
- [x] Revisión orientativa de capítulos vacíos y descripciones pendientes.
- [x] Acceso a búsqueda con Ctrl/Cmd + Mayús + F y cierre de preferencias con Escape.
- [x] Copias JSON, importación, historial de capítulos y recuperación de borradores locales.
- [x] Gestión de foco de los diálogos.
- [ ] Auditoría formal con lector de pantalla.
- [x] Historial restaurable de proyectos completos, además del historial por capítulo.

La sincronización y la elección de proveedor remoto siguen aplazadas. Evaluar MongoDB Atlas y Supabase cuando se diseñen autenticación, permisos, conflictos y alojamiento del servidor.

## Entregado en 0.9.8

- [x] Mejorar el contraste de la numeración y dar estilo de tema a las tarjetas del Esquema.
- [x] Separar el icono del buscador del capítulo y adaptar el resaltado global a cada paleta.
- [x] Corregir el reordenamiento de escenas para que funcione en ambas direcciones.

## Entregado en 0.9.7

- [x] Reordenar escenas con arrastrar y soltar, conservar la escena activa y guardar el orden.
- [x] Pedir nombre al crear una escena y permitir cambiarlo con doble clic.
- [x] Separar visualmente el árbol lateral y quitar los paneles de fondo innecesarios en resumen y descripción.

## Entregado en 0.9.6

- [x] Quitar bordes duplicados del planificador y espaciar las pestañas de escenas.
- [x] Separar el control para eliminar escena del campo de descripción.
- [x] Centrar verticalmente el acceso a Preferencias y dar margen al botón de añadir del árbol lateral.

## Entregado en 0.9.5

- [x] Unificar el fondo de las tarjetas de capítulos y separar visualmente sus acciones.
- [x] Dar más espacio y tamaño a los controles de capítulos, secciones del panel y meta diaria.

## Entregado en 0.9.4

- [x] Unificar tarjetas, botones, campos y navegación de Pop/DarkPop con contorno, relleno de paleta y sombra tipo tecla.
- [x] Mejorar el contraste de textos secundarios, capítulos, fichas del mundo, diálogos y botones de acento.
- [x] Aplicar Manrope a la interfaz Pop/DarkPop y conservar la tipografía serif del manuscrito.

## Entregado en 0.9.3

- [x] Mantener la meta diaria y Preferencias en todas las vistas, también en “Mis historias”.
- [x] Separar el desplazamiento de la navegación del Grimorio del área fija inferior del panel.

## Entregado en 0.9.2

- [x] Ocultar las descripciones de escena en la vista unificada del capítulo.
- [x] Ajustar el fondo del modo enfoque en Claro y los márgenes, bordes y sombra de Pop/DarkPop.

## Entregado en 0.9.1

- [x] Unificar todas las escenas en un solo editor continuo para la vista “Capítulo completo”, conservando su contenido independiente.

## Entregado en 0.9.0

- [x] Guardar el manuscrito por escena y mostrar todas las escenas en “Capítulo completo”.
- [x] Mantener y migrar el texto existente y las descripciones de escenas.
- [x] Mover el resumen bajo el título del capítulo y plegarlo tras editarlo.
- [x] Colocar la descripción de escena debajo del área de escritura.

## Entregado en 0.8.1

- [x] Mostrar el título del capítulo en la cabecera del manuscrito.
- [x] Quitar la navegación de capítulos del editor y restaurar pestañas compactas para escenas.
- [x] Corregir los colores de controles de escenas en Claro, Pop y DarkPop.

## Entregado en 0.8.0

- [x] Añadir navegación para volver desde cada vista.
- [x] Separar sinopsis de historia y resumen de capítulo.
- [x] Editar escenas opcionales desde el manuscrito y elegir capítulo con un selector.
- [x] Guardar el progreso individual de cada capítulo.
- [x] Simplificar el encabezado y el modo enfoque, y centrar Exportar en móvil.
- [x] Reducir falsos positivos de palabras comunes en la revisión de consistencia.


## Entregado en 0.6.0

- [x] Agrupar personajes, lugares y línea de tiempo bajo Mundo; dejar Notas como entrada directa de El Grimorio.
- [x] Convertir Preferencias en un diálogo centrado con fondo oscurecido y desenfocado.
- [x] Añadir Pop y DarkPop e importar paletas JSON propias.
- [x] Preparar licencia GPL-3.0-only, atribuciones, aviso de licencias dentro de la app, compilación CI y empaquetado de releases.

## Entregado en 0.6.2

- [x] Mostrar el guardado del capítulo activo, conservar copias automáticas cada cinco minutos de escritura activa y ofrecer recuperar borradores pendientes.
- [x] Verificar copias JSON, persistencia IndexedDB, recuperación de borrador y EPUB con una biblioteca de tres proyectos y 180 capítulos extensos.
- [x] Corregir los estados hover y selección de Mundo en Pop/DarkPop y centrar los iconos del selector de temas.

## Entregado en 0.6.3

- [x] Dar un color de hipervínculo legible a cada tema; Pop y DarkPop usan tonos de su propia paleta y los temas importados pueden definir `colors.link`.
- [x] Ampliar la prueba de manuscritos grandes a JSON, recuperación IndexedDB, EPUB, DOCX y HTML listo para imprimir como PDF (60 capítulos).
- [x] Añadir política de privacidad y enlazarla desde Licencias; revisar las políticas Supabase con RLS y acceso limitado al propietario.
- [x] Preparar el workflow manual de vista previa GitHub Pages, rutas para subdirectorios y manifiesto PWA con iconos PNG de 192 y 512 px.

## Entregado en 0.6.5

- [x] Ajustar la tarjeta de creación de historia a los temas claro, Pop y DarkPop.
- [x] Completar traducciones de los flujos de biblioteca, proyecto, capítulos y panel de navegación al inglés.

## Entregado en 0.6.6

- [x] Preparar la configuración de Supabase con clave publishable para desarrollo local y GitHub Pages, manteniendo compatibilidad con la clave anon legacy.

## Entregado en 0.6.7

- [x] Avisar periódicamente que el guardado local depende de los datos del navegador y facilitar exportar/importar copias JSON desde Mis historias.
- [x] Posponer el aviso durante una semana; volver a mostrarlo al pasar un mes sin exportar una copia.

## Entregado en 0.6.8

- [x] Sustituir el avatar fijo con “L” por un acceso identificable a Preferencias.
- [x] Hacer que el panel lateral se abra como menú en móvil y ajustar las vistas principales a pantallas estrechas.
- [x] Completar la revisión manual de la página publicada y el modo offline en navegadores/dispositivos, según comprobación del usuario.

## Entregado en 0.7.0

- [x] Buscar en todo el proyecto activo: capítulos y sus escenas/sinopsis, fichas del mundo y acontecimientos.
- [x] Filtrar por tipo, resaltar coincidencias en los fragmentos y abrir la ubicación del resultado.

## Entregado en 0.3.0

- [x] Copia completa e importación JSON de historias y preferencias.
- [x] Guardado automático en IndexedDB, migración de texto de la primera versión y confirmaciones al borrar.
- [x] Editar títulos/géneros; crear, borrar y reordenar historias y capítulos.
- [x] Preferencias de español/inglés, meta diaria, tema claro/oscuro/sistema, tamaño de texto y ancho del editor.
- [x] Editor enriquecido con negrita, cursiva, encabezados, búsqueda en capítulo y modo enfoque.
- [x] Cuaderno de personajes, lugares y notas enlazadas a capítulos; sinopsis y planificación de escenas.
- [x] Historial manual por capítulo con restauración, contador y meta diaria.
- [x] Exportación EPUB 3, DOCX, PDF mediante imprimir y Markdown.
- [x] Plantillas de novela, relato, guion y cuaderno de mundo.
- [x] Revisión heurística de nombres sin ficha y títulos de capítulo duplicados.
- [x] Instalación como PWA y caché de recursos para uso sin conexión.
- [x] Sincronización opcional por cuenta Supabase con controles explícitos de subida/restauración y políticas RLS.
- [x] Navegación centrada en un proyecto: biblioteca → inicio del libro → manuscrito/cuaderno, con capítulos del libro activos en la barra lateral.
- [x] Recordar el proyecto, capítulo y sección que estaban abiertos; no mostrar la historia de ejemplo mientras IndexedDB aún carga.
- [x] Controles con estilo propio para ajustar la meta diaria.

## Plan priorizado para las siguientes iteraciones

- [x] **P0 · Exportaciones en lectores:** validar un DOCX de 60 capítulos en LibreOffice Writer y la impresión PDF de 60 capítulos en Chromium; ambos conservan el título del último capítulo y se pueden abrir/renderizar.
- [x] **P0 · Recuperación del manuscrito:** verificada en Chromium real con un perfil persistente temporal: manuscrito guardado, borrador pendiente tras reiniciar, recuperación desde el diálogo y persistencia tras un segundo reinicio. Repetible con `npm run test:browser`.
- [ ] **Aplazado · Sincronización Supabase:** pospuesto hasta una etapa posterior; no bloquea el trabajo local del producto.
- [x] **P1 · Organización del mundo (personajes y lugares):** Personajes ya tiene página propia, descripciones libre/guiada, resumen, imagen, guardado automático y relaciones navegables. La navegación jerárquica permite regresar a las secciones del proyecto. Lugares ya tiene página propia, imagen, guardado automático, descripciones libre/guiada adaptadas al tipo y jerarquía navegable con protección contra ciclos. Entregados vínculos con capítulos y escenas, apariciones de personajes y lugares, relaciones personaje-lugar, filtros, jerarquía completa y duplicación de lugares.
- [x] **P1 · Escritura y estructura:** escenas reordenables, arrastre de capítulos con alternativa por teclado, metas de palabras por proyecto y objetivos de sesión persistentes con progreso neto.
- [x] **P1 · Exportación editorial:** EPUB/DOCX/PDF validados en lectores y herramientas reales, portadas, metadatos, saltos de capítulo, tipografía y formato de impresión.
- [ ] **P2 · Sincronización segura:** resolución visual de conflictos, historial remoto y sincronización entre dispositivos; conservar confirmación explícita antes de sobrescribir contenido.
- [x] **P2 · Calidad verificable localmente:** teclado, nombres accesibles, móvil, temas, migración, recuperación y Firefox.
- [ ] **P2 · Accesibilidad externa:** auditoría formal con lector de pantalla y Safari/iOS.

La cuenta y la base remota serán opcionales. La integración experimental de Supabase existente no determina el proveedor definitivo; no se transmiten manuscritos automáticamente.

## Ideas a futuro
- [x] Sistema de plantillas personales para distintos proyectos.
- [ ] Validar la beta en Vercel con PWA/offline y lectores de pantalla antes de anunciarla como estable.

## Preparación de beta 0.31.4
- [x] README bilingüe actualizado, cabeceras para Vercel, revisión de contenido enriquecido y precarga offline por compilación.
- [ ] Confirmar cabeceras, instalación y actualización PWA en el dominio público final.
- [x] Validación funcional real en Firefox.
- [ ] Auditoría formal con lector de pantalla y validación manual en Safari/iOS.
- [ ] Revisión independiente de seguridad antes de habilitar cuentas o nube.
