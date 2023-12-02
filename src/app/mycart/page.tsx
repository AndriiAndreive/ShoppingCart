"use client"
import { ICart } from "@/types/type"
import { useEffect, useState } from "react"
import { useCartItems } from "../../context/CartContext"
import Loading from "@/components/loading";
import { Cart } from "@/components/cart";

export default function Index() {

  const { cartItems, setMyCartItems } = useCartItems();
  const [carts, setMyCarts] = useState<ICart[]>([]);
  const [total, setTotal] = useState<string>("");

  useEffect(() => {
    if(cartItems){
        setMyCarts(cartItems)
        setTotal((cartItems.reduce((sum: number, cart: ICart) => sum + cart.price * cart.quantity, 0)).toFixed(2))
    }
  }, [cartItems]);

  const setQuantity = (productId:number, count: number) => {
    if(productId != undefined){
      cartItems.filter((item:ICart) => item.productId === productId)[0].quantity = count;
      setMyCartItems(cartItems.filter((item:ICart) => item.quantity !== 0));
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mb-32 grid text-center w-full lg:max-w-7xl lg:w-full lg:mb-0 grid-cols-1 lg:text-left bg-white p-10">    
            {carts.length === 0 
            ? <div><p className="text-center leading-[450px]">The cart list was empty</p></div> 
            : carts.map((cart:ICart, index:number) => {
                return cart.quantity !== 0 && <Cart data={cart} key={index} setQuantity={setQuantity} />
            })}
            <div className="flex flex-row gap-4 p-2 m-1">
                <label className="ml-auto">Total Price : $ {total}</label>
            </div>
            {carts.length > 0 && <div className="flex flex-row gap-4 p-2 m-1 items-center text-center">
              <button className={`disabled:opacity-25 disabled:cursor-not-allowed w-full rounded bg-green-600 p-3 text-white hover:bg-green-700`}>Checkout</button>
            </div>}
        </div>
    </main>
  )
}
