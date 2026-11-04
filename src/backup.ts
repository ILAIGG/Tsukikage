import { defaultSettings, type Novel, type Workspace } from './model';
import { migrateNovel } from './storage';

export function serializeWorkspaceBackup(workspace: Workspace, exportedAt = new Date().toISOString()): string {
  return JSON.stringify({ format: 'tsukikage-backup', version: 1, exportedAt, ...workspace }, null, 2);
}

export function parseWorkspaceBackup(serialized: string): Workspace {
  const data = JSON.parse(serialized) as Partial<Workspace> & { format?: string; novels?: unknown; settings?: unknown };
  if (data.format !== 'tsukikage-backup' || !Array.isArray(data.novels) || !data.settings || typeof data.settings !== 'object') {
    throw new Error('Invalid Tsukikage backup');
  }
  const novels = (data.novels as Novel[])
    .filter(novel => novel && typeof novel.id === 'string' && typeof novel.title === 'string' && Array.isArray(novel.chapters))
    .map(migrateNovel);
  return { novels, settings: { ...defaultSettings, ...(data.settings as Partial<Workspace['settings']>) } };
}
