"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaCalendar,
  FaBox,
  FaMapMarkerAlt,
  FaPhone,
  FaReceipt,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMoneyBillWave,
  FaCcVisa,
} from "react-icons/fa";
import { getAllOrders } from "../_Components/ProductCart/card.actions";

type OrderItem = {
  product: { title: string; imageCover: string };
  count: number;
  price: number;
};

type Order = {
  id: number;
  status: "Processing" | "Delivered" | "Cancelled";
  paymentMethodType: "cash" | "card";
  createdAt: string;
  cartItems: OrderItem[];
  totalOrderPrice: number;
  shippingAddress: { city: string; details: string; phone: string };
};

type ApiOrder = {
  id: number;
  isDelivered: boolean;
  isPaid: boolean;
  paymentMethodType: "cash" | "card";
  createdAt: string;
  cartItems: OrderItem[];
  totalOrderPrice: number;
  shippingAddress?: { city?: string; details?: string; phone?: string };
};

export default function OrdersPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getAllOrders();
        const mappedOrders: Order[] = (data as ApiOrder[]).map((order) => ({
          id: order.id,
          status: order.isDelivered
            ? "Delivered"
            : order.isPaid
              ? "Processing"
              : "Cancelled",
          paymentMethodType: order.paymentMethodType ?? "cash",
          createdAt: order.createdAt,
          cartItems: order.cartItems ?? [],
          totalOrderPrice: order.totalOrderPrice ?? 0,
          shippingAddress: {
            city: order.shippingAddress?.city ?? "N/A",
            details: order.shippingAddress?.details ?? "No details",
            phone: order.shippingAddress?.phone ?? "N/A",
          },
        }));
        const latestTenOrders = mappedOrders
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 10);

        setOrders(latestTenOrders);
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle className="text-[11px]" />;
      case "Cancelled":
        return <FaTimesCircle className="text-[11px]" />;
      default:
        return <FaClock className="text-[11px]" />;
    }
  }

  function getPaymentIcon(paymentMethodType: "cash" | "card") {
    if (paymentMethodType === "card") {
      return <FaCcVisa className="text-sm text-indigo-600" />;
    }
    return <FaMoneyBillWave className="text-sm text-emerald-600" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-4">
        Home / <span className="text-gray-700 font-medium">My Orders</span>
      </p>

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 text-white w-11 h-11 rounded-xl flex items-center justify-center text-xl">
            <FaShoppingBag />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-gray-800">My Orders</h1>
            <p className="text-sm text-gray-400">
              Track and manage your {orders.length} orders
            </p>
          </div>
        </div>
        <Link
          href="/shop"
          className="text-green-600 text-sm flex items-center gap-1 hover:underline"
        >
          <FaShoppingBag className="text-xs" /> Continue Shopping
        </Link>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="bg-white border border-gray-100 rounded-xl p-6 text-center text-gray-500">
          Loading orders...
        </div>
      ) : (
      <div className="flex flex-col gap-4">
        {orders.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-xl p-6 text-center text-gray-500">
            No orders found yet.
          </div>
        )}
        {orders.map((order) => {
          const firstImg = order.cartItems[0]?.product?.imageCover;
          const extraCount = order.cartItems.length - 1;
          const isExpanded = expandedId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white border border-green-100 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Order Row */}
              <div className="p-4 md:p-5 flex items-center gap-4">
                {/* Image with badge */}
                <div className="relative shrink-0">
                  <img
                    src={firstImg}
                    alt="order"
                    className="w-14 h-14 object-contain bg-gray-50 rounded-lg p-1.5 border border-gray-100"
                  />
                  {extraCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-semibold">
                      +{extraCount}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Status */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full mb-2 ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)} {order.status}
                  </span>

                  {/* Order ID */}
                  <p className="text-lg font-medium text-gray-800 mb-1">
                    <span className="text-gray-400 font-normal"># </span>
                    {order.id}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-[10px]" />
                      {formatDate(order.createdAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaBox className="text-[10px]" />
                      {order.cartItems.length} items
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-[10px]" />
                      {order.shippingAddress?.city}
                    </span>
                  </div>

                  {/* Price */}
                  <p className="text-xl font-medium text-gray-800 mt-2">
                    {order.totalOrderPrice.toLocaleString()}{" "}
                    <span className="text-sm text-gray-400 font-normal">
                      EGP
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center">
                    {getPaymentIcon(order.paymentMethodType)}
                  </div>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="flex items-center gap-1.5 text-xs text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg"
                  >
                    {isExpanded ? "Hide" : "Details"}{" "}
                    {isExpanded ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-green-100 bg-[#f8fafc] px-4 py-4 md:px-5">
                  <p className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
                    <FaBox className="text-green-600 text-xs" /> Order Items
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {order.cartItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-gray-100"
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
                        <span className="text-sm font-medium text-gray-800">
                          {item.count * item.price} EGP
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-3.5">
                      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-[11px] text-blue-500" />
                        Delivery Address
                      </p>
                      <p className="text-sm text-gray-700">{order.shippingAddress.city}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.shippingAddress.details}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                        <FaPhone className="text-[10px]" />
                        {order.shippingAddress.phone}
                      </p>
                    </div>

                    <div className="bg-[#e9f2ff] rounded-xl border border-blue-100 p-3.5">
                      <p className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1.5">
                        <FaReceipt className="text-[11px] text-blue-600" />
                        Order Summary
                      </p>
                      <div className="text-xs text-gray-600 space-y-1.5">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>{order.totalOrderPrice.toLocaleString()} EGP</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between border-t border-blue-200 pt-2 mt-2 text-sm font-semibold text-gray-800">
                          <span>Total</span>
                          <span>{order.totalOrderPrice.toLocaleString()} EGP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}
