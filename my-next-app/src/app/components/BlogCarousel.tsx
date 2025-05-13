'use client'

import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'

type Post = {
  id: number
  title: string
  content: string
  created_at: string
  coverUrl: string
  category?: {
    name: string
  }
}

const CONTENT_LIMIT = 150

const BlogCarousel = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
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
        category:categories!category_id(name)
      `)
      .order('created_at', { ascending: false })

    const { data: postsData, error } = await query

    if (error || !postsData) {
      console.error('Errore caricamento post:', error?.message)
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
  }

  useEffect(() => {
    fetchPosts()
  }, [])

const truncateContent = (content: string) => {
  // Parse del contenuto HTML in un documento temporaneo
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');

  // Rimuovi tutte le classi e gli stili inline
  doc.body.querySelectorAll('*').forEach(el => {
    el.removeAttribute('class');
    el.removeAttribute('style');
  });

  // Ottieni solo il testo "pulito"
  const textContent = doc.body.textContent || "";

  if (textContent.length <= CONTENT_LIMIT) {
    return textContent;
  }

  const truncatedText = textContent.slice(0, CONTENT_LIMIT);

  return `${truncatedText}... <span class="text-blue-600 hover:underline underline-offset-2 text-xs">Leggi tutto</span>`;
};


  return (
    <section className="relative py-16 px-6 lg:px-12 my-10 overflow-hidden bg-black">
      {/* Sfondo con effetto parallax */}
      <div
        className="absolute inset-0 bg-right bg-cover lg:bg-fixed brightness-80  z-10"
        style={{ backgroundImage: "url('/img/carousel-bg2.jpg')" }}
      ></div>

      <div className="relative z-10 p-4 mt-6 container mx-auto">
      <Link href="/blog" className="absolute right-5 -top-10 text-white  font-medium hover:underline motion-preset-wobble motion-duration-1500 ">Visita il blog →</Link>
        <h2 className="font-titolo2 text-2xl md:text-3xl xl:text-4xl font-medium text-center mb-12 text-white">
          Hai dei dubbi sulla tua situazione? <br /> <br />Leggi gli <u>Articoli di Approfondimento</u>
        </h2>

        <Slider {...settings}>
          {posts.map((post) => (
            <div
              key={post.id}
              className="cursor-pointer group"
              onClick={() => router.push(`/blog/${post.id}`)}
            >
              <div className="rounded-sm shadow-lg  mx-4 relative overflow-hidden hover:scale-105 transition-transform duration-400 ease-in-out group">
                {/* Immagine */}
                <div
                  className="w-full h-84 object-cover bg-cover bg-center brightness-75"
                  style={{ backgroundImage: `url(${post.coverUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>

                {/* Titolo visibile in basso, scompare su hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950 to-transparent p-4 z-10 group-hover:translate-y-[-100%] transition-all duration-300 group-hover:opacity-0 hidden lg:block">
                  <h3 className="font-medium font-titolo text-xl text-white">{post.title}</h3>
                </div>

                {/* Contenuto visibile su hover (desktop) e fisso su mobile */}
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4 opacity-100 translate-y-6 group-hover:translate-y-0 z-0 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-6 lg:group-hover:translate-y-0 transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-t from-neutral-950 to-transparent p-4 z-10 lg:group-hover:translate-y-[-100%] translate-y-[-100%] transition-all duration-300">
                    <h3 className="font-medium font-titolo text-base md:text-xl text-white">{post.title}</h3>
                  </div>
                  <span className="italic text-gray-600 block text-xs md:text-sm ">{post.category?.name || 'Senza categoria'}</span>
                  <div
                    className="text-gray-700 text-xs md:text-sm mt-2"
                    dangerouslySetInnerHTML={{ __html: truncateContent(post.content) }}
                  />
                  <div className="text-xs py-4 text-gray-500 float-right">
                    {new Date(post.created_at).toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default BlogCarousel
