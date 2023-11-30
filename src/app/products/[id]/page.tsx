"use client"
import Image from 'next/image'
import { IProduct } from "@/types/type"
import { useEffect, useState } from "react"
import Loading from '@/components/loading'
import { Ratings } from '@/components/rating'
import { useCartItems } from '@/context/CartContext'

export default function Index({ params }: { params: { id: number } }) {

  const [product, setProduct] = useState<IProduct | null>(null)
  const { cartItems, setMyCartItems } = useCartItems();

  useEffect(() => {
    if(params.id){
        fetch(`https://fakestoreapi.com/products/${params.id}`)
          .then(res=>res.json())
          .then(json=>setProduct(json))
    }
  }, [params.id])

  const addToCart = (e: any, product: IProduct) => {
    e.preventDefault();
    setMyCartItems([...cartItems, product])
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {product && 
        <div className='w-full bg-white md:p-10 grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div
              className="flex flex-col group justify-between rounded-lg border border-transparent bg-white px-5 py-4 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-move m-2"
            >
                <img src={product.image} className='opacity-70 hover:opacity-100' />
            </div>
            <div
              className="flex flex-col group md:col-span-2 justify-between rounded-lg border border-transparent bg-white px-5 py-4 transition-colors hover:dark:bg-neutral-800/30 m-2"
            >
                <div>
                    <h1><label className='text-green-700 font-bold'>Title</label> : {product.title}</h1>
                </div>
                <div>
                    <h1><label className='text-green-700 font-bold'>Category</label> : {product.category}</h1>
                </div>
                <div>
                    <label className='text-green-700 font-bold'>Description : </label>
                    <p className='text-sm'>{product.description}</p>
                </div>
                <div>
                    <label className='text-green-700 font-bold'>Price : $ {product.price}</label>
                </div>
                <div>
                    <label className='text-green-700 font-bold'>Rated Count : {product.rating.count}</label>
                </div>
                <div>
                    <Ratings rate={product.rating.rate} /> 
                    <button onClick={(e) => addToCart(e, product)} disabled={cartItems.filter(cartitem => cartitem.id == product.id).length > 0} className='disabled:opacity-25 disabled:cursor-not-allowed w-full rounded bg-green-600 p-3 text-white hover:bg-green-700 mt-5'>Add to Cart</button>
                </div>
            </div>
        </div>}
    </main>
  )
}
