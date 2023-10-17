import { Product } from "./product";

export interface CartProduct {
  _id: string
  product: Product
  count: number
  price: number
}

export interface Cart {
  _id: string
  products: CartProduct[]
  totalCartPrice: number
  createdAt?: string
  cartOwner?: string
  updatedAt?: string
}
