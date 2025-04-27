'use client'

import { useState, useEffect } from 'react'
import { loginUser } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Se già loggato, reindirizza
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/admin/dashboard') 

      }
    }
    checkSession()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
  
      if (error) throw new Error(error.message)
  
        router.push('/admin/dashboard') 

    } catch (err: any) {
      setError(err.message)
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-200 text-blue-900 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Resta connesso
        </label>

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full">
          Login
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-700">Non hai un account? </span>
          <a href="/register" className="text-blue-600 hover:underline">Registrati</a>
        </div>
      </form>
    </div>
  )
}
