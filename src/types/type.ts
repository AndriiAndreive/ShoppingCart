export interface IProduct {
    id: number;
    title: string;
    image: string;
    category: string;
    description: string;
    price: string;
    rating: IRate;
}

export interface IRate {
    count: number;
    rate: number;
}

export interface ICart {
    productId: number;
    price: number;
    quantity: number;
}