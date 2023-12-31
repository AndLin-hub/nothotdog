import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'not hotdog',
  description: 'is it a not hotdog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-10`}>
    <div className="absolute top-[10vh] left-[30vw] h-[30rem] w-[30rem] bg-blue-700 blur-[30rem] rounded-full opacity-100"/>
        <div className="absolute top-[10vh] left-[85vw] h-[30rem] w-[30rem] bg-red-700 blur-[30rem] rounded-full opacity-100"/>
        <div className="absolute top-[60vh] left-[10vw] h-[30rem] w-[30rem] bg-violet-700 blur-[30rem] rounded-full opacity-100"/>
        {children}
        </body>
    </html>
  )
}
