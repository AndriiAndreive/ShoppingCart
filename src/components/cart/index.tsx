import React, { useEffect, useState } from 'react';
import { Ratings } from '../rating';
import { ICart, IProduct } from '@/types/type';

export function Cart({ data, setQuantity }: { data: ICart, setQuantity: Function }) {

    const [count, setCount] = useState<number>(1);
    const [product, setProduct] = useState<IProduct>();

    const increase = () => {
        setCount(count + 1);
    }

    const decrease = () => {
        if(count !== 0){
            setCount(count - 1);
        }
    }

    useEffect(() => {
        setCount(data.quantity)
        fetch('https://fakestoreapi.com/products/' + data.productId)
            .then(res=>res.json())
            .then(json=>setProduct(json))
    }, [data])

    useEffect(() => {
        setQuantity(product?.id, count);
    }, [count])

    return (
        product && <div className={`flex flex-row justify-stretch gap-4 border p-2 m-1`}>
            <div className="h-[60px]">
                <img src={product.image} className="h-full w-[60px] cursor-pointer" title={product.title} />
            </div>
            <div className="h-[60px] min-w-[50%] max-w-[50%] truncate">
                <label className="leading-[36px]">{product.title}</label>
                <p>Price : $ {product.price}</p>
            </div>
            <div className="h-[60px] flex items-center">
                <Ratings rate={product.rating.rate} />
            </div>
            <div className="h-[60px] pt-[15px] mx-auto">
                <button className="border w-[30px] h-[30px]" onClick={decrease}>-</button>
                <span className="p-3 leading-[30px]">{count}</span>
                <button className="border w-[30px] h-[30px]" onClick={increase}>+</button>
            </div>
            <div className="h-[60px] flex items-center">
                <label>Sub Total : $ {(parseFloat(product.price) * count).toFixed(2)}</label>
            </div>
        </div>
    );
}
