'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect, useState } from 'react'
import { FontSize } from '../../extensions/FontSize'

export default function RichTextEditor({
  initialValue = '',
  onChange,
}: {
  initialValue?: string
  onChange?: (html: string) => void
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Highlight,
      TextStyle,
      Color,
      FontSize,
      Placeholder.configure({ placeholder: 'Scrivi qualcosa…' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      CharacterCount.configure({ limit: 10000 }),
    ],
    content: initialValue,
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] border border-gray-300 p-4 rounded focus:outline-none prose max-w-none',
      },
      handlePaste(view, event, slice) {
        // Lascia che TipTap gestisca il paste HTML
        return false
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  if (!isClient || !editor) return <div>Caricamento editor...</div>

  // Funzione che previene l'invio del form
  const handleButtonClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault(); // Previene l'invio del form
    callback();
  };

  return (
    <div className="border rounded-lg shadow bg-white p-4">
      <div className="sticky top-0 z-10 bg-white flex flex-wrap gap-2 border-b pb-3 mb-4 items-center">
        <button 
          type="button" // Specifico che è un bottone generico, non un submit
          onClick={handleButtonClick(() => editor.chain().focus().toggleBold().run())} 
          className={editor.isActive('bold') ? 'btn-active' : 'btn'}
        >
          B
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().toggleItalic().run())} 
          className={editor.isActive('italic') ? 'btn-active' : 'btn'}
        >
          <i>I</i>
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().toggleUnderline().run())} 
          className={editor.isActive('underline') ? 'btn-active' : 'btn'}
        >
          <u>U</u>
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().toggleHighlight().run())} 
          className={editor.isActive('highlight') ? 'btn-active' : 'btn'}
        >
          Highlight
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().toggleBulletList().run())} 
          className={editor.isActive('bulletList') ? 'btn-active' : 'btn'}
        >
          • List
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().toggleOrderedList().run())} 
          className={editor.isActive('orderedList') ? 'btn-active' : 'btn'}
        >
          1. List
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => {
            const url = prompt('Inserisci URL')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          })} 
          className={editor.isActive('link') ? 'btn-active' : 'btn'}
        >
          Link
        </button>
        
        {/* Bottoni per allineamento testo */}
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign('left').run())} 
          className={editor.isActive({ textAlign: 'left' }) ? 'btn-active' : 'btn'}
          title="Allinea a sinistra"
        >
          ⇤
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign('center').run())} 
          className={editor.isActive({ textAlign: 'center' }) ? 'btn-active' : 'btn'}
          title="Centra"
        >
          ⇔
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign('right').run())} 
          className={editor.isActive({ textAlign: 'right' }) ? 'btn-active' : 'btn'}
          title="Allinea a destra"
        >
          ⇥
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().setTextAlign('justify').run())} 
          className={editor.isActive({ textAlign: 'justify' }) ? 'btn-active' : 'btn'}
          title="Giustifica"
        >
          ⇆
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().undo().run())} 
          className="btn"
        >
          ↺
        </button>
        
        <button 
          type="button"
          onClick={handleButtonClick(() => editor.chain().focus().redo().run())} 
          className="btn"
        >
          ↻
        </button>
        
        <select 
          onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()} 
          className="ml-2 p-1 border rounded"
        >
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="24px">24</option>
          <option value="32px">32</option>
          <option value="38px">38</option>
          <option value="42px">42</option>
        </select>
      </div>

      <EditorContent editor={editor} />

      <div className="text-sm text-right text-gray-500 mt-2">
        {editor.storage.characterCount.characters()} caratteri
      </div>

      <style jsx>{`
        .btn {
          padding: 6px 10px;
          border-radius: 4px;
          background: #f1f1f1;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none; /* Rimuove i bordi predefiniti dei bottoni */
        }
        .btn:hover {
          background: #e2e2e2;
        }
        .btn-active {
          background: #2563eb;
          color: white;
          padding: 6px 10px;
          border: none; /* Rimuove i bordi predefiniti dei bottoni */
        }
      `}</style>
    </div>
  )
}