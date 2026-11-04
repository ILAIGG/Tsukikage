# Tsukikage

Un taller personal para escribir novelas e historias. La interfaz está en español y guarda el manuscrito localmente en el navegador.

## Empezar

Requiere Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite. Para generar la versión de producción: `npm run build`.

## Arquitectura elegida

- **React + TypeScript + Vite**: aplicación web de cliente con interfaz rica, tipado y arranque sencillo. Para una herramienta de escritura privada no hace falta un servidor SSR.
- **IndexedDB**: almacenamiento local asíncrono adecuado para manuscritos extensos y varios proyectos. En esta primera versión, los datos permanecen en el navegador y perfil donde se escribieron.
- **Markdown para exportación**: formato portable que conserva títulos y capítulos y puede abrirse en otros editores.
- **Editor de texto plano**: prioriza escritura sin distracciones y evita acoplar el contenido a un formato propietario. Tiptap/ProseMirror sería una buena evolución si se necesitan estilos enriquecidos, comentarios o notas en línea.

## Alcance actual

Crear historias y capítulos, editar títulos y texto, contador de palabras, meta diaria, esquema navegable y exportación Markdown. El ejemplo inicial es demostrativo y se puede editar o borrar.

## Próximas evoluciones sugeridas

1. Importar/exportar el proyecto completo como JSON y hacer copias de seguridad.
2. Exportar a EPUB/DOCX/PDF con configuración de página y portadas.
3. Añadir fichas de personajes, lugares, cronología y notas vinculadas.
4. Si se desea usar en varios dispositivos, incorporar cuenta y sincronización; para eso convendría añadir API y PostgreSQL (por ejemplo, Supabase), con copias de seguridad y control de acceso.
