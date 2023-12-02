"use client"
import { IProduct } from "@/types/type"
import { useEffect, useState } from "react"
import { useCartItems } from "../../context/CartContext"
import Loading from '@/components/loading'
import { Ratings } from '@/components/rating'
import Link from 'next/link'

export default function Index() {

  const [products, setProducts] = useState<IProduct[]>([])
  const { cartItems, setMyCartItems } = useCartItems();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then(json=>setProducts(json))
  }, [])

  useEffect(() => {
    if (cartItems) {
      // console.log(cartItems)
    }
  }, [cartItems]);

  const addToCart = (e: any, product: IProduct) => {
    e.preventDefault();
    setMyCartItems([...cartItems, {
      productId : product.id,
      price: parseFloat(product.price),
      quantity : 1
    }])
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {products.length == 0 ? <Loading full />
       : <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left md:grid-cols-3 sm:grid-cols-2">
        {products && products.map((product: any, key: number) => {
          const isAdded = cartItems.filter(cartitem => cartitem.productId == product.id).length > 0;
          return (
            <div 
              key={key}
              className="flex flex-col group justify-between rounded-lg border border-transparent bg-white px-5 py-4 transition-colors hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-move m-2"
            >
              <div className='flex flex-row items-center h-full'>
                <Link href={`products/${product.id}`}>
                  <img 
                    src={product.image}
                    className="self-center opacity-70 hover:opacity-100 cursor-pointer"
                  />
                </Link>
              </div>
              <div className='flex flex-col justify-content-center text-center mt-5'>
                <h3>Price: $ {product.price}</h3>
                <div className='text-center'>
                  <Ratings rate={product.rating.rate} />
                </div>
                <button onClick={(e) => addToCart(e, product)} disabled={isAdded} className={`disabled:opacity-25 disabled:cursor-not-allowed w-full rounded bg-green-600 p-3 text-white hover:bg-green-700`}>Add to Cart</button>
              </div>
            </div>
          )})}
      </div>}
    </main>
  )
}
