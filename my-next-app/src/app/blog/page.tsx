'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'


const Navbar2 = dynamic(() => import('../components/Navbar2'), { ssr: false })

type Post = {
  id: number
  title: string
  content: string
  created_at: string
  coverUrl?: string
  category_id: number
  category: {
    name: string
  }
}

type Category = {
  id: number
  name: string
}

const CONTENT_LIMIT = 150

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(9)

  const router = useRouter()

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('id, name')
    if (error) {
      console.error('Errore caricamento categorie:', error.message)
    } else {
      setCategories(data || [])
    }
  }

  const fetchPosts = async () => {
    let query = supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        created_at,
        category_id,
        category:categories!category_id (name)
      `)
      .order('created_at', { ascending: false })

    if (selectedCategory && selectedCategory !== 'all') {
      query = query.eq('category_id', selectedCategory)
    }

    const { data: postsData, error: postsError } = await query

    if (postsError || !postsData) {
      console.error('Errore caricamento post:', postsError?.message ?? postsError)
      return
    }

    const postsWithCovers: Post[] = await Promise.all(
      postsData.map(async (post: any) => {
        const category = Array.isArray(post.category) ? post.category[0] : post.category

        const { data: image } = await supabase
          .from('post_images')
          .select('image_url')
          .eq('post_id', post.id)
          .eq('is_cover', true)
          .single()

        return {
          ...post,
          category,
          coverUrl: image?.image_url || '/fallback.jpg',
        }
      })
    )

    setPosts(postsWithCovers)
    setCurrentPage(1) // reset pagina
  }

  useEffect(() => {
    fetchCategories()
    fetchPosts()
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  useEffect(() => {
    const updatePostsPerPage = () => {
      if (window.innerWidth < 768) {
        setPostsPerPage(6)
      } else {
        setPostsPerPage(9)
      }
    }

    updatePostsPerPage()
    window.addEventListener('resize', updatePostsPerPage)

    return () => window.removeEventListener('resize', updatePostsPerPage)
  }, [])

  const truncateContent = (content: string) => {
    if (content.length <= CONTENT_LIMIT) return content
    return content.slice(0, CONTENT_LIMIT) + '... <span class="text-blue-600 hover:underline underline-offset-2 text-xs">Leggi tutto</span>'
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  return (
    <main>
      <Navbar2 />

      {/* Hero + Dropdown */}
      <section className="relative h-72 bg-fixed bg-center bg-cover flex flex-col justify-center text-white bg-black mt-40">
        <div
          className="absolute inset-0 bg-center bg-cover lg:bg-fixed brightness-50 "
          style={{ backgroundImage: "url('/img/blog-bg.jpg')" }}
        />
        <div className="relative z-10 px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-4xl md:text-5xl font-titolo font-bold mb-4 md:mb-0 text-center md:text-left">
              Scopri articoli e curiosità
            </h1>

            <select
              className="bg-white text-blue-950 border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 md:mt-0 md:ml-6 w-full md:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Tutte le categorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Sezione Post */}
      <section className="relative z-10 2xl:mx-18 my-8 flex flex-col xl:flex-row items-stretch">
        <div className="min-h-screen text-blue-950 p-6 w-full">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => router.push(`/blog/${post.id}`)}
                  className="cursor-pointer rounded-sm overflow-hidden shadow hover:shadow-lg hover:shadow-neutral-700 transition ease-in-out duration-400 hover:scale-105 relative group"
                >
                  <div
                    className="h-[500px] bg-cover bg-center brightness-75"
                    style={{ backgroundImage: `url('${post.coverUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950 to-transparent p-4 z-10 group-hover:translate-y-[-100%] transition-all duration-300 group-hover:opacity-0 hidden lg:block">
                    <h2 className="text-2xl sm:text-3xl font-medium font-titolo text-white opacity-100">{post.title}</h2>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-4 opacity-100 transition-all duration-300 transform translate-y-6 group-hover:translate-y-0 z-0 lg:opacity-0 md:group-hover:opacity-100 md:translate-y-6 md:group-hover:translate-y-0">
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-t from-neutral-950 to-transparent p-4 z-10 lg:group-hover:translate-y-[-100%] translate-y-[-100%] transition-all duration-300">
                      <h2 className="text-xl sm:text-2xl font-medium font-titolo text-white opacity-100">{post.title}</h2>
                    </div>
                    <span className="italic text-gray-600 text-xs md:text-sm">{post.category?.name || 'Senza categoria'}</span>
                    <div
                      className="text-gray-700 text-sm sm:text-base mt-2"
                      dangerouslySetInnerHTML={{ __html: truncateContent(post.content) }}
                    />
                    <div className="text-xs md:text-sm py-4 text-gray-500 float-right">
                      {new Date(post.created_at).toLocaleDateString('it-IT', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600 text-xl">
                Nessun post trovato per questa categoria.
              </p>
            )}
          </div>

          {/* UI Paginazione */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-10">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                ‹ Indietro
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Avanti ›
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
