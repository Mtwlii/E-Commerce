"use client";

import { useContext } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import {
  FaHome,
  FaCity,
  FaMapMarkerAlt,
  FaPhone,
  FaLock,
  FaTruck,
  FaUndo,
  FaMoneyBill,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaClipboardList } from "react-icons/fa6";
import { CartContext } from "../_context/CartContextProvider";
import {
  CreateCashOrder,
  CreateOnlineOrder,
} from "../_Components/ProductCart/card.actions";
import { toast } from "sonner";

type CheckoutFormData = {
  details: string;
  city: string;
  street: string;
  phone: string;
  postaCode: string;
  paymentMethod: "cash" | "online";
};

export default function CheckoutPage() {
  const {
    cartProduct,
    totalPriceOfCart,
    noumberOfCartItems,
    cartId,
    setCartProduct,
    settotalPriceOfCart,
    setnoumberOfCartItems,
  } = useContext(CartContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: { paymentMethod: "cash" },
  });

  const subtotal = cartProduct.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const router = useRouter();

  async function onSubmit(data: CheckoutFormData) {
    const payload = {
      shippingAddress: {
        details: data.details,
        phone: data.phone,
        city: data.city,
        postalCode: data.postaCode,
        paymentMethod: data.paymentMethod,
      },
    };

    const res =
      data.paymentMethod === "online"
        ? await CreateOnlineOrder(cartId, payload)
        : await CreateCashOrder(cartId, payload);

    if (res.status == "success") {
      toast.success(res.message);
      if (data.paymentMethod === "online") {
        const redirectUrl =
          res?.session?.url ?? res?.session?.redirectUrl ?? res?.url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
          return;
        }
      }

      setCartProduct([]);
      settotalPriceOfCart(0);
      setnoumberOfCartItems(0);
      router.push("/");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-4">
        Home / Cart /{" "}
        <span className="text-gray-700 font-medium">Checkout</span>
      </p>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 text-white w-11 h-11 rounded-xl flex items-center justify-center text-xl">
            <FaClipboardList />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-gray-800">
              Complete Your Order
            </h1>
            <p className="text-sm text-gray-400">
              Review your items and complete your purchase
            </p>
          </div>
        </div>
        <Link
          href="/cart"
          className="text-green-600 text-sm flex items-center gap-1 hover:underline"
        >
          ← Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
        {/* Left - Form */}
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            {/* Shipping Address */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="bg-green-600 px-5 py-4">
                <h2 className="text-white font-medium flex items-center gap-2">
                  <FaHome /> Shipping Address
                </h2>
                <p className="text-green-200 text-xs mt-1">
                  Where should we deliver your order?
                </p>
              </div>
              <div className="p-5">
                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-3 mb-5">
                  <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    i
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Delivery Information
                    </p>
                    <p className="text-xs text-blue-500">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                  <label className="text-sm text-gray-700 mb-1.5 block">
                    Details <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="details"
                    control={control}
                    rules={{ required: "Details is required" }}
                    render={({ field }) => (
                      <div
                        className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 ${errors.details ? "border-red-400" : "border-gray-200"}`}
                      >
                        {/* <FaCity className="text-gray-400 text-sm" /> */}
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter More Details about your Location"
                          className="w-full outline-none text-sm text-gray-700 bg-transparent"
                        />
                      </div>
                    )}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.details?.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="mb-4">
                  <label className="text-sm text-gray-700 mb-1.5 block">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <div
                        className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 ${errors.city ? "border-red-400" : "border-gray-200"}`}
                      >
                        <FaCity className="text-gray-400 text-sm" />
                        <input
                          {...field}
                          type="text"
                          placeholder="e.g. Cairo, Alexandria, Giza"
                          className="w-full outline-none text-sm text-gray-700 bg-transparent"
                        />
                      </div>
                    )}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Street */}
                <div className="mb-4">
                  <label className="text-sm text-gray-700 mb-1.5 block">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="street"
                    control={control}
                    rules={{ required: "Street address is required" }}
                    render={({ field }) => (
                      <div
                        className={`flex items-start gap-3 border rounded-xl px-4 py-2.5 ${errors.street ? "border-red-400" : "border-gray-200"}`}
                      >
                        <FaMapMarkerAlt className="text-gray-400 text-sm mt-1" />
                        <textarea
                          {...field}
                          placeholder="Street name, building number, floor, apartment..."
                          rows={3}
                          className="w-full outline-none text-sm text-gray-700 bg-transparent resize-none"
                        />
                      </div>
                    )}
                  />
                  {errors.street && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.street.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm text-gray-700 mb-1.5 block">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      pattern: {
                        value: /^01[0125][0-9]{8}$/,
                        message: "Enter a valid Egyptian number",
                      },
                    }}
                    render={({ field }) => (
                      <div
                        className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 ${errors.phone ? "border-red-400" : "border-gray-200"}`}
                      >
                        <FaPhone className="text-gray-400 text-sm" />
                        <input
                          {...field}
                          type="tel"
                          placeholder="01xxxxxxxxx"
                          className="w-full outline-none text-sm text-gray-700 bg-transparent"
                        />
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          Egyptian numbers only
                        </span>
                      </div>
                    )}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* postaCode */}
                <div className="mb-4">
                  <label className="text-sm text-gray-700 mb-1.5 block">
                    Posta Code <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="postaCode"
                    control={control}
                    rules={{ required: "postaCode is required" }}
                    render={({ field }) => (
                      <div
                        className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 ${errors.postaCode ? "border-red-400" : "border-gray-200"}`}
                      >
                        {/* <FaCity className="text-gray-400 text-sm" /> */}
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter  your Posta Code must be 5 char"
                          className="w-full outline-none text-sm text-gray-700 bg-transparent"
                        />
                      </div>
                    )}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.postaCode?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="bg-green-600 px-5 py-4">
                <h2 className="text-white font-medium flex items-center gap-2">
                  <FaCreditCard /> Payment Method
                </h2>
                <p className="text-green-200 text-xs mt-1">
                  Choose how you&apos;d like to pay
                </p>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <>
                      {/* Cash */}
                      <div
                        onClick={() => field.onChange("cash")}
                        className={`flex items-center gap-4 border rounded-xl px-4 py-3.5 cursor-pointer transition-all ${field.value === "cash" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                      >
                        <div className="bg-green-100 text-green-600 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaMoneyBill />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            Cash on Delivery
                          </p>
                          <p className="text-xs text-gray-400">
                            Pay when your order arrives at your doorstep
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${field.value === "cash" ? "border-green-500 bg-green-500" : "border-gray-300"}`}
                        >
                          {field.value === "cash" && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>

                      {/* Online */}
                      <div
                        onClick={() => field.onChange("online")}
                        className={`flex items-center gap-4 border rounded-xl px-4 py-3.5 cursor-pointer transition-all ${field.value === "online" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                      >
                        <div className="bg-gray-100 text-gray-600 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaCreditCard />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            Pay Online
                          </p>
                          <p className="text-xs text-gray-400">
                            Secure payment with Credit/Debit Card via Stripe
                          </p>
                          <div className="flex gap-1 mt-1">
                            <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded">
                              VISA
                            </span>
                            <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded">
                              MC
                            </span>
                            <span className="bg-blue-400 text-white text-[9px] px-1.5 py-0.5 rounded">
                              AMEX
                            </span>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${field.value === "online" ? "border-green-500 bg-green-500" : "border-gray-300"}`}
                        >
                          {field.value === "online" && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                />

                {/* Secure badge */}
                <div className="flex items-center gap-3 border border-green-100 bg-green-50 rounded-xl px-4 py-3">
                  <FaShieldAlt className="text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      Secure & Encrypted
                    </p>
                    <p className="text-xs text-green-500">
                      Your payment info is protected by 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Right - Order Summary */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden sticky top-20">
          <div className="bg-green-600 px-5 py-4">
            <h2 className="text-white font-medium flex items-center gap-2">
              <FaLock className="text-sm" /> Order Summary
            </h2>
            <p className="text-green-200 text-xs mt-1">
              {noumberOfCartItems} items
            </p>
          </div>

          {/* Items */}
          <div className="max-h-56 overflow-y-auto border-b border-gray-100">
            {cartProduct.map((item) => {
              const lineTotal = item.price * item.count;
              return (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-10 h-10 object-contain bg-gray-50 rounded-lg p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {item.count} × {item.price} EGP
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {lineTotal}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Rows */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex justify-between py-1.5">
              <span className="text-sm text-gray-400">Subtotal</span>
              <span className="text-sm font-medium text-gray-800">
                {subtotal.toLocaleString()} EGP
              </span>
            </div>
            <div className="flex justify-between py-1.5 items-center">
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <FaTruck className="text-xs" /> Shipping
              </span>
              <span className="text-sm font-medium text-green-600">FREE</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-baseline px-4 py-3 border-b border-gray-100">
            <span className="text-base font-medium text-gray-800">Total</span>
            <span className="text-xl font-medium text-green-600">
              {totalPriceOfCart.toLocaleString()}{" "}
              <span className="text-xs text-gray-400 font-normal">EGP</span>
            </span>
          </div>

          {/* Place Order - مرتبط بالـ form */}
          <button
            type="submit"
            form="checkout-form"
            className="mx-4 my-3 w-[calc(100%-32px)] bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
          >
            🛍 Place Order
          </button>

          {/* Trust */}
          <div className="flex items-center justify-center gap-3 px-4 pb-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <FaShieldAlt className="text-green-500 text-[10px]" /> Secure
            </span>
            <span className="text-gray-200">|</span>
            <span className="flex items-center gap-1">
              <FaTruck className="text-blue-400 text-[10px]" /> Fast Delivery
            </span>
            <span className="text-gray-200">|</span>
            <span className="flex items-center gap-1">
              <FaUndo className="text-orange-400 text-[10px]" /> Easy Returns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
