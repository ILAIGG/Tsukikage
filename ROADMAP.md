# Hoja de ruta de Tsukikage

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

- [ ] **P0 · Confianza del manuscrito:** comprobar recuperación tras un cierre real del navegador y validar visualmente los archivos DOCX/PDF extensos en aplicaciones lectoras; la prueba PDF actual comprueba el documento de impresión generado, no el cuadro de impresión del navegador.
- [ ] **P0 · Sincronización segura antes de habilitarla:** aplicar el esquema y probar las políticas RLS en la instancia Supabase de producción; la revisión actual es estática.
- [ ] **P1 · Organización del mundo:** vínculos cruzados entre personajes, lugares, acontecimientos y capítulos; filtros y navegación desde una ficha relacionada.
- [ ] **P1 · Escritura y estructura:** escenas reordenables, arrastrar capítulos, metas por proyecto y objetivos de sesión.
- [ ] **P1 · Exportación editorial:** validar EPUB/DOCX/PDF en lectores reales y añadir portadas, metadatos, saltos de capítulo, tipografía y formato de imprenta.
- [ ] **P2 · Buscar en todo el proyecto:** búsqueda con resaltado y filtros por capítulo, ficha, nota y acontecimiento.
- [ ] **P2 · Sincronización segura:** resolución visual de conflictos, historial remoto y sincronización entre dispositivos; conservar confirmación explícita antes de sobrescribir contenido.
- [ ] **P2 · Accesibilidad y calidad:** pruebas de teclado/lector de pantalla, contraste, móvil y escenarios de migración y recuperación.

La cuenta y la base remota son opcionales: hace falta crear un proyecto Supabase y configurarlo siguiendo `README.md`. No se transmiten manuscritos automáticamente.
