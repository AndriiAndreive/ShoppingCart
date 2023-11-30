import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { CartProvider } from "../context/CartContext";
import { Suspense } from 'react';
import Loading from '@/components/loading';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-commerce Platform',
  description: 'Building a simple E-commerce Platform using Next.js, React, and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <Suspense fallback={<Loading full />}>
            {children}
          </Suspense>
        </CartProvider>
      </body>
    </html>
  )
}
