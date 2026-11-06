<p align="center"><img src="public/tsukikage-mark.svg" width="96" height="96" alt="Tsukikage" /></p>
<h1 align="center">Tsukikage</h1>
<p align="center">Un taller para escribir historias y dar forma a sus mundos.</p>
<p align="center"><strong>Beta · Sin cuenta · Instalable · Español e inglés</strong></p>

[Abrir Tsukikage](https://ilaigg.github.io/Tsukikage/) · [English](README.md) · [Hoja de ruta](ROADMAP.md) · [Historial de cambios](CHANGELOG.md)

Tsukikage reúne la escritura del manuscrito y la planificación de una historia en un mismo espacio. Permite organizar capítulos y escenas, desarrollar personajes y lugares, y conservar notas de referencia mientras se escribe.

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

## Guardado y copias de seguridad

Los proyectos se guardan en el navegador del dispositivo, sin necesidad de crear una cuenta. Para conservar una copia independiente, se puede descargar el espacio completo desde **Exportar → Copia completa JSON** y restaurarlo con **Importar copia**.

Borrar los datos del navegador puede eliminar los proyectos. Cada navegador, dispositivo y dirección web mantiene su propio almacenamiento; las copias JSON permiten trasladar las historias entre ellos. Los datos locales y las copias no están cifrados por Tsukikage.

## Instalación y uso sin conexión

**Preferencias → Instalar Tsukikage** permite instalar la aplicación cuando el navegador lo admite. Si la instalación directa no está disponible, se muestran las instrucciones correspondientes. En iPhone y iPad se utiliza **Compartir → Añadir a la pantalla de inicio**.

Después de la primera carga y de completar la instalación de los archivos, la aplicación puede utilizarse sin conexión. Al actualizar, puede ser necesario cerrar las pestañas abiertas y volver a abrirla.

## Estado del proyecto

Tsukikage está en beta. Las entrevistas son opcionales y la revisión de contenido ofrece sugerencias orientativas. El historial corresponde a capítulos individuales. La sincronización entre dispositivos y la colaboración todavía no forman parte de la beta pública.

No incluye anuncios ni analíticas. Utiliza Google Fonts para las tipografías. Más información en [Privacidad](PRIVACY.md) y [Seguridad](SECURITY.md).

## Desarrollo y contribuciones

La aplicación utiliza React, TypeScript, Vite, Tiptap e IndexedDB. Para ejecutarla localmente se necesita Node.js 22.12 o posterior de la rama 22 y npm:

```bash
npm ci
npm run dev
```

```bash
npm test         # Pruebas automáticas
npm run build    # Compilación en dist/
npm run preview  # Vista previa de producción
```

Las pruebas de navegador disponibles en `package.json` requieren Chromium; `CHROMIUM_BIN` permite indicar su ubicación. Utilizan perfiles temporales independientes.

Los errores y propuestas se pueden comunicar en [Issues](https://github.com/ILAIGG/Tsukikage/issues), indicando versión, navegador y pasos para reproducirlos. Se recomienda utilizar ejemplos sin manuscritos ni datos privados. Las vulnerabilidades deben comunicarse mediante el canal indicado en [SECURITY.md](SECURITY.md).

## Licencia

Distribuido bajo **GPL-3.0-only**. Consulta [LICENSE](LICENSE), los [avisos de terceros](THIRD_PARTY_NOTICES.md) y las [licencias de dependencias](THIRD_PARTY_LICENSES.md).

[Descargar un tema de ejemplo](public/theme-example.json).
