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
  const projectHistory:NonNullable<Workspace['projectHistory']>=Object.create(null);
  for(const [id,snapshots] of Object.entries(data.projectHistory||{})){if(!Array.isArray(snapshots))throw new Error('Invalid project history');projectHistory[id]=snapshots.map(snapshot=>{if(!snapshot||typeof snapshot.id!=='string'||typeof snapshot.label!=='string'||typeof snapshot.at!=='string'||!snapshot.novel||typeof snapshot.novel.title!=='string'||snapshot.novel.id!==id||!Array.isArray(snapshot.novel.chapters))throw new Error('Invalid project snapshot');return {...snapshot,novel:migrateNovel(snapshot.novel)}})}
  const storyTemplates=data.storyTemplates||[];if(!Array.isArray(storyTemplates))throw new Error('Invalid templates');
  const normalizedTemplates=storyTemplates.map(template=>{if(!template||typeof template.id!=='string'||typeof template.name!=='string'||!template.project||typeof template.project.id!=='string'||typeof template.project.title!=='string'||!Array.isArray(template.project.chapters))throw new Error('Invalid template');return {...template,project:migrateNovel(template.project)}});
  return { novels,projectHistory,storyTemplates:normalizedTemplates, settings: { ...defaultSettings, ...(data.settings as Partial<Workspace['settings']>) } };
}

/** A portable project includes its complete history; global preferences/templates stay in full backups. */
export function serializeProjectBackup(workspace:Workspace,projectId:string):string{
 const novel=workspace.novels.find(n=>n.id===projectId);if(!novel)throw new Error('Project not found');
 return serializeWorkspaceBackup({novels:[novel],settings:defaultSettings,projectHistory:{[projectId]:workspace.projectHistory?.[projectId]||[]}});
}
export function mergeProjectBackup(workspace:Workspace,imported:Workspace):Workspace{
 if(imported.novels.length!==1)throw new Error('Choose a single-project backup');
 const novel=imported.novels[0];
 return {...workspace,novels:workspace.novels.some(n=>n.id===novel.id)?workspace.novels.map(n=>n.id===novel.id?novel:n):[...workspace.novels,novel],projectHistory:{...workspace.projectHistory,[novel.id]:imported.projectHistory?.[novel.id]||[]}};
}
