"use client"
import { IProduct } from "@/types/type"
import { useEffect, useState } from "react"
import { useCartItems } from "../../context/CartContext"
import Loading from "@/components/loading";
import { Ratings } from "@/components/rating";

export default function Index() {

  const { cartItems, setMyCartItems } = useCartItems();
  const [carts, setMyCarts] = useState<IProduct[]>([]);
  useEffect(() => {
    if(cartItems){
        setMyCarts(cartItems)
    }
  }, [cartItems]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mb-32 grid text-center lg:max-w-7xl lg:w-full lg:mb-0 grid-cols-1 lg:text-left bg-white p-10">    
            {carts.length === 0 ? <Loading full /> : carts.map((cart:IProduct, index:number) => {
                return <div key={index} className={`flex flex-row justify-stretch gap-4 border p-2 m-1`}>
                    <div className="h-[60px]">
                        <img src={cart.image} className="h-full w-[60px]" />
                    </div>
                    <div className="h-[60px] min-w-[50%]">
                        <label className="leading-[36px]">{cart.title}</label>
                        <p>Price : $ {cart.price}</p>
                    </div>
                    <div className="h-[60px] flex items-center">
                        <Ratings rate={cart.rating.rate} />
                    </div>
                    <div className="h-[60px] pt-[15px] mx-auto">
                        <button className="border w-[30px] h-[30px]">-</button>
                        <span className="p-3 leading-[30px]">2</span>
                        <button className="border w-[30px] h-[30px]">+</button>
                    </div>
                    <div className="h-[60px] flex items-center">
                        <label>Sub Total : $ {parseFloat(cart.price) * 2}</label>
                    </div>
                </div>
            })}
            <div className="flex flex-row gap-4 p-2 m-1">
                <label className="ml-auto">Total Price : $ {4278}</label>
            </div>
        </div>
    </main>
  )
}
