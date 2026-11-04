# Hoja de ruta de Tsukikage

## Entregado en 0.6.0

- [x] Agrupar personajes, lugares y línea de tiempo bajo Mundo; dejar Notas como entrada directa de El Grimorio.
- [x] Convertir Preferencias en un diálogo centrado con fondo oscurecido y desenfocado.
- [x] Añadir Pop y DarkPop e importar paletas JSON propias.
- [x] Preparar licencia GPL-3.0-only, atribuciones, aviso de licencias dentro de la app, compilación CI y empaquetado de releases.

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

- [ ] **P0 · Confianza del manuscrito:** autosave con indicador por capítulo, recuperación tras cierre inesperado, snapshots automáticos y exportación/importación probadas con proyectos grandes.
- [ ] **P0 · Distribución pública:** probar instalación y actualización PWA en Chrome/Firefox/Safari, desplegar preview, añadir política de privacidad y revisar reglas/RLS de cualquier instancia Supabase pública.
- [ ] **P1 · Organización del mundo:** vínculos cruzados entre personajes, lugares, acontecimientos y capítulos; filtros y navegación desde una ficha relacionada.
- [ ] **P1 · Escritura y estructura:** escenas reordenables, arrastrar capítulos, metas por proyecto y objetivos de sesión.
- [ ] **P1 · Exportación editorial:** validar EPUB/DOCX/PDF en lectores reales y añadir portadas, metadatos, saltos de capítulo, tipografía y formato de imprenta.
- [ ] **P2 · Buscar en todo el proyecto:** búsqueda con resaltado y filtros por capítulo, ficha, nota y acontecimiento.
- [ ] **P2 · Sincronización segura:** resolución visual de conflictos, historial remoto y sincronización entre dispositivos; conservar confirmación explícita antes de sobrescribir contenido.
- [ ] **P2 · Accesibilidad y calidad:** pruebas de teclado/lector de pantalla, contraste, móvil y escenarios de migración y recuperación.

La cuenta y la base remota son opcionales: hace falta crear un proyecto Supabase y configurarlo siguiendo `README.md`. No se transmiten manuscritos automáticamente.
