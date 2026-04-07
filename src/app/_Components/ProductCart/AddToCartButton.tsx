"use client";

import React, { useContext } from "react";
import { addProducdToCart } from "./card.actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "@/app/_context/CartContextProvider";

export default function AddToCartButton({ productId }: { productId: string }) {
  const sessionAddToCart = useSession();
  const { setnoumberOfCartItems, setCartProduct, settotalPriceOfCart, setCartId } =
    useContext(CartContext);

  async function handelAddToCart() {
    const res = await addProducdToCart(productId);

    if (res.status == "success") {
      toast.success(res.message);
      setnoumberOfCartItems(res.numOfCartItems);
      setCartProduct(res.data.products)
      settotalPriceOfCart(res.data.totalCartPrice)
      setCartId(res.cartId ?? res.data?._id ?? "");

      console.log(res);
    } else toast.error(res.message);
  }

  return (
    <>
      {sessionAddToCart.status === "authenticated" ? (
        <button
          onClick={handelAddToCart}
          className="bg-emerald-600 text-2xl text-white w-[40] h-[40] rounded-full cursor-pointer"
        >
          +
        </button>
      ) : (
        <Link
          href="/login"
          className="bg-emerald-600 text-2xl text-white w-10 h-10 rounded-full cursor-pointer flex justify-center items-center"
        >
          +
        </Link>
      )}
    </>
  );
}
