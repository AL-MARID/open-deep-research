import type { Metadata } from 'next'
import { Geist, Zen_Dots } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/components/analytics'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const zenDots = Zen_Dots({
  variable: '--font-zen-dots',
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Open Deep Research',
  description:
    'Open source alternative to Deep Research. Generate reports with AI based on search results.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: { url: '/favicon.ico', sizes: 'any' },
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Open Deep Research',
    description: 'Open source alternative to Deep Research. Generate reports with AI based on search results.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Open Deep Research Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Deep Research',
    description: 'Open source alternative to Deep Research. Generate reports with AI based on search results.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <Analytics />
      <body className={`${geistSans.variable} ${zenDots.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
