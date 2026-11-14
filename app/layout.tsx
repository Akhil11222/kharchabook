import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'KharchaBook — Tera Paisa, Tera Hisaab',
  description: 'A personal, mobile-first expense tracker. Track your salary and daily expenses with style.',
  manifest: '/manifest.json',
  themeColor: '#967117',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="KharchaBook" />
      </head>
      <body className="font-nunito bg-butter min-h-screen">
        {children}
      </body>
    </html>
  )
}

