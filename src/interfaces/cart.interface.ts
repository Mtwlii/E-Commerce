import { ProductType } from "./Product.interface"

export interface CartResponsType {

    cartId?: string,
    message: string,
    status: string,
    numOfCartItems: number,
    data: DataCartType
}

export interface DataCartType {

    cartOwner: string,
    createdAt: string,
    products: ProductsDataCartType[],
    totalCartPrice: number,
    updatedAt: string,
    __v: number,
    _id: string,
    message: string,
    numOfCartItems: number,
    status: string,
}

export interface ProductsDataCartType {
    count: number,
    price: number,
    product: ProductType,

}