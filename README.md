<p align="center"><img src="public/tsukikage-mark.svg" width="96" height="96" alt="Tsukikage" /></p>
<h1 align="center">Tsukikage</h1>
<p align="center">A studio for your stories</p>
<p align="center"><strong>Beta · Local first · PWA · Español / English · GPL-3.0-only</strong></p>

[Abrir / Open](https://ilaigg.github.io/Tsukikage/) · [English](README.md) · [Español](README.es.md) · [Roadmap](ROADMAP.md) · [Changelog](CHANGELOG.md)

## Beta status

Tsukikage is a browser writing app that works without an account. Projects are saved on this device; export JSON backups regularly. Clearing site data, private browsing or switching browsers can make projects unavailable. Tsukikage does not encrypt local data or backup files.

**Moving from GitHub Pages to Vercel or a custom domain does not transfer projects:** export a backup on the old site and import it on the new one. Each origin has separate storage. Choose a stable domain for launch.

## Features

| Space | Features |
| --- | --- |
| Library | Multiple projects, drag ordering and genre tags. |
| Grimoire | Editable synopsis and story outline. |
| Writing | Chapters and scenes, rich text, focus, progress, word count and daily goal. |
| Characters | Full page, portrait, identity, free text and optional guided interview, relationships and quick summary. |
| Places | Full page, hierarchy, image, contextual questions, filters and duplication. |
| Connections | Link characters and places to chapters, scenes and each other. |
| Reference | Notes, project search and suggestions for unfinished content. |
| Backups | Import/export the entire workspace as JSON; chapter history and pending draft recovery. |
| Export | Markdown, EPUB, DOCX and PDF through browser printing. |
| Preferences | English/Spanish, text size, Light, Dark, System, Pop, DarkPop and JSON palettes. |

Guided questions are optional. Review suggestions are heuristic and do not guarantee narrative consistency. History is currently per chapter, not a complete project history. Collaboration and automatic sync are not available.

## Development and build

Use Node.js 22.12 or later in the 22 release line, and npm.

```bash
npm ci
npm run dev
```

```bash
npm test
npm run build
npm run preview
```

Vite writes `dist/`. The Service Worker registers only in production. Do not publish the development server. Preferences reads its version from `package.json` at build time.

## Deploy on Vercel

1. Import this repository. Select Vite, Node.js 22, `npm run build` and output directory `dist`.
2. Deploy at `/`: leave `VITE_BASE_PATH` unset. Add no cloud credentials for this local beta.
3. Deploy a preview and complete the checks below before announcing it.
4. `vercel.json` sets security headers, blocks framing and remote application connections, and revalidates HTML and the Service Worker.

The CSP allows Google Fonts and inline styles needed by themes, but blocks inline scripts. Do not enable Supabase with this policy: cloud sync remains deferred. Verify response headers on the actual deployment; local preview reproduces the general security headers but does not validate Vercel caching and routing rules. [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json).

GitHub Pages remains available through the manual preview workflow, which calculates the repository base path. Vercel headers do not apply to Pages.

## Installation and offline checks

Open the production app over HTTPS (or localhost), wait for the Service Worker to install, then use **Preferences → Install Tsukikage**. The native prompt depends on browser support; the button offers menu instructions when unavailable. On iPhone/iPad use Share → Add to Home Screen.

The build precaches the interface, including the editor and export modules. External fonts can fall back to local fonts offline. Updates wait until tabs using the previous version close, avoiding mixed build assets.

To verify: load online, check Application → Service Workers, close and reopen, enable Network → Offline and reload. Create/edit a project, open the editor for the first time offline, reload and verify persistence. Reconnect and test an update without clearing storage.

## Before the public announcement

- Create, edit, reorder and delete projects, chapters, scenes, characters and places; check deletion confirmations.
- Export/import JSON and check text, portraits and relationships. Inspect EPUB/DOCX/PDF in their readers.
- Check keyboard use, dialog focus/closing, mobile and all four themes. A formal screen-reader audit remains pending.
- Verify installation/offline/updates, browser console and response headers on the final domain.
- Confirm secrets and cloud services are absent, and publish support details and the privacy policy applicable to your instance.

Browser checks require Chromium (`CHROMIUM_BIN` can select the executable):

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

They use temporary profiles and do not modify real projects. Local checks do not replace validation of the deployed site.

## Security, privacy and cloud

React/TypeScript, IndexedDB and Tiptap power the client. DOMPurify sanitizes HTML before display/export, removing active content and embedded external resources. There are no analytics or ads. Google Fonts and the hosting provider receive browsing requests; see [Privacy](PRIVACY.md) and [Security](SECURITY.md).

The existing Supabase integration is experimental and deferred for production. MongoDB Atlas and alternatives will be evaluated when sync is designed. This beta requires no environment variables. Never place secrets in `VITE_*` variables: they are bundled into the client. Do not commit `.env.local`, private keys or a service-role key.

## Contributing and license

Report bugs in [Issues](https://github.com/ILAIGG/Tsukikage/issues) with the version, browser, theme and reproduction steps; use sample projects and avoid publishing manuscripts or private data. See [SECURITY.md](SECURITY.md) for vulnerabilities.

License: **GPL-3.0-only**. See [LICENSE](LICENSE), [notices](THIRD_PARTY_NOTICES.md) and [dependency licenses](THIRD_PARTY_LICENSES.md). `private: true` prevents npm publishing and does not prevent hosting. [Sample theme](public/theme-example.json).
