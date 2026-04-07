"use server";

import { getMyToken } from "@/utils/getMyToken";
import { CartResponsType } from "@/interfaces/cart.interface";
import { shippingAddressType } from "@/interfaces/order.interface";


export async function addProducdToCart(id: string): Promise<CartResponsType> {
    console.log("added to Card")
    const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "POST",
        body: JSON.stringify({ productId: id }),
        headers: {
            "Content-Type": "application/json",

            token: token as string
        }



    })
    const finalRespons = await res.json()
    // console.log("final ResponsFrom Card Action", finalRespons)
    return finalRespons
}


export async function getUserCart(): Promise<CartResponsType> {


    const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "GET",

        headers: {
            // "Content-Type": "application/json",

            token: token as string
        }



    })
    const finalRespons = await res.json()
    // console.log("final ResponsFrom Card Action", finalRespons)
    return finalRespons
}


export async function deleletItemFromCart(productId: string): Promise<CartResponsType> {


    const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "DELETE",

        headers: {
            // "Content-Type": "application/json",

            token: token as string
        }



    })
    const finalRespons = await res.json()
    // console.log("final ResponsFrom Card Action", finalRespons)
    return finalRespons
}
export async function clearUserCart(): Promise<CartResponsType> {


    const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "DELETE",

        headers: {
            // "Content-Type": "application/json",

            token: token as string
        }



    })
    const finalRespons = await res.json()
    // console.log("final ResponsFrom Card Action", finalRespons)
    return finalRespons
}



export async function updateUserCart(productId: string, count: number): Promise<CartResponsType> {


    const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",

            token: token as string
        },

        body: JSON.stringify({ count })

    })
    const finalRespons = await res.json()
    // console.log("final ResponsFrom Card Action", finalRespons)
    return finalRespons
}



export async function CreateCashOrder(cardId: string, shippingAddress: shippingAddressType) {

    const token = await getMyToken();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cardId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

            token: token as string
        },
        body:JSON.stringify(shippingAddress)

    })
    const finalRespons = await res.json()

    return finalRespons

}
export async function CreateOnlineOrder(cardId: string, shippingAddress: shippingAddressType) {

    const token = await getMyToken();
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ??
        process.env.NEXTAUTH_URL ??
        "http://localhost:3000";

    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${encodeURIComponent(baseUrl)}`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

            token: token as string
        },
        body:JSON.stringify(shippingAddress)

        }
    )
    const finalRespons = await res.json()

    return finalRespons

}

export async function getAllOrders() {
    const token = await getMyToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/", {
        method: "GET",
        headers: {
            token: token as string,
        },
        cache: "no-store",
    });

    const finalRespons = await res.json();
    return finalRespons?.data ?? [];
}