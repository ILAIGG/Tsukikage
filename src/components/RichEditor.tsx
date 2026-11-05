import { useEffect, useMemo } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { Extension, Mark, mergeAttributes, Node as TiptapNode } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Redo2, Strikethrough, Underline as UnderlineIcon, Undo2 } from 'lucide-react';
import type { Chapter } from '../model';
import { htmlToText, sanitizeHtml, wordCount } from '../export';

function searchDecorations(doc:Parameters<typeof DecorationSet.create>[0],term:string){if(!term.trim())return DecorationSet.empty;const regex=new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');const decorations:Decoration[]=[];doc.descendants((node,pos)=>{if(!node.isText||!node.text)return;regex.lastIndex=0;let match:RegExpExecArray|null;while((match=regex.exec(node.text))!==null){decorations.push(Decoration.inline(pos+match.index,pos+match.index+match[0].length,{class:'search-highlight'}));if(!match[0].length)regex.lastIndex++;}});return DecorationSet.create(doc,decorations);}

const SceneBreak = TiptapNode.create({name:'sceneBreak',group:'block',atom:true,selectable:true,addAttributes(){return {sceneId:{default:null,parseHTML:element=>element.getAttribute('data-scene-id'),renderHTML:attributes=>attributes.sceneId?{'data-scene-id':attributes.sceneId}:{}},sceneTitle:{default:null,parseHTML:element=>element.getAttribute('data-scene-title'),renderHTML:attributes=>attributes.sceneTitle?{'data-scene-title':attributes.sceneTitle}:{}}};},parseHTML(){return [{tag:'div[data-tsukikage-scene-break]'}];},renderHTML({HTMLAttributes}){const title=HTMLAttributes['data-scene-title']||'Scene';return ['div',mergeAttributes(HTMLAttributes,{'data-tsukikage-scene-break':'true','contenteditable':'false','class':'scene-break-marker'}),['span',{},title]];}});
const Underline = Mark.create({name:'underline',parseHTML(){return [{tag:'u'},{style:'text-decoration=underline'}];},renderHTML({HTMLAttributes}){return ['u',mergeAttributes(HTMLAttributes),0];}});

export default function RichEditor({ chapter, onChange, focus, fontSize, language, searchTerm, placeholderText, withSceneBreaks=false, syncContent=true }: { chapter: Chapter; onChange: (html: string) => void; focus: boolean; fontSize:number; language: 'es'|'en'; searchTerm?:string; placeholderText?:string; withSceneBreaks?:boolean; syncContent?:boolean }) {
 const placeholder = placeholderText || (language === 'es' ? 'Deja que la historia empiece…' : 'Let the story begin…');
 const extensions = useMemo(() => [StarterKit,Underline,...(withSceneBreaks?[SceneBreak]:[]),Placeholder.configure({ placeholder }),Extension.create({name:'searchHighlight',addProseMirrorPlugins(){const term=searchTerm||'';const key=new PluginKey('searchHighlight');return [new Plugin({key,state:{init:(_,state)=>searchDecorations(state.doc,term),apply:(transaction,current)=>transaction.docChanged?searchDecorations(transaction.doc,term):current.map(transaction.mapping,transaction.doc)},props:{decorations(state){return key.getState(state)}}})]}})], [placeholder,searchTerm,withSceneBreaks]);
 const editor = useEditor({ extensions, content: sanitizeHtml(chapter.text || ''), onUpdate: ({ editor }) => { if (!editor.isDestroyed) onChange(editor.getHTML()); }, editorProps: { attributes: { class: 'tiptap-writing', spellcheck: 'true' } } });
 useEffect(() => { if (!syncContent||!editor || editor.isDestroyed || !editor.schema) return; const content = sanitizeHtml(chapter.text || '') || '<p></p>'; if (editor.getHTML() !== content) editor.commands.setContent(content, { emitUpdate: false }); }, [editor, chapter.id, chapter.text,syncContent]);
 return <><div className="format-toolbar">
  <button title={language==='es'?'Negrita':'Bold'} className={editor&&!editor.isDestroyed&&editor.isActive('bold')?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleBold().run()}><Bold size={15}/></button>
  <button title={language==='es'?'Cursiva':'Italic'} className={editor&&!editor.isDestroyed&&editor.isActive('italic')?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleItalic().run()}><Italic size={15}/></button>
  <button title={language==='es'?'Subrayado':'Underline'} className={editor&&!editor.isDestroyed&&editor.isActive('underline')?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleMark('underline').run()}><UnderlineIcon size={15}/></button>
  <button title={language==='es'?'Tachado':'Strikethrough'} className={editor&&!editor.isDestroyed&&editor.isActive('strike')?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleStrike().run()}><Strikethrough size={15}/></button>
  <span/>
  <button title={language==='es'?'Título 1':'Heading 1'} className={editor&&!editor.isDestroyed&&editor.isActive('heading',{level:1})?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleHeading({level:1}).run()}><Heading1 size={16}/></button>
  <button title={language==='es'?'Título 2':'Heading 2'} className={editor&&!editor.isDestroyed&&editor.isActive('heading',{level:2})?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleHeading({level:2}).run()}><Heading2 size={16}/></button>
  <button title={language==='es'?'Título 3':'Heading 3'} className={editor&&!editor.isDestroyed&&editor.isActive('heading',{level:3})?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleHeading({level:3}).run()}><Heading3 size={16}/></button>
  <span/>
  <button title={language==='es'?'Lista con viñetas':'Bulleted list'} className={editor&&!editor.isDestroyed&&editor.isActive('bulletList')?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleBulletList().run()}><List size={15}/></button>
  <button title={language==='es'?'Lista numerada':'Numbered list'} className={editor&&!editor.isDestroyed&&editor.isActive('orderedList')?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={15}/></button>
  <span/>
  <button title={language==='es'?'Deshacer':'Undo'} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().undo().run()}><Undo2 size={15}/></button>
  <button title={language==='es'?'Rehacer':'Redo'} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().redo().run()}><Redo2 size={15}/></button>
 </div><div className={`paper ${focus?'focus-paper':''}`} style={{'--writing-size':`${fontSize}px`} as React.CSSProperties}><EditorContent editor={editor&&!editor.isDestroyed?editor:null}/><div className="paper-footer"><span>✦ &nbsp; {language==='es'?'Un párrafo a la vez.':'One paragraph at a time.'}</span><span>{wordCount(htmlToText(editor&&!editor.isDestroyed?editor.getHTML():'' )).toLocaleString(language==='es'?'es-AR':'en-US')} {language==='es'?'palabras':'words'}</span></div></div></>;
}
