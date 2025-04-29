// components/GoogleReviewsCarousel.tsx
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'

type GoogleReview = {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url: string
}

declare global {
  interface Window {
    google: any
  }
}

export default function GoogleReviewsCarousel({
  placeId,
  apiKey,
  mapsLink,
}: {
  placeId: string
  apiKey: string
  mapsLink?: string
}) {
  const [reviews, setReviews] = useState<GoogleReview[]>([])

  useEffect(() => {
    const loadReviews = () => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      )
      service.getDetails(
        {
          placeId,
          fields: ['reviews'],
        },
        (place: any, status: any) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place?.reviews
          ) {
            const filteredReviews = place.reviews
              .filter((r: GoogleReview) => r.rating >= 4)
              .sort((a: GoogleReview, b: GoogleReview) => b.time - a.time)
              .slice(0, 10)
            setReviews(filteredReviews)
          }
        }
      )
    }

    const isScriptLoaded = document.querySelector(
      `script[src^="https://maps.googleapis.com/maps/api/js"]`
    )

    if (!window.google && !isScriptLoaded) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.onload = loadReviews
      document.head.appendChild(script)
    } else if (window.google) {
      loadReviews()
    }
  }, [placeId, apiKey])

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
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const finalMapsLink =
    mapsLink || `https://www.google.com/maps/place/?q=place_id:${placeId}`

  return (
    <section className="relative py-16 px-6 lg:px-12 my-12 overflow-hidden bg-black">
      <div
        className="absolute inset-0 translate-y-[45%] md:translate-y-[50%] lg:translate-y-[55%] bg-center bg-cover brightness-50 blur-xs scale-110 md:scale-150 xl:scale-120"
        style={{ backgroundImage: "url('/img/recensioni.jpg')" }}
      />

      <div className="relative z-10 p-4 mt-6 container mx-auto">
        <Link
          href={finalMapsLink}
          target="_blank"
          className="absolute right-5 -top-10 text-white font-medium hover:underline motion-preset-wobble motion-duration-1500"
        >
          scopri le recensioni →
        </Link>

        <h2 className="font-titolo2 text-2xl md:text-3xl xl:text-4xl font-medium text-center mb-12 text-white">
          Esperienze di chi ha ritrovato <u>serenità</u>
        </h2>

        {reviews.length > 0 ? (
          <Slider {...settings}>
            {reviews.map((review, i) => (
              <div key={i} className="px-3">
                <div className="flex flex-col text-white min-h-[300px]">
                  <div className="flex flex-col bg-white border border-gray-200 rounded-sm shadow-md pt-4 pb-6 px-4 md:pb-10 md:pt-6 md:px-8">
                    <div>
                      <p className="text-yellow-500 text-sm mb-2">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </p>
                    </div>

                    <p className="italic text-gray-700 line-clamp-4">
                      "{truncateText(review.text, 300)}"
                    </p>

                    <div className="mt-4">
                      <a
                        href={finalMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm text-blue-800 font-semibold hover:underline"
                      >
                        Leggi tutto su Google →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-12 h-12 rounded-full border border-gray-300"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{review.author_name}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 533.5 544.3"
                            width="20"
                            height="20"
                          >
                            <path
                              fill="#4285F4"
                              d="M533.5 278.4c0-17.4-1.6-34-4.7-50.2H272v95h146.9c-6.4 34.3-25 63.4-53.2 82.8v68h85.9c50.2-46.2 81.9-114.3 81.9-195.6z"
                            />
                            <path
                              fill="#34A853"
                              d="M272 544.3c72.4 0 133.1-23.9 177.5-64.9l-85.9-68c-23.8 16-54.2 25.5-91.6 25.5-70.4 0-130.1-47.6-151.4-111.6h-90v70.2C89.3 485.5 173.7 544.3 272 544.3z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M120.6 325.3c-10.6-31.5-10.6-65.4 0-96.9v-70.2h-90c-39 78-39 159.2 0 237.2l90-70.1z"
                            />
                            <path
                              fill="#EA4335"
                              d="M272 107.7c39.3 0 74.6 13.6 102.3 40.2l76.5-76.5C405.1 24.8 344.4 0 272 0 173.7 0 89.3 58.8 30.6 158.2l90 70.2C141.9 155.3 201.6 107.7 272 107.7z"
                            />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-300">
                          {new Date(review.time * 1000).toLocaleDateString(
                            'it-IT',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">
            Nessuna recensione trovata al momento.
          </p>
        )}
      </div>
    </section>
  )
}
