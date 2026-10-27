
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_SERVER_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: 'Configurazione Google mancante' },
      { status: 500 }
    )
  }

  const params = new URLSearchParams({
    place_id: placeId,
    key: apiKey,
    fields: 'reviews',
    reviews_sort: 'newest',
    language: 'it',
  })

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
      { cache: 'no-store' }
    )

    if (!response.ok) {
      throw new Error(`Google HTTP ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: data.status },
        { status: 502 }
      )
    }

    const reviews = (data.result?.reviews ?? [])
      .filter((r: any) => r.rating >= 4)
      .sort((a: any, b: any) => b.time - a.time)
      .map((r: any) => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.time,
        profile_photo_url: r.profile_photo_url,
        author_url: r.author_url,
      }))

    return NextResponse.json({ reviews })
  } catch {
    return NextResponse.json(
      { error: 'Impossibile recuperare le recensioni' },
      { status: 502 }
    )
  }
}
