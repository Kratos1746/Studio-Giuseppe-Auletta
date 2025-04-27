import { Node, mergeAttributes } from '@tiptap/core'
import { Node as ProseMirrorNode } from 'prosemirror-model'

export const CustomParagraph = Node.create({
  name: 'paragraph',
  group: 'block',
  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'p',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    // Verifica se ci sono 'marks' all'interno dei figli del nodo
    let hasFontSize = false
    for (let i = 0; i < node.content.childCount; i++) {
      const child = node.content.child(i) as ProseMirrorNode
      // Controlla solo i marks del nodo figlio
      if (child.marks.some((mark: any) => mark.type.name === 'fontSize')) {
        hasFontSize = true
        break // Usato 'break' per evitare un ciclo infinito
      }
    }

    const attrs = hasFontSize
      ? mergeAttributes(HTMLAttributes, { id: 'titolo' })
      : HTMLAttributes

    return ['p', attrs, 0]
  },
})
