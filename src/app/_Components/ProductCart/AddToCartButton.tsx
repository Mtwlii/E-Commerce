"use client";

import React, { useContext, useState } from "react";
import { addProducdToCart } from "./card.actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "@/app/_context/CartContextProvider";

interface AddToCartButtonProps {
  productId: string;
  label?: React.ReactNode;
  className?: string;
}

export default function AddToCartButton({
  productId,
  label = "+",
  className = "bg-emerald-600 text-2xl text-white w-10 h-10 rounded-full cursor-pointer flex justify-center items-center",
}: AddToCartButtonProps) {
  const sessionAddToCart = useSession();
  const { setnoumberOfCartItems, setCartProduct, settotalPriceOfCart } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handelAddToCart() {
    try {
      setIsLoading(true);
      const res = await addProducdToCart(productId);
      if (res.status == "success") {
        toast.success(res.message);
        setnoumberOfCartItems(res.numOfCartItems);
        setCartProduct(res.data.products);
        settotalPriceOfCart(res.data.totalCartPrice);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  const spinner = (
    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );

  return (
    <>
      {sessionAddToCart.status === "authenticated" ? (
        <button
          onClick={handelAddToCart}
          disabled={isLoading}
          className={className}
        >
          {isLoading ? spinner : label}
        </button>
      ) : (
        <Link href="/login" className={className}>
          {label}
        </Link>
      )}
    </>
  );
}
