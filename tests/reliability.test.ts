import 'fake-indexeddb/auto';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import JSZip from 'jszip';
import { Window } from 'happy-dom';

const browser = new Window({ url: 'http://localhost/' });
Object.defineProperty(globalThis, 'window', { configurable: true, value: browser });
Object.defineProperty(globalThis, 'document', { configurable: true, value: browser.document });
Object.defineProperty(globalThis, 'Node', { configurable: true, value: browser.Node });

const { parseWorkspaceBackup, serializeWorkspaceBackup } = await import('../src/backup');
const { defaultSettings } = await import('../src/model');
type Novel = import('../src/model').Novel;
type Workspace = import('../src/model').Workspace;
const { clearPendingRecovery, loadPendingRecovery, loadWorkspace, savePendingRecovery, saveWorkspace } = await import('../src/storage');
const { exportEpub } = await import('../src/export');

function makeLargeWorkspace(): Workspace {
  const text = `<p>${'Lía cruzó la ciudad bajo la luna y anotó cada detalle. '.repeat(170)}</p>`;
  const novels: Novel[] = Array.from({ length: 3 }, (_, project) => ({
    id: `project-${project}`,
    title: `Proyecto ${project + 1}`,
    genre: 'Fantasía',
    updated: 'Ahora',
    chapters: Array.from({ length: 60 }, (_, chapter) => ({
      id: `chapter-${project}-${chapter}`,
      title: `Capítulo ${chapter + 1}`,
      text,
    })),
  }));
  return { novels, settings: defaultSettings };
}

test('backup JSON round-trips a multi-project workspace with long manuscripts', () => {
  const workspace = makeLargeWorkspace();
  const backup = serializeWorkspaceBackup(workspace, '2026-11-04T00:00:00.000Z');
  const restored = parseWorkspaceBackup(backup);
  assert.equal(restored.novels.length, 3);
  assert.equal(restored.novels[2].chapters.length, 60);
  assert.equal(restored.novels[2].chapters[59].text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(), workspace.novels[2].chapters[59].text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  assert.equal(restored.settings.theme, workspace.settings.theme);
});

test('IndexedDB saves large workspaces and offers a newer unsaved chapter for recovery', async () => {
  const workspace = makeLargeWorkspace();
  await saveWorkspace(workspace);
  const loaded = await loadWorkspace();
  assert.equal(loaded.novels[0].chapters.length, 60);
  const chapter = { ...loaded.novels[0].chapters[0], text: '<p>Recovered draft</p>' };
  const recovery = { id: 'project-0:chapter-0-0', novelId: 'project-0', chapterId: 'chapter-0-0', chapter, createdAt: Date.now() };
  await savePendingRecovery(recovery);
  assert.equal((await loadPendingRecovery(loaded.novels))?.chapter.text, chapter.text);
  loaded.novels[0].chapters[0] = chapter;
  await saveWorkspace(loaded);
  assert.equal(await loadPendingRecovery(loaded.novels), undefined);
  await clearPendingRecovery(recovery.id);
});

test('EPUB export contains all chapters from a large project', async () => {
  let exported: Blob | undefined;
  const createElement = browser.document.createElement.bind(browser.document);
  browser.document.createElement = ((tagName: string, options?: ElementCreationOptions) => {
    const element = createElement(tagName, options);
    if (tagName.toLowerCase() === 'a') element.click = () => {};
    return element;
  }) as typeof browser.document.createElement;
  URL.createObjectURL = ((blob: Blob) => { exported = blob; return 'blob:tsukikage-test'; }) as typeof URL.createObjectURL;
  URL.revokeObjectURL = (() => {}) as typeof URL.revokeObjectURL;
  const novel = makeLargeWorkspace().novels[0];
  await exportEpub(novel);
  assert.ok(exported);
  const zip = await JSZip.loadAsync(exported!);
  assert.equal(Object.keys(zip.files).filter(name => /chapter-\d+\.xhtml$/.test(name)).length, novel.chapters.length);
  assert.match(await zip.file('OEBPS/chapter-60.xhtml')!.async('text'), /Capítulo 60/);
});
