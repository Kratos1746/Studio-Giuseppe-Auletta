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
import { useEffect, useState, useRef } from 'react'
import { FontSize } from '../../extensions/FontSize'

export default function RichTextEditor({
  initialValue = '',
  onChange,
}: {
  initialValue?: string
  onChange?: (html: string) => void
}) {
  const [isClient, setIsClient] = useState(false)
  const [currentFontSize, setCurrentFontSize] = useState('16px')
  const toolbarRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isToolbarFixed, setIsToolbarFixed] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Gestione scroll per toolbar fissa
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && toolbarRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const toolbarHeight = toolbarRef.current.offsetHeight
        
        // Se il container è sopra il viewport, rendi la toolbar fissa
        if (containerRect.top <= 0 && containerRect.bottom > toolbarHeight) {
          setIsToolbarFixed(true)
        } else {
          setIsToolbarFixed(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
          'min-h-[300px] border border-gray-300 p-4 rounded focus:outline-none  max-w-none post-content',
      },
      handlePaste(view, event, slice) {
        // Preserva la formattazione originale incluse le dimensioni dei font
        return false
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
      // Aggiorna la dimensione del font corrente basata sulla selezione
      updateCurrentFontSize()
    },
    onSelectionUpdate({ editor }) {
      // Aggiorna la dimensione del font quando cambia la selezione
      updateCurrentFontSize()
    },
  })

  // Funzione per aggiornare la dimensione del font corrente
  const updateCurrentFontSize = () => {
    if (editor) {
      const { from, to } = editor.state.selection
      const node = editor.state.doc.nodeAt(from)
      
      if (node) {
        const fontSize = node.marks.find(mark => mark.type.name === 'textStyle')?.attrs?.fontSize
        if (fontSize) {
          setCurrentFontSize(fontSize)
        } else {
          // Se non c'è un font size specifico, usa quello del CSS o default
          const element = editor.view.dom.querySelector('.ProseMirror')
          if (element) {
            const computedStyle = window.getComputedStyle(element)
            setCurrentFontSize(computedStyle.fontSize || '16px')
          }
        }
      }
    }
  }

  // Effetto per aggiornare il contenuto dell'editor quando initialValue cambia
  useEffect(() => {
    if (editor && initialValue !== editor.getHTML()) {
      // Usa setContent con parseOptions per preservare tutti gli stili
      editor.commands.setContent(initialValue, false, {
        preserveWhitespace: 'full',
      })
      // Aggiorna la dimensione del font dopo aver caricato il contenuto
      setTimeout(() => updateCurrentFontSize(), 100)
    }
  }, [editor, initialValue])

  if (!isClient || !editor) return <div>Caricamento editor...</div>

  // Funzione che previene l'invio del form
  const handleButtonClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault()
    callback()
  }

  // Gestione cambio dimensione font con fix del bug
  const handleFontSizeChange = (newSize: string) => {
    if (editor) {
      // Forza sempre l'applicazione della nuova dimensione
      editor.chain().focus().unsetFontSize().setFontSize(newSize).run()
      setCurrentFontSize(newSize)
    }
  }

  return (
    <div ref={containerRef} className="border rounded-lg shadow bg-white p-4">
      <div 
        ref={toolbarRef}
        className={`bg-white flex flex-wrap gap-2 border-b pb-3 mb-4 items-center z-50 ${
          isToolbarFixed 
            ? 'fixed top-0 left-0 right-0 border-b shadow-md p-4' 
            : 'relative'
        }`}
        style={isToolbarFixed ? { 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '1rem'
        } : {}}
      >
        <button 
          type="button"
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
          value={currentFontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)} 
          className="ml-2 p-1 border rounded"
        >
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
          <option value="28px">28</option>
          <option value="32px">32</option>
          <option value="36px">36</option>
          <option value="38px">38</option>
          <option value="42px">42</option>
        </select>
      </div>

      {/* Spazio di compensazione quando la toolbar è fissa */}
      {isToolbarFixed && (
        <div style={{ height: toolbarRef.current?.offsetHeight || 60 }} />
      )}

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
    border: none;
  }
  .btn:hover {
    background: #e2e2e2;
  }
  .btn-active {
    background: #2563eb;
    color: white;
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
  }

 
`}</style>

    </div>
  )
}