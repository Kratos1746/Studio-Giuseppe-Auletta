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

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single()
      if (data) {
        setPost(data)
        setTitle(data.title)
        setContent(data.content)
        setSelectedCategory(data.category_id)
      }
    }

    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*')
      if (data) setCategories(data)
    }

    fetchPost()
    fetchCategories()
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('posts').update({
      title,
      content,
      category_id: selectedCategory
    }).eq('id', id)

    if (error) {
      alert('Errore nella modifica')
    } else {
      alert('Post aggiornato!')
      router.push('/admin/dashboard')
    }
  }

  if (!post) return <div className="p-6">Caricamento...</div>

  return (
    <div className="min-h-screen bg-gray-200 text-blue-900 p-6">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold">Modifica Post</h2>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <RichTextEditor initialValue={content} onChange={setContent} />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Seleziona categoria --</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded w-full">
          Salva Modifiche
        </button>
      </form>
    </div>
  )
}
