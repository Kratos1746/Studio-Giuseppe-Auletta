'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return router.push('/login')
      setUser(session.user)
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 text-blue-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => router.push('/admin/create-post')}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ➕ Crea Post
        </button>

        <button
          onClick={() => router.push('/admin/edit-posts')}
          className="w-full py-3 px-6 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          ✏️ Modifica Post
        </button>

        <button
          onClick={() => router.push('/admin/delete-posts')}
          className="w-full py-3 px-6 bg-red-600 text-white rounded hover:bg-red-700"
        >
          🗑️ Elimina Post
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-3 px-6 mt-6 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
