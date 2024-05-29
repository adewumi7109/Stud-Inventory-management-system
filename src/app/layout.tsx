
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './components/globals.css'
import {AuthProvider} from '@/app/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>

      <body className={inter.className}>{children}</body>
      </AuthProvider>



   
    </html>
  )
}