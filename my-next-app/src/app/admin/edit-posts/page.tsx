'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function EditPostsPage() {
  const [posts, setPosts] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('id, title')
      if (!error && data) setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 text-blue-900 p-6">
      <h1 className="text-2xl font-bold mb-4">Modifica un Post</h1>
      <ul className="space-y-3">
        {posts.map(post => (
          <li key={post.id}>
            <button
              onClick={() => router.push(`/admin/edit-posts/${post.id}`)}
              className="text-left bg-white p-4 w-full rounded shadow hover:bg-blue-100 transition"
            >
              ✏️ {post.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
