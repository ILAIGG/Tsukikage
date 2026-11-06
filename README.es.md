<p align="center">
  <img src="public/tsukikage-mark.svg" width="112" height="112" alt="Tsukikage" />
</p>
<h1 align="center">Tsukikage</h1>
<p align="center">Un taller de historias para planificar, escribir y dar forma a tus mundos. Tus proyectos se guardan en el navegador.</p>
<p align="center"><strong>Sin conexión · Español e inglés · GPL-3.0-only</strong></p>

[Abrir la aplicación](https://ilaigg.github.io/Tsukikage/) · [English](README.md) · [Hoja de ruta](ROADMAP.md) · [Cambios](CHANGELOG.md)

---

## Tu espacio de escritura

| Espacio | Qué puedes hacer |
| --- | --- |
| Manuscrito | Escribe con formato, organiza capítulos y escenas y usa el modo concentración. |
| Grimorio | Guarda la sinopsis y consulta la estructura del proyecto. |
| Mundo | Crea personajes con página propia, nombre, apellido, tipo y descripciones Libre o Guiada mediante entrevista. |
| Lugares | Describe y duplica lugares, recorre su jerarquía completa, filtra por nombre/tipo/ubicación y vincúlalos con personajes, capítulos y escenas. |
| Notas | Conserva ideas y material de referencia del proyecto. |
| Copias y exportación | Guarda copias JSON y exporta Markdown, EPUB, DOCX o PDF mediante impresión. |
| Apariencia | Elige Claro, Oscuro, Pop, DarkPop o importa una paleta JSON. |

> Los proyectos se guardan en este navegador. Exporta una copia JSON para conservarlos también fuera de él. Supabase está aplazado en el roadmap; la escritura local funciona sin cuenta.

## Empezar

Requiere Node.js 20.19+ o 22.12+.

```bash
npm ci
npm run dev
```

Abre la URL que muestra Vite. Genera una compilación de producción con `npm run build`; el sitio estático queda en `dist/`. Ejecuta `npm test` para revisar copias, recuperación local y exportaciones con proyectos grandes.

## Arquitectura

- **React, TypeScript y Vite** ofrecen una interfaz cliente; el renderizado en servidor no hace falta para esta herramienta de escritura personal.
- **IndexedDB** guarda manuscritos de forma asíncrona en el navegador. Los datos quedan allí hasta que ordenes subirlos explícitamente.
- **Tiptap/ProseMirror** proporciona edición de texto enriquecido; el contenido importado y exportado se sanitiza.
- **Markdown, EPUB 3, DOCX y HTML preparado para imprimir** cubren flujos comunes de escritura y publicación. Puedes guardar la vista de impresión como PDF desde el navegador.
- **La PWA** permite instalar la app y usarla sin conexión. Los cambios offline permanecen en IndexedDB.
- **La sincronización opcional con Supabase** utiliza códigos de acceso por correo, un espacio JSON por cuenta y seguridad a nivel de fila. Las acciones de subir y restaurar son manuales.
- **Temas** Claro, Oscuro, Según el sistema, Pop, DarkPop e importación local de temas JSON.

## Funciones

Crea varios proyectos de libro. Cada uno reúne sinopsis, manuscrito, capítulos, escenas, Mundo (actualmente personajes; los demás apartados están en reestructuración), notas, historial y exportaciones. La biblioteca permite elegir un proyecto y el panel lateral abre cada una de sus secciones.

También incluye editor enriquecido, historial manual, contador y meta diaria de palabras, interfaz en español e inglés, plantillas, copias JSON y exportaciones Markdown/EPUB/DOCX/PDF. Incluye una historia de ejemplo que puedes editar o borrar. [Descarga un tema de ejemplo](public/theme-example.json).

## Licencia y distribución

Tsukikage se distribuye bajo **GNU GPL v3 solamente** (`GPL-3.0-only`). Consulta [`LICENSE`](LICENSE), [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) y [`THIRD_PARTY_LICENSES.md`](THIRD_PARTY_LICENSES.md). Cada dependencia conserva su licencia.

Compila el sitio estático con `npm ci && npm run build`. GitHub Actions ejecuta CI ante cambios y empaqueta un ZIP de `dist/` al publicar una etiqueta `v*` que coincida con la versión del paquete. Para una vista previa en GitHub Pages, configura **Settings → Pages → Build and deployment → GitHub Actions** y ejecuta manualmente **Actions → Preview on GitHub Pages**. El workflow prueba y compila antes de publicar; no se activa con cada push. La PWA requiere HTTPS para instalarse.

La política de privacidad está en [`PRIVACY.md`](PRIVACY.md). Adapta el contacto y los servicios antes de operar una instancia propia. No subas `.env.local` ni claves privadas. La clave anon/publishable de Supabase está diseñada para ser pública, pero úsala solo con políticas RLS revisadas; nunca expongas una clave service-role. `private: true` evita publicar Tsukikage accidentalmente en npm, pero no impide que el código esté público en GitHub.

## Sincronización opcional con Supabase

Estado: aplazada. Esta sección documenta la configuración existente; la validación de producción sigue pendiente.

1. Crea un proyecto Supabase y ejecuta [`supabase/schema.sql`](supabase/schema.sql) en su SQL Editor.
2. Copia `.env.example` a `.env.local` y configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` (o la clave anon legacy).
3. Reinicia `npm run dev` y abre **Exportar → Sincronización**.
4. Inicia sesión con el código enviado a tu correo. Luego elige cuándo subir o restaurar una copia.

Para conectar el sitio de GitHub Pages, añade variables de Actions al repositorio llamadas `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` en **Settings → Secrets and variables → Actions → Variables** y vuelve a ejecutar el workflow de Pages. Ambos valores son configuración pública del cliente; nunca pongas aquí una clave secreta/service-role. En Supabase, habilita el acceso por correo, configura Site URL como `https://ilaigg.github.io/Tsukikage/`, permite esa URL y `http://localhost:5173/**`, y asegúrate de que la plantilla de correo **Magic Link** incluya `{{ .Token }}`: Tsukikage solicita un código de seis dígitos.

El contenido en la nube queda asociado a tu cuenta Supabase y protegido por RLS; no tiene cifrado de extremo a extremo. Al restaurar, se descarga primero una copia JSON local. Todavía no hay sincronización automática ni resolución de conflictos.

## Hoja de ruta

Consulta [`ROADMAP.md`](ROADMAP.md) para ver el trabajo entregado y las mejoras previstas.

### Recuperación en un navegador real

Ejecuta `npm run test:browser` con Chromium instalado (`CHROMIUM_BIN` permite indicar otro ejecutable). La prueba usa los puertos locales 5188 y 9228 y un perfil temporal independiente. Comprueba la recuperación tras reiniciar el navegador y que el texto restaurado persista después de otra apertura. Al terminar elimina el perfil temporal.

### Revisión visual de Pop / DarkPop

Ejecuta `npm run test:themes` con Chromium instalado para generar capturas de escritorio y móvil en ambas paletas. El comando indica el directorio temporal de las imágenes. Consulta [el sistema visual compartido y la cobertura](docs/POP_THEMES.md).
