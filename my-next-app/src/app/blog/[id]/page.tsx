'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Navbar2 from '@/app/components/Navbar2'

type Post = {
  id: number
  title: string
  content: string
  created_at: string
  category_id: number
  coverUrl?: string
  category: {
    name: string
  }
}

type SimplePost = {
  id: number
  title: string
}

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<SimplePost[]>([])
  const [recentPosts, setRecentPosts] = useState<SimplePost[]>([])

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select(
          `
            id,
            title,
            content,
            created_at,
            category_id,
            category:categories!category_id (name)
          `
        )
        .eq('id', id)
        .single()

      if (postError || !postData) {
        console.error('Errore nel recupero del post:', postError)
        return
      }

      // Assicurati che la categoria sia un singolo oggetto
      const category = Array.isArray(postData.category) ? postData.category[0] : postData.category

      const { data: imageData } = await supabase
        .from('post_images')
        .select('image_url')
        .eq('post_id', postData.id)
        .eq('is_cover', true)
        .single()

      const coverUrl = imageData?.image_url || '/fallback.jpg'

      // Imposta il post con la categoria corretta
      setPost({ ...postData, category, coverUrl })

      const { data: related } = await supabase
        .from('posts')
        .select('id, title')
        .eq('category_id', postData.category_id)
        .neq('id', postData.id)
        .limit(5)

      setRelatedPosts(related || [])

      const { data: recent } = await supabase
        .from('posts')
        .select('id, title')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentPosts(recent || [])
    }

    fetchPost()
  }, [id])

  if (!post) {
    return <div className="p-10 text-center">Caricamento...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 text-blue-950 p-6 lg:flex lg:gap-8 lg:max-w-7xl mx-auto my-32 md:my-36">
      <Navbar2 />
      {/* Main content */}
      <div className="lg:w-2/3 px-3 ">
        <Link href="/blog" className="inline-block my-4 text-blue-950 hover:underline text-sm">
          ← Torna al blog
        </Link>

        {post.coverUrl && (
          <img
            src={post.coverUrl}
            alt="Copertina"
            className="rounded-sm mb-6 w-full object-cover max-h-96 shadow-lg"
          />
        )}

        <h1 className="text-3xl xl:text-4xl font-bold my-6 font-titolo">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-1">
          Pubblicato il{' '}
          {new Date(post.created_at).toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Categoria: <strong>{post.category?.name}</strong>
        </p>

        <div
          className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

        
      <div className='flex justify-between items-center mt-18 gap-6'>
      <button 
        onClick={() => {     
          const phoneNumber = "393283744899";        
          const message = encodeURIComponent("Buongiorno, vorrei contattarla per un mio caso, potrei avere maggiori informazioni?");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }}
        className='px-3 py-2 sm:px-4 sm:py-4 w-fit bg-white rounded-sm shadow border-2 border-blue-900 hover:border-white hover:bg-blue-950 hover:text-white text-blue-900 hover:scale-105 transition ease-in-out duration-400 cursor-pointer'>
        Richiedi consulenza
      </button>

      </div>

      </div>

      {/* Sidebar fissa */}
      <div className="hidden lg:block lg:w-1/3 pl-8 my-10">
        <div className="sticky top-20 space-y-12">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Articoli correlati</h3>
            <ul className="space-y-2 text-sm">
              {relatedPosts.map((p) => (
                <li key={p.id}>
                  <Link href={`/blog/${p.id}`} className="text-gray-700 hover:underline hover:text-blue-800">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Ultimi articoli</h3>
            <ul className="space-y-2 text-sm">
              {recentPosts.map((p) => (
                <li key={p.id}>
                  <Link href={`/blog/${p.id}`} className="text-gray-700 hover:underline hover:text-blue-800">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
