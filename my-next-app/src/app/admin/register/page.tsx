
'use client'

import { useState } from 'react'
import { registerUser } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = await registerUser(email, password)
      router.push('/admin/create-post') // Redirect to the post creation page after successful registration
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 text-blue-900 flex items-center justify-center p-4">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-xl shadow w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Registrati</h2>
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
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full">
          Registrati
        </button>
      </form>
    </div>
  )
}
