'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import RichTextEditor from '../../components/RichTextEditor'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)
  const [coverIndex, setCoverIndex] = useState<number>(0)
  const [categoryInput, setCategoryInput] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledAt, setScheduledAt] = useState('')

  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) router.push('/admin')
    }
    getUser()
  }, [router])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*')
      if (!error) setCategories(data || [])
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (!user || userError) return alert('Utente non autenticato')

    // Crea categoria se non selezionata
    let categoryId = selectedCategory
    if (!categoryId && categoryInput) {
      const { data: newCategory, error: insertError } = await supabase
        .from('categories')
        .insert([{ name: categoryInput }])
        .select()
        .single()

      if (insertError || !newCategory) {
        console.error('Errore inserimento categoria:', insertError)
        return alert('Errore inserimento categoria')
      }
      categoryId = newCategory.id
    }

    const now = new Date().toISOString()

    // Crea post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert([{
        title,
        content,
        user_id: user.id,
        category_id: categoryId,
        scheduled_at: isScheduled ? scheduledAt : null,
        published: !isScheduled,
        created_at: now
      }])
      .select()
      .single()

    if (postError || !post) {
      console.error('Errore creazione post:', postError)
      return alert('Errore nella creazione del post')
    }

    // Upload immagini
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileName = `${Date.now()}-${file.name}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(fileName, file)

        if (uploadError) {
          console.error('Errore upload immagine:', uploadError)
          continue
        }

        const { data: publicUrl } = supabase.storage.from('blog-images').getPublicUrl(fileName)

        await supabase.from('post_images').insert([{
          post_id: post.id,
          image_url: publicUrl.publicUrl,
          is_cover: i === coverIndex
        }])
      }
    }

    alert(isScheduled ? 'Post schedulato con successo!' : 'Post pubblicato!')
    setTitle('')
    setContent('')
    setFiles(null)
    setCoverIndex(0)
    setCategoryInput('')
    setSelectedCategory('')
    setIsScheduled(false)
    setScheduledAt('')
    router.push(`/blog/`)
  }

  return (
    <div className="min-h-screen bg-gray-200 text-blue-900 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-2xl space-y-4">
        <h2 className="text-xl font-bold">Nuovo Post</h2>

        <input
          type="text"
          placeholder="Titolo"
          className="w-full p-2 border rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <RichTextEditor onChange={(html) => setContent(html)} />

        <div>
          <label className="block font-semibold mb-1">Categoria:</label>
          <select
            className="w-full p-2 border rounded mb-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Seleziona categoria --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="...o inserisci nuova categoria"
            className="w-full p-2 border rounded"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={isScheduled}
              onChange={() => setIsScheduled(!isScheduled)}
            />
            Pianifica pubblicazione
          </label>

          {isScheduled && (
            <input
              type="datetime-local"
              className="w-full p-2 border rounded mt-2"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              required
            />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={e => setFiles(e.target.files)}
        />

        {files && (
          <div>
            <p className="font-semibold mb-2">Immagine di copertina:</p>
            {Array.from(files).map((file, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="cover"
                  checked={coverIndex === index}
                  onChange={() => setCoverIndex(index)}
                />
                {file.name}
              </label>
            ))}
          </div>
        )}

        <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded w-full">
          {isScheduled ? 'Schedula' : 'Pubblica'}
        </button>
      </form>
    </div>
  )
}
