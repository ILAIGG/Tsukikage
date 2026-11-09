import { useEffect, useMemo } from 'react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import { Mark, mergeAttributes, Node as TiptapNode } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Redo2, Strikethrough, Underline as UnderlineIcon, Undo2 } from 'lucide-react';
import type { Chapter } from '../model';
import { htmlToText, sanitizeHtml, wordCount } from '../export';

const SceneBreak = TiptapNode.create({name:'sceneBreak',group:'block',atom:true,selectable:true,addAttributes(){return {sceneId:{default:null,parseHTML:element=>element.getAttribute('data-scene-id'),renderHTML:attributes=>attributes.sceneId?{'data-scene-id':attributes.sceneId}:{}},sceneTitle:{default:null,parseHTML:element=>element.getAttribute('data-scene-title'),renderHTML:attributes=>attributes.sceneTitle?{'data-scene-title':attributes.sceneTitle}:{}}};},parseHTML(){return [{tag:'div[data-tsukikage-scene-break]'}];},renderHTML({HTMLAttributes}){const title=HTMLAttributes['data-scene-title']||'Scene';return ['div',mergeAttributes(HTMLAttributes,{'data-tsukikage-scene-break':'true','contenteditable':'false','class':'scene-break-marker'}),['span',{},title]];}});
const Underline = Mark.create({name:'underline',parseHTML(){return [{tag:'u'},{style:'text-decoration=underline'}];},renderHTML({HTMLAttributes}){return ['u',mergeAttributes(HTMLAttributes),0];}});

export default function RichEditor({ chapter, onChange, focus, fontSize, language, accessibleLabel, placeholderText, withSceneBreaks=false, syncContent=true }: { chapter: Chapter; onChange: (html: string) => void; focus: boolean; fontSize:number; language: 'es'|'en'; accessibleLabel?:string; placeholderText?:string; withSceneBreaks?:boolean; syncContent?:boolean }) {
 const placeholder = placeholderText || (language === 'es' ? 'Deja que la historia empiece…' : 'Let the story begin…');
 const extensions = useMemo(() => [StarterKit,Underline,...(withSceneBreaks?[SceneBreak]:[]),Placeholder.configure({ placeholder })], [placeholder,withSceneBreaks]);
 const editor = useEditor({ extensions, content: sanitizeHtml(chapter.text || ''), onUpdate: ({ editor }) => { if (!editor.isDestroyed) onChange(editor.getHTML()); }, editorProps: { attributes: { class: 'tiptap-writing', spellcheck: 'true',role:'textbox','aria-multiline':'true','aria-label':accessibleLabel||(language==='es'?'Texto del manuscrito':'Manuscript text'),...(accessibleLabel?{'aria-label':accessibleLabel}:{}) } } });
 const activeFormats=useEditorState({editor,selector:({editor})=>editor?({bold:editor.isActive('bold'),italic:editor.isActive('italic'),underline:editor.isActive('underline'),strike:editor.isActive('strike'),heading1:editor.isActive('heading',{level:1}),heading2:editor.isActive('heading',{level:2}),heading3:editor.isActive('heading',{level:3}),bulletList:editor.isActive('bulletList'),orderedList:editor.isActive('orderedList')}):null});
 useEffect(() => { if (!syncContent||!editor || editor.isDestroyed || !editor.schema) return; const content = sanitizeHtml(chapter.text || '') || '<p></p>'; if (editor.getHTML() !== content) editor.commands.setContent(content, { emitUpdate: false }); }, [editor, chapter.id, chapter.text,syncContent]);
 return <><div className={`paper ${focus?'focus-paper':''}`} style={{'--writing-size':`${fontSize}px`} as React.CSSProperties}><div className="format-toolbar">
  <button type="button" title={language==='es'?'Negrita':'Bold'} aria-pressed={activeFormats?.bold??false} className={activeFormats?.bold?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleBold().run()}><Bold size={15}/></button>
  <button type="button" title={language==='es'?'Cursiva':'Italic'} aria-pressed={activeFormats?.italic??false} className={activeFormats?.italic?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleItalic().run()}><Italic size={15}/></button>
  <button type="button" title={language==='es'?'Subrayado':'Underline'} aria-pressed={activeFormats?.underline??false} className={activeFormats?.underline?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleMark('underline').run()}><UnderlineIcon size={15}/></button>
  <button type="button" title={language==='es'?'Tachado':'Strikethrough'} aria-pressed={activeFormats?.strike??false} className={activeFormats?.strike?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleStrike().run()}><Strikethrough size={15}/></button>
  <span/>
  <button type="button" title={language==='es'?'Título 1':'Heading 1'} aria-pressed={activeFormats?.heading1??false} className={activeFormats?.heading1?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleHeading({level:1}).run()}><Heading1 size={16}/></button>
  <button type="button" title={language==='es'?'Título 2':'Heading 2'} aria-pressed={activeFormats?.heading2??false} className={activeFormats?.heading2?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleHeading({level:2}).run()}><Heading2 size={16}/></button>
  <button type="button" title={language==='es'?'Título 3':'Heading 3'} aria-pressed={activeFormats?.heading3??false} className={activeFormats?.heading3?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleHeading({level:3}).run()}><Heading3 size={16}/></button>
  <span/>
  <button type="button" title={language==='es'?'Lista con viñetas':'Bulleted list'} aria-pressed={activeFormats?.bulletList??false} className={activeFormats?.bulletList?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleBulletList().run()}><List size={15}/></button>
  <button type="button" title={language==='es'?'Lista numerada':'Numbered list'} aria-pressed={activeFormats?.orderedList??false} className={activeFormats?.orderedList?'selected':''} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={15}/></button>
  <span/>
  <button type="button" title={language==='es'?'Deshacer':'Undo'} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().undo().run()}><Undo2 size={15}/></button>
  <button type="button" title={language==='es'?'Rehacer':'Redo'} onClick={()=>editor&&!editor.isDestroyed&&editor.chain().focus().redo().run()}><Redo2 size={15}/></button>
 </div><EditorContent editor={editor&&!editor.isDestroyed?editor:null}/><div className="paper-footer"><span>✦ &nbsp; {language==='es'?'Un párrafo a la vez.':'One paragraph at a time.'}</span><span>{wordCount(htmlToText(editor&&!editor.isDestroyed?editor.getHTML():'' )).toLocaleString(language==='es'?'es-AR':'en-US')} {language==='es'?'palabras':'words'}</span></div></div></>;
}
