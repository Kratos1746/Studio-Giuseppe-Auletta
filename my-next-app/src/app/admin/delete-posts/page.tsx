'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DeletePostsPage() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select('id, title')
      if (data) setPosts(data)
    }
    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Sei sicuro di voler eliminare questo post?')
    if (!confirm) return

    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (!error) {
      alert('Post eliminato')
      setPosts(posts.filter(p => p.id !== id))
    } else {
      alert('Errore durante l\'eliminazione')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-blue-900 p-6">
      <h1 className="text-2xl font-bold mb-4">Elimina un Post</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>{post.title}</span>
            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Elimina
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
