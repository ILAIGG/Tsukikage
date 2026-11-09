<p align="center"><img src="public/tsukikage-mark.svg" width="96" height="96" alt="Tsukikage" /></p>
<h1 align="center">Tsukikage</h1>
<p align="center">A studio for writing stories and shaping their worlds.</p>
<p align="center"><strong>Beta · No account required · Installable · English & Spanish</strong></p>

[Open Tsukikage](https://ilaigg.github.io/Tsukikage/) · [Español](README.es.md) · [Roadmap](ROADMAP.md) · [Changelog](CHANGELOG.md)

Tsukikage brings manuscript writing and story planning into one workspace. It helps writers organize chapters and scenes, develop characters and places, and keep reference notes alongside their writing.

## Features

| Space | Features |
| --- | --- |
| Library | Multiple projects, customizable editorial covers, drag ordering and genre tags. |
| Grimoire | Editable synopsis and story outline. |
| Writing | Chapters and scenes, rich text, focus, progress, word count, daily goal and project/session goals. |
| Characters | Full page, portrait, identity, free text and optional guided interview, relationships and quick summary. |
| Places | Full page, hierarchy, image, contextual questions, filters and duplication. |
| Connections | Link characters and places to chapters, scenes and each other. |
| Reference | Notes, project search and suggestions for unfinished content. |
| Backups | Import/export the whole workspace as JSON; chapter and full project versions, and pending draft recovery. |
| Export | Markdown, EPUB, DOCX and browser-printed PDF with cover and per-project publication settings. |
| Preferences | English/Spanish, manuscript typeface and line spacing, text size, Light, Dark, System, Pop, DarkPop and JSON palettes. |

## Storage and backups

Projects are saved in the device’s browser without an account. An independent copy of the entire workspace can be downloaded through **Export → Full JSON backup** and restored with **Import backup**.

Clearing browser data can delete projects. Each browser, device and website address has separate storage; JSON backups allow stories to be moved between them. Tsukikage does not encrypt local data or backup files.

Full project versions and templates also stay local and are included in JSON backups. Templates are independent copies: deleting the original project does not delete them.

## Installation and offline use

**Settings → Install Tsukikage** installs the app when supported by the browser. When direct installation is unavailable, the app provides instructions. On iPhone and iPad, use **Share → Add to Home Screen**.

After the first load and completion of the application file installation, the app can be used offline. Updates may require closing open tabs and reopening the app.

## Project status

Tsukikage is in beta. Guided interviews are optional and content review provides suggestions. History includes up to ten full project versions as well as chapter revisions. Personal templates can be saved from a project and selected when creating a story. Cross-device sync and collaboration are not yet part of the public beta.

The app contains no ads or analytics. Google Fonts supplies its typefaces. See [Privacy](PRIVACY.md) and [Security](SECURITY.md) for details.

## Development and contributions

The app uses React, TypeScript, Vite, Tiptap and IndexedDB. Local development requires Node.js 22.12 or later in the 22 release line, and npm:

```bash
npm ci
npm run dev
```

```bash
npm test         # Automated tests
npm run build    # Build into dist/
npm run preview  # Production preview
```

Browser checks listed in `package.json` require Chromium; `CHROMIUM_BIN` can specify its location. They use separate temporary profiles.

Bugs and suggestions can be reported in [Issues](https://github.com/ILAIGG/Tsukikage/issues), including the version, browser and reproduction steps. Examples should exclude private manuscripts or personal data. Vulnerabilities should be reported through the channel in [SECURITY.md](SECURITY.md).

## License

Distributed under **GPL-3.0-only**. See [LICENSE](LICENSE), [third-party notices](THIRD_PARTY_NOTICES.md) and [dependency licenses](THIRD_PARTY_LICENSES.md).

[Download a sample theme](public/theme-example.json).
