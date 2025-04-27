import './globals.css'
import { ReactNode } from 'react'
import { Analytics } from "@vercel/analytics/react"
import Footer from './components/Footer'


export const metadata = {
  title: 'Studio Giuseppe Auletta',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <Analytics/>
      <body className="flex flex-col min-h-screen mx-auto text-sm  xl:text-base">     
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
