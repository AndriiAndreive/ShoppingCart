"use client"
import { createContext, useContext, ReactNode, useState } from "react";
import { ICart } from "@/types/type";

type cartContextType = {
    cartItems: ICart[];
    setMyCartItems: (cartitems: ICart[]) => void;
};

const cartContextDefaultValues: cartContextType = {
    cartItems: [],
    setMyCartItems: () => {}
};

const CartContext = createContext<cartContextType>(cartContextDefaultValues);

export function useCartItems() {
    return useContext(CartContext);
}

type Props = {
    children: ReactNode;
};

const getMyCartItems = () => {
    try {
        const cartitems = JSON.parse(sessionStorage.getItem('cartitems')!)
        return cartitems ? cartitems : [];
    } catch(e) {
        return [];
    }
}

export function CartProvider({ children }: Props) {

    const [cartItems, setCartItems] = useState<ICart[]>(getMyCartItems());

    const setMyCartItems = (cartitems: ICart[]) => {
        setCartItems(cartitems);
        sessionStorage.setItem('cartitems', JSON.stringify(cartitems));
    };

    const value = {
        cartItems,
        setMyCartItems,
    };

    return (
        <>
            <CartContext.Provider value={value}>
                {children}
            </CartContext.Provider>
        </>
    );
}