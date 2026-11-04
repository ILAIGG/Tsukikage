# Hoja de ruta de Tsukikage

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

## Pendiente para siguientes iteraciones

- [ ] Validar EPUB/DOCX/PDF en más lectores y ajustar portadas, metadatos, tipografía y formato de imprenta.
- [ ] Añadir cronología con fechas y referencias entre eventos, personajes y lugares.
- [ ] Historial automático y recuperación de versiones tras cierres inesperados.
- [ ] Búsqueda global con resaltado y filtros por ficha, capítulo y etiqueta.
- [ ] Resolución visual de conflictos y sincronización automática entre dispositivos; hoy la nube se actualiza con acciones manuales para evitar sobrescrituras inesperadas.
- [ ] Pruebas de importación, exportación, migración y flujos de accesibilidad.

La cuenta y la base remota son opcionales: hace falta crear un proyecto Supabase y configurarlo siguiendo `README.md`. No se transmiten manuscritos automáticamente.
