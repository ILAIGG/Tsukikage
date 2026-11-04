# Changelog

Los cambios notables de Tsukikage se registran aquí.

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
