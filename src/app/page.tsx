"use client"
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1">
        <h1 className='text-2xl lg:text-5xl md:text-4xl sm:text-3xl	font-bold'>Building a simple E-commerce Platform using Next.js, React, and Tailwind CSS</h1>
        <p className="py-10">To check the website, Click below button</p>
        <p className="py-5">
          <Link href="/products" className="btn rounded-full bg-green-600 hover:bg-green-700 text-white p-4">Go to Product Page</Link>
        </p>
      </div>
    </main>
  )
}
