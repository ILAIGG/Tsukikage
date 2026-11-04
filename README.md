# Tsukikage

Un taller personal para planificar y escribir novelas. La app es local-first: guarda el trabajo en el navegador y permite activar una copia sincronizada de forma explícita con tu proyecto Supabase.

## Empezar

Requiere Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite. Para generar la versión de producción: `npm run build`.

## Arquitectura elegida

- **React + TypeScript + Vite**: aplicación web de cliente con interfaz rica, tipado y arranque sencillo. Para una herramienta de escritura privada no hace falta un servidor SSR.
- **IndexedDB**: almacenamiento local asíncrono, apropiado para manuscritos extensos. Los datos se quedan en el navegador hasta que el usuario activa y ordena una subida a la nube.
- **Tiptap/ProseMirror**: texto estructurado en HTML con negrita, cursiva y encabezados; el contenido se sanitiza al importar y al exportar.
- **Exportadores**: Markdown y DOCX; EPUB 3 empaquetado según W3C; PDF preparado con la impresión del navegador.
- **PWA**: se puede instalar y mantiene una caché de la aplicación para abrirla sin conexión. Los cambios hechos sin conexión se guardan en IndexedDB.
- **Supabase opcional**: autenticación por código de correo, una fila JSONB por cuenta y políticas RLS. La subida y restauración son manuales; descargar desde la nube crea primero una copia local.

## Alcance actual

Crear y ordenar historias/capítulos, editor enriquecido, notas de mundo, escenas, historial manual, contador y meta diaria, temas claro/oscuro/sistema, español/inglés, plantillas, copias JSON y exportaciones Markdown/EPUB/DOCX/PDF. El ejemplo inicial es demostrativo y se puede editar o borrar.

## Activar sincronización opcional

1. Crea un proyecto Supabase y ejecuta [`supabase/schema.sql`](supabase/schema.sql) en su SQL Editor.
2. Copia `.env.example` a `.env.local` y completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (clave pública anon/publishable, nunca una service-role key).
3. Reinicia `npm run dev` y abre **Exportar → Sincronización**.
4. Inicia sesión con un código enviado a tu correo. Luego elige cuándo subir o restaurar una copia.

El contenido de la nube queda asociado a tu cuenta Supabase y protegido por RLS; no tiene cifrado de extremo a extremo. Al restaurar, Tsukikage descarga antes una copia JSON local. Para evitar que un dispositivo sobrescriba otro en silencio, todavía no hay sincronización automática ni resolución de conflictos.

## Próximos pasos

Consulta [`ROADMAP.md`](ROADMAP.md) para cronología, historial automático, búsquedas con resaltado y sincronización con resolución de conflictos.
