"use client";

import { useContext, useState } from "react";
import {
  FaShoppingCart,
  FaTruck,
  FaLock,
  FaTag,
  FaTrash,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { CartContext } from "@/app/_context/CartContextProvider";
import {
  clearUserCart,
  deleletItemFromCart,
  updateUserCart,
} from "../_Components/ProductCart/card.actions";
import { toast } from "sonner";
import Link from "next/link";

export default function CartPage() {
  const {
    cartProduct,
    totalPriceOfCart,
    noumberOfCartItems,
    setCartProduct,
    settotalPriceOfCart,
    setnoumberOfCartItems,
  } = useContext(CartContext);

  const [confirmId, setConfirmId] = useState<number | null>(null);

  const [confirmClear, setConfirmClear] = useState(false);

  const products = cartProduct ?? [];

  const itemCount =
    typeof noumberOfCartItems === "number" && !Number.isNaN(noumberOfCartItems)
      ? noumberOfCartItems
      : products.length;

  async function handeUpdateProduct(id: string, count: number) {
    const res = await updateUserCart(id, count);
    //   console.log(res)
    if (res.status == "success") {
      setCartProduct(res.data.products);
      settotalPriceOfCart(res.data.totalCartPrice);
      setnoumberOfCartItems(res.numOfCartItems);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  async function handeDeleteProduct(id: string) {
    const res = await deleletItemFromCart(id);
    // console.log(res)
    setCartProduct(res.data.products);
    settotalPriceOfCart(res.data.totalCartPrice);
    setnoumberOfCartItems(res.numOfCartItems);
    toast.success(res.message);
  }
  async function handeClearCart(id: string) {
    const res = await clearUserCart();
    // console.log(res)
    setCartProduct(res.data.products);
    settotalPriceOfCart(res.data.totalCartPrice);
    setnoumberOfCartItems(res.numOfCartItems);
    toast.success(res.message);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-4">
        Home / <span className="text-gray-700 font-medium ">Shopping Cart</span>
      </p>

      {/* Title */}
      <div className="flex items-center gap-3 mb-1">
        <div className="bg-green-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg">
          <FaShoppingCart />
        </div>
        <h1 className="text-2xl font-medium text-gray-800">Shopping Cart</h1>
      </div>
      <p className="text-sm text-gray-400 mb-6">
        You have{" "}
        <span className="text-green-600 font-medium">{itemCount} items</span> in
        your cart
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
        {/* Cart Items */}
        <div className="flex flex-col gap-4">
          {products.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-gray-500">
              <p className="mb-4">Your cart is empty.</p>
              <Link
                href="/"
                className="text-green-600 font-medium hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            products.map((item) => {
              const p = item.product;
              const lineTotal = item.price * item.count;
              return (
                <div
                  key={`${p.id}-${item.price}`}
                  className="bg-white border border-gray-100 rounded-xl p-4 grid grid-cols-[80px_1fr] gap-4"
                >
                  {/* Image */}
                  <div className="bg-gray-50 rounded-lg h-24 flex items-center justify-center relative">
                    <img
                      src={p.imageCover}
                      alt={p.title}
                      className="w-16 h-16 object-contain"
                    />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap">
                      <FaCheck className="text-[8px]" /> In Stock
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 mb-1">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-50 text-green-700 text-[11px] px-2 py-0.5 rounded-full">
                        {p.category?.name ?? "—"}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        · ID: {p.id}
                      </span>
                    </div>
                    <p className="text-green-600 text-sm font-medium">
                      {item.price} EGP{" "}
                      <span className="text-gray-400 font-normal text-xs">
                        per unit
                      </span>
                    </p>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Qty */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handeUpdateProduct(item.product.id, item.count - 1)
                          }
                          type="button"
                          className="w-7 h-7 border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            handeUpdateProduct(item.product.id, item.count + 1)
                          }
                          type="button"
                          className="w-7 h-7 bg-green-600 text-white rounded-md flex items-center justify-center hover:bg-green-700"
                        >
                          +
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right">
                        <p className="text-[11px] text-gray-400">Total</p>
                        <p className="text-lg font-medium text-gray-800">
                          {lineTotal}{" "}
                          <span className="text-xs text-gray-400 font-normal">
                            EGP
                          </span>
                        </p>
                      </div>

                      {/* Delete */}
                      {confirmId === item.product.id ? (
                        // Confirmation
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Sure?</span>
                          <button
                            onClick={() => {
                              handeDeleteProduct(item.product.id);
                              setConfirmId(null);
                            }}
                            className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-200"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(item.product.id)}
                          type="button"
                          className="w-8 h-8 bg-red-50 border border-red-200 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div className="flex justify-between px-5 ">
            <div className="pb-4">
              <Link href="/" className="text-sm text-green-600 hover:underline">
                ← Continue Shopping
              </Link>
            </div>
            {confirmClear ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sure?</span>
                <button
                  onClick={() => {
                    handeClearCart();
                    setConfirmClear(false);
                  }}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-200"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500"
              >
                <FaTrash className="text-xs" /> Clear all items
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden sticky top-20">
          {/* Header */}
          <div className="bg-green-600 px-5 py-4">
            <h2 className="text-white font-medium flex items-center gap-2">
              <FaLock className="text-sm" /> Order Summary
            </h2>
            <p className="text-green-200 text-xs mt-1">
              {itemCount} items in your cart
            </p>
          </div>

          {/* Free Shipping */}
          <div className="mx-4 mt-4 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-3">
            <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <FaTruck className="text-sm" />
            </div>
            <div>
              {totalPriceOfCart >= 500 ? (
                <p className="text-sm font-medium text-green-700">
                  Great You qualify for free delivery
                </p>
              ) : (
                <p className="text-sm font-medium text-green-700">
                  Free Shipping After 500 EGP!
                </p>
              )}
            </div>
          </div>

          {/* Rows */}
          <div className="px-4 mt-4 border-t border-gray-100">
            <div className="flex justify-between py-3 border-b border-dashed border-gray-100">
              <span className="text-sm text-gray-400">Subtotal</span>
              <span className="text-sm font-medium text-gray-800">
                {totalPriceOfCart ?? 0} EGP
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-sm text-gray-400">Shipping</span>
              {totalPriceOfCart > 500 ? (
                <span className="text-sm font-medium text-green-600">FREE</span>
              ) : (
                <span>50 EGP</span>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-baseline px-4 py-3 border-t border-gray-100">
            <span className="text-base font-medium text-gray-800">Total</span>
            <span className="text-xl font-medium text-gray-800">
              {totalPriceOfCart ?? 0}
              <span className="text-xs text-gray-400 font-normal"> EGP</span>
            </span>
          </div>

          {/* Promo */}
          <div className="mx-4 mb-3 border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
            <FaTag className="text-gray-400 text-sm" />
            <span className="text-sm text-gray-400">Apply Promo Code</span>
          </div>

          {/* Checkout */}
          <Link
            href={"/checkout"}
            type="button"
            className="mx-4 mb-3 w-[calc(100%-32px)] bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
          >
            <FaLock className="text-xs" /> Secure Checkout
          </Link>

          {/* Trust */}
          <div className="flex items-center justify-center gap-4 px-4 pb-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <FaLock className="text-[10px]" /> Secure Payment
            </span>
            <span className="text-gray-200">|</span>
            <span className="flex items-center gap-1">
              <FaTruck className="text-[10px]" /> Fast Delivery
            </span>
          </div>

          {/* Continue */}
          <div className="flex justify-center pb-4">
            <Link href="/" className="text-sm text-green-600 hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
