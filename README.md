# Tsukikage

Un taller personal para planificar y escribir novelas. La app es local-first: guarda el trabajo en el navegador y permite activar una copia sincronizada de forma explícita con tu proyecto Supabase.

## Empezar

Requiere Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite. Para generar la versión de producción: `npm run build`.
Ejecuta `npm test` para comprobar copias JSON, guardado/recuperación local y EPUB con proyectos extensos.

## Arquitectura elegida

- **React + TypeScript + Vite**: aplicación web de cliente con interfaz rica, tipado y arranque sencillo. Para una herramienta de escritura privada no hace falta un servidor SSR.
- **IndexedDB**: almacenamiento local asíncrono, apropiado para manuscritos extensos. Los datos se quedan en el navegador hasta que el usuario activa y ordena una subida a la nube.
- **Tiptap/ProseMirror**: texto estructurado en HTML con negrita, cursiva y encabezados; el contenido se sanitiza al importar y al exportar.
- **Exportadores**: Markdown y DOCX; EPUB 3 empaquetado según W3C; PDF preparado con la impresión del navegador.
- **PWA**: se puede instalar y mantiene una caché de la aplicación para abrirla sin conexión. Los cambios hechos sin conexión se guardan en IndexedDB.
- **Supabase opcional**: autenticación por código de correo, una fila JSONB por cuenta y políticas RLS. La subida y restauración son manuales; descargar desde la nube crea primero una copia local.
- **Temas**: claro, oscuro, sistema, Pop, DarkPop e importación local de paletas JSON.

## Alcance actual

Crear varios proyectos de libro. Cada proyecto mantiene juntos su sinopsis, manuscrito, capítulos, escenas, Mundo (personajes, lugares y línea del tiempo), notas, historial y exportaciones. La biblioteca es el selector de libros; al abrir uno, su inicio y menú lateral permiten entrar en cada parte del mismo proyecto. Las notas son un acceso directo del Grimorio; personajes, lugares y acontecimientos están agrupados en Mundo.

También incluye editor enriquecido, historial manual, contador y meta diaria, temas claro/oscuro/sistema/Pop/DarkPop, importación de paletas JSON, español/inglés, plantillas, copias JSON y exportaciones Markdown/EPUB/DOCX/PDF. El ejemplo inicial es demostrativo y se puede editar o borrar. Descarga [un tema de ejemplo](public/theme-example.json) para ver el formato aceptado.

## Licencia y distribución

Tsukikage se distribuye bajo **GNU GPL v3 solamente** (`GPL-3.0-only`). La licencia completa está en [`LICENSE`](LICENSE), los avisos de dependencias en [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) y la app muestra esos avisos en **Preferencias → Licencias**. Las dependencias conservan sus licencias; la etiqueta GPL del proyecto no las reemplaza.

Para generar una versión web, ejecuta `npm ci && npm run build`; el sitio estático queda en `dist/`. El workflow de GitHub Actions compila en cada cambio y crea un ZIP de `dist/` al publicar un tag `v*`. Publica el código fuente junto al ZIP y mantén ambos disponibles desde el mismo lugar. No incluyas `.env.local` ni claves privadas; la clave anon de Supabase solo debe usarse con RLS y límites de acceso revisados. Antes de habilitar sincronización para usuarios, publica una política de privacidad y define retención, borrado y contacto de soporte.

La app no se publica como paquete npm: `private: true` evita publicar por accidente una aplicación que no es una biblioteca. Para alojar el sitio, configura un hosting estático con fallback de rutas a `index.html`, HTTPS y las variables públicas de Supabase solo si ofreces sincronización.

## Activar sincronización opcional

1. Crea un proyecto Supabase y ejecuta [`supabase/schema.sql`](supabase/schema.sql) en su SQL Editor.
2. Copia `.env.example` a `.env.local` y completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (clave pública anon/publishable, nunca una service-role key).
3. Reinicia `npm run dev` y abre **Exportar → Sincronización**.
4. Inicia sesión con un código enviado a tu correo. Luego elige cuándo subir o restaurar una copia.

El contenido de la nube queda asociado a tu cuenta Supabase y protegido por RLS; no tiene cifrado de extremo a extremo. Al restaurar, Tsukikage descarga antes una copia JSON local. Para evitar que un dispositivo sobrescriba otro en silencio, todavía no hay sincronización automática ni resolución de conflictos.

## Próximos pasos

Consulta [`ROADMAP.md`](ROADMAP.md) para el plan priorizado de las siguientes versiones.
