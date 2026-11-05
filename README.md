<p align="center">
  <img src="public/tsukikage-mark.svg" width="112" height="112" alt="Tsukikage" />
</p>
<h1 align="center">Tsukikage</h1>
<p align="center">A writing studio for planning stories, shaping worlds, and bringing your manuscript to life. Your projects stay in your browser.</p>
<p align="center"><strong>Offline ready · English & Spanish · GPL-3.0-only</strong></p>

[Open the app](https://ilaigg.github.io/Tsukikage/) · [Español](README.es.md) · [Roadmap](ROADMAP.md) · [Changelog](CHANGELOG.md)

---

## Your writing space

| Space | What you can do |
| --- | --- |
| Manuscript | Write rich text, organize chapters and scenes, and enter focus mode. |
| Grimoire | Keep the story synopsis and browse the project outline. |
| World | Create characters with their own page, first name, surname, role, and rich-text description. |
| Notes | Collect ideas and project reference material. |
| Backups & exports | Save JSON backups and export Markdown, EPUB, DOCX, or PDF through printing. |
| Appearance | Choose Light, Dark, Pop, DarkPop, or import a JSON palette. |

> Projects are stored in this browser. Export a JSON backup to keep another copy outside it. Supabase work is deferred in the roadmap; local writing needs no account.

## Get started

Requires Node.js 20.19+ or 22.12+.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. Create a production build with `npm run build`; the static site is written to `dist/`. Run `npm test` for the large-workspace backup, local recovery, and export checks.

## Architecture

- **React, TypeScript, and Vite** power the client-side interface; server-side rendering is unnecessary for this private writing tool.
- **IndexedDB** stores manuscripts asynchronously in the browser. Data stays local until you explicitly upload it.
- **Tiptap/ProseMirror** provides rich-text editing; imported and exported content is sanitized.
- **Markdown, EPUB 3, DOCX, and print-ready HTML** cover common writing and publishing workflows. Save the print view as PDF through your browser.
- **PWA support** allows installation and offline access. Changes made offline remain in IndexedDB.
- **Optional Supabase sync** uses email one-time codes, one JSON workspace per account, and row-level security. Upload and restore actions are manual.
- **Themes** include Light, Dark, System, Pop, DarkPop, and local JSON theme import.

## What it includes

Create multiple book projects. Each project keeps its synopsis, manuscript, chapters, scenes, World (currently characters; other sections are being redesigned), notes, revision history, and exports together. The library selects projects; the project sidebar opens each section.

The app also includes a rich-text editor, manual revision history, word counter and daily goal, Spanish and English interface, templates, JSON backups, and Markdown/EPUB/DOCX/PDF exports. A demo story is provided and can be edited or deleted. [Download a sample theme](public/theme-example.json).

## License and distribution

Tsukikage is distributed under **GNU GPL v3 only** (`GPL-3.0-only`). See [`LICENSE`](LICENSE), [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md), and [`THIRD_PARTY_LICENSES.md`](THIRD_PARTY_LICENSES.md). Dependencies retain their own licenses.

Build the static site with `npm ci && npm run build`. GitHub Actions runs CI on changes and packages a `dist/` ZIP when you publish a `v*` tag matching the package version. For a GitHub Pages preview, set **Settings → Pages → Build and deployment → GitHub Actions**, then manually run **Actions → Preview on GitHub Pages**. The workflow tests and builds before publishing and does not run on every push. HTTPS is required for installable PWA behavior.

The privacy policy is in [`PRIVACY.md`](PRIVACY.md). Adapt its contact and service details before operating your own hosted instance. Never commit `.env.local` or private keys. A Supabase anon/publishable key is designed to be public, but only use it with reviewed RLS policies; never expose a service-role key. The app is `private: true` to prevent accidental npm publishing; this does not prevent hosting the source on GitHub.

## Optional Supabase sync

Status: deferred. This section documents the existing setup; production validation remains pending.

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in its SQL Editor.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (or the legacy anon key).
3. Restart `npm run dev` and open **Export → Sync**.
4. Sign in with the code sent to your email. Choose when to upload or restore a backup.

For the GitHub Pages site, add repository Actions variables named `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` under **Settings → Secrets and variables → Actions → Variables**, then run the Pages workflow again. Both values are public client configuration; never use a secret/service-role key here. In Supabase, enable email sign-in, set the Site URL to `https://ilaigg.github.io/Tsukikage/`, allow that URL and `http://localhost:5173/**`, and set the **Magic Link** email template to include `{{ .Token }}` because Tsukikage asks for a six-digit code.

Cloud content is associated with your Supabase account and protected by RLS; it is not end-to-end encrypted. Restoring downloads a local JSON backup first. Automatic sync and conflict resolution are not implemented.

## Roadmap

See [`ROADMAP.md`](ROADMAP.md) for completed work and planned improvements.

### Recovery in a real browser

Run `npm run test:browser` with Chromium installed (`CHROMIUM_BIN` can point to another executable). The check starts Vite and Chromium on local ports 5188 and 9228 with an isolated temporary profile. It verifies draft recovery after a browser restart, then checks that the restored text survives another restart. The temporary profile is removed afterward.
