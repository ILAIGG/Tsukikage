<p align="center"><img src="public/tsukikage-mark.svg" width="96" height="96" alt="Tsukikage" /></p>
<h1 align="center">Tsukikage</h1>
<p align="center">Un taller para tus historias</p>
<p align="center"><strong>Beta · Local first · PWA · Español / English · GPL-3.0-only</strong></p>

[Abrir / Open](https://ilaigg.github.io/Tsukikage/) · [English](README.md) · [Español](README.es.md) · [Roadmap](ROADMAP.md) · [Changelog](CHANGELOG.md)

## Estado de la beta

Tsukikage es una aplicación de escritura que funciona en el navegador, sin cuenta. La beta guarda tus historias en este dispositivo; exporta copias JSON regularmente. Borrar los datos del sitio, usar navegación privada o cambiar de navegador puede hacer que pierdas acceso a ellas. Las copias y los datos locales no están cifrados por Tsukikage.

**Cambiar de GitHub Pages a Vercel o a un dominio propio no transfiere tus proyectos:** exporta una copia en el sitio antiguo e impórtala en el nuevo. Cada dirección tiene su propio almacenamiento. Conserva un dominio estable para el lanzamiento.

## Funciones

| Espacio | Funciones |
| --- | --- |
| Biblioteca | Varios proyectos, orden por arrastre y géneros como etiquetas. |
| Grimorio | Sinopsis editable y estructura de la historia. |
| Escritura | Capítulos y escenas, formato enriquecido, enfoque, progreso, contador y meta diaria. |
| Personajes | Página completa, imagen, identidad, descripción libre y entrevista opcional, relaciones y vista rápida. |
| Lugares | Página completa, jerarquía, imagen, preguntas según el tipo, filtros y duplicación. |
| Conexiones | Personajes y lugares vinculados con capítulos, escenas y entre sí. |
| Referencia | Notas, búsqueda global y revisión orientativa de contenido pendiente. |
| Copias | Importar/exportar el espacio completo en JSON y recuperar borradores e historial de capítulos. |
| Exportación | Markdown, EPUB, DOCX y PDF mediante impresión del navegador. |
| Preferencias | Español/inglés, tamaño de texto, Claro, Oscuro, Sistema, Pop, DarkPop y paletas JSON. |

Las preguntas guiadas son opcionales. La revisión es heurística; no garantiza continuidad narrativa. El historial actual es por capítulo, no un historial completo del proyecto. No hay colaboración ni sincronización automática.

## Desarrollo y compilación

Usa Node.js 22.12 o posterior de la rama 22, y npm.

```bash
npm ci
npm run dev
```

```bash
npm test
npm run build
npm run preview
```

Vite genera `dist/`. El Service Worker solo se registra en producción. No publiques el servidor de desarrollo. La versión de Preferencias se toma de `package.json` durante la compilación.

## Publicar en Vercel

1. Importa este repositorio y selecciona Vite, Node.js 22, `npm run build` y salida `dist`.
2. Usa la raíz `/`: deja `VITE_BASE_PATH` sin definir. No añadas credenciales para esta beta local.
3. Publica una vista previa y comprueba los pasos de validación de abajo antes de anunciarla.
4. `vercel.json` configura cabeceras de seguridad, bloquea marcos y conexiones remotas de la aplicación y revalida el Service Worker y el HTML.

El CSP permite Google Fonts y estilos en línea necesarios para los temas; no permite scripts en línea. No actives Supabase con esta política: la beta mantiene la nube aplazada. Las cabeceras deben confirmarse en la URL real, porque la vista previa local reproduce las cabeceras generales de seguridad, pero no valida las reglas de caché y rutas de Vercel. [Configuración de Vercel](https://vercel.com/docs/project-configuration/vercel-json).

GitHub Pages sigue disponible mediante el workflow manual de vista previa; este calcula la ruta base del repositorio. Las cabeceras de Vercel no se aplican a Pages.

## Instalar y probar sin conexión

Abre la versión de producción por HTTPS (o localhost), espera a que termine de instalarse el Service Worker y usa **Preferencias → Instalar Tsukikage**. El diálogo nativo depende del navegador; si no está disponible, el botón explica cómo instalar desde su menú. En iPhone/iPad usa Compartir → Añadir a la pantalla de inicio.

La compilación precarga los archivos de la interfaz, incluido el editor y los módulos de exportación. Las fuentes externas pueden usar alternativas locales sin conexión. Las actualizaciones esperan al cierre de las pestañas de la versión anterior para no mezclar archivos de dos compilaciones.

Para validar: abre una vez con conexión, comprueba Application → Service Workers, cierra y vuelve a abrir, activa Network → Offline y recarga. Crea/edita un proyecto, abre el editor por primera vez sin red, recarga y verifica que el texto persista. Vuelve a conexión y prueba una actualización sin borrar el almacenamiento.

## Validación antes del anuncio público

- Crear, editar, reordenar y borrar proyectos, capítulos, escenas, personajes y lugares, con confirmaciones de borrado.
- Exportar una copia JSON e importarla; comprobar textos, imágenes y relaciones. Revisar EPUB/DOCX/PDF en sus lectores.
- Probar teclado, foco y cierre de diálogos, móvil y los cuatro temas. Una auditoría formal con lector de pantalla sigue pendiente.
- Revisar instalación/offline/actualización y cabeceras en el dominio final; comprobar la consola del navegador.
- Confirmar que no hay secretos ni servicios de nube activados y publicar el canal de soporte y la política aplicable a la instancia.

Pruebas disponibles con Chromium instalado (`CHROMIUM_BIN` permite elegir ejecutable):

```bash
npm run test:browser
npm run test:themes
npm run test:places
npm run test:world-links
npm run test:character-relationships
npm run test:world-deletion
node tests/genre-tags-browser.mjs
npm run test:beta
npm run test:security
```

Usan perfiles temporales y no modifican tus proyectos reales. Las comprobaciones locales no sustituyen la validación del despliegue final.

## Seguridad, privacidad y nube

La interfaz usa React/TypeScript, IndexedDB y Tiptap. El HTML se sanitiza con DOMPurify antes de mostrarse o exportarse; se eliminan contenido activo y recursos incrustados externos. No hay analíticas ni anuncios. Google Fonts y el proveedor de alojamiento reciben solicitudes de navegación; consulta [Privacidad](PRIVACY.md) y [Seguridad](SECURITY.md).

Supabase es una integración experimental existente, aplazada para producción. MongoDB Atlas y otras alternativas se evaluarán cuando se diseñe la sincronización. La beta no requiere variables de entorno. Nunca incluyas secretos en variables `VITE_*`: se incorporan al cliente. No subas `.env.local`, claves privadas ni una clave service-role.

## Contribuir y licencia

Reporta errores en [Issues](https://github.com/ILAIGG/Tsukikage/issues) indicando versión, navegador, tema y pasos; usa proyectos de ejemplo y evita publicar manuscritos o datos privados. Consulta [SECURITY.md](SECURITY.md) para vulnerabilidades.

Licencia **GPL-3.0-only**: [LICENSE](LICENSE), [avisos](THIRD_PARTY_NOTICES.md) y [licencias de dependencias](THIRD_PARTY_LICENSES.md). `private: true` evita publicar el paquete en npm; permite alojar la aplicación. [Tema de ejemplo](public/theme-example.json).
