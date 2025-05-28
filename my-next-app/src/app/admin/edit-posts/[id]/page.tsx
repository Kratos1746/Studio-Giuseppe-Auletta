'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import RichTextEditor from '../../../components/RichTextEditor'

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()

  const [post, setPost] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Verifica autenticazione
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (!user || error) {
        router.push('/admin')
        return
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch del post con la categoria associata
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select(`
            *,
            categories (
              id,
              name
            )
          `)
          .eq('id', id)
          .single()

        if (postError) {
          console.error('Errore nel caricamento del post:', postError)
          alert('Errore nel caricamento del post')
          router.push('/admin/dashboard')
          return
        }

        if (postData) {
          setPost(postData)
          setTitle(postData.title || '')
          setContent(postData.content || '')
          setSelectedCategory(postData.category_id || '')
        }

        // Fetch delle categorie
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name')

        if (categoriesError) {
          console.error('Errore nel caricamento delle categorie:', categoriesError)
        } else {
          setCategories(categoriesData || [])
        }

      } catch (error) {
        console.error('Errore generale:', error)
        alert('Errore nel caricamento dei dati')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, router])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Il titolo è obbligatorio')
      return
    }

    if (!content.trim()) {
      alert('Il contenuto è obbligatorio')
      return
    }

    try {
      setSaving(true)
      
      // Verifica che l'utente sia ancora autenticato
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        alert('Sessione scaduta. Effettua di nuovo il login.')
        router.push('/admin')
        return
      }

      console.log('Tentativo di aggiornamento post:', {
        id,
        title: title.trim(),
        content: content.substring(0, 100) + '...', // Solo primi 100 caratteri per debug
        category_id: selectedCategory || null,
        user_id: user.id
      })
      
      // Prima verifica che il post appartenga all'utente corrente
      const { data: existingPost, error: fetchError } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', id)
        .single()

      if (fetchError) {
        console.error('Errore nel recupero del post:', fetchError)
        alert('Errore: Post non trovato')
        return
      }

      if (existingPost.user_id !== user.id) {
        alert('Non hai i permessi per modificare questo post')
        return
      }

      // Ora procedi con l'aggiornamento
      const { data, error } = await supabase
        .from('posts')
        .update({
          title: title.trim(),
          content,
          category_id: selectedCategory || null,

        })
        .eq('id', id)
        .eq('user_id', user.id) // Doppia sicurezza
        .select()

      if (error) {
        console.error('Errore completo nella modifica del post:', {
          error,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        alert(`Errore nella modifica del post: ${error.message || 'Errore sconosciuto'}`)
      } else {
        console.log('Post aggiornato con successo:', data)
        alert('Post aggiornato con successo!')
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Errore generale durante il salvataggio:', error)

    } finally {
      setSaving(false)
    }
  }

  const handleContentChange = (html: string) => {
    setContent(html)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
            <div className="h-3 bg-gray-300 rounded w-24 mx-auto"></div>
          </div>
          <p className="text-gray-600 mt-4">Caricamento post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-red-600 text-lg font-semibold">Post non trovato</p>
          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Torna alla Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-200 text-blue-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <h1 className="text-2xl font-bold">Modifica Post</h1>
            <p className="text-blue-100 mt-1">
              ID: {post.id} | Creato: {new Date(post.created_at).toLocaleDateString('it-IT')}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="p-6 space-y-6">
            {/* Campo Titolo */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titolo del Post *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Inserisci il titolo del post"
                required
              />
            </div>

            {/* Campo Categoria */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">-- Nessuna categoria --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {post.categories && (
                <p className="text-sm text-gray-500 mt-1">
                  Categoria attuale: {post.categories.name}
                </p>
              )}
            </div>

            {/* Editor del Contenuto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenuto del Post *
              </label>
              <RichTextEditor 
                key={post.id} // Forza il re-render dell'editor quando cambia il post
                initialValue={content} 
                onChange={handleContentChange} 
              />
            </div>

            {/* Informazioni aggiuntive */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Informazioni Post</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Stato:</strong> {post.published ? 'Pubblicato' : 'Bozza'}
                </div>
                <div>
                  <strong>Ultima modifica:</strong> {
                    post.updated_at 
                      ? new Date(post.updated_at).toLocaleDateString('it-IT', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Mai modificato'
                  }
                </div>
                {post.scheduled_at && (
                  <div className="md:col-span-2">
                    <strong>Programmato per:</strong> {
                      new Date(post.scheduled_at).toLocaleDateString('it-IT', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Pulsanti di azione */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    💾 Salva Modifiche
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="flex-1 sm:flex-initial bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                ← Annulla
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}