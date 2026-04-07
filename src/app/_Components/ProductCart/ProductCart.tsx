import { ProductType } from "@/interfaces/Product.interface";
import Link from "next/link";
import React from "react";
import { BiShowAlt } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import AddToCartButton from "./AddToCartButton";


interface ProductCardPropsType {
    product:ProductType
    
}
export default function ProductCart({ product }: ProductCardPropsType) {
    const priceAfterDiscount = product.priceAfterDiscount ?? product.price;

    const hasDiscount =
      priceAfterDiscount < product.price;

    const calculatedDiscountPercentage = hasDiscount
      ? Math.round(((product.price - priceAfterDiscount) / product.price) * 100)
      : 0;


    // Stars Function

      function StarRating({ rating }: { rating: number }) {
        return (
          <span className="flex gap-2 items-center ">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400">
                {star <= rating ? (
                  <FaStar />
                ) : star - 0.5 <= rating ? (
                  <FaStarHalf />
                ) : (
                  <FaRegStar />
                )}
              </span>
            ))}
            <span className="text-sm text-gray-500 ml-1">{rating}</span>
          </span>
        );
      }




  return (
    <>
      <div
        key={product.id}
        className=" border border-gray-200 rounded-md px-3 pb-3 relative transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-lg "
      >
        <div className="absolute right-2 top-4 ">
          <div className=" shadow-md cursor-pointer w-[32] h-[32] flex items-center justify-center bg-white rounded-full">
            <CiHeart />
          </div>{" "}
          <div className="font-bold shadow-md cursor-pointer w-[32] h-[32] flex items-center justify-center mt-4 bg-white rounded-full">
            {" "}
            <TfiReload />
          </div>{" "}
          <Link
            href={`/product/${product.id}`}
            className=" shadow-md cursor-pointer mt-4 w-[32] h-[32] flex items-center justify-center bg-white rounded-full"
          >
            {" "}
            <BiShowAlt />
          </Link>{" "}
        </div>
        <div className="absolute left-2 top-2">
          {hasDiscount && (
            <div className="bg-red-600 text-white text-xs font-medium py-0.5 px-2 rounded-sm shadow-md">
              -{calculatedDiscountPercentage}%
            </div>
          )}
        </div>
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full px-7"
        />
        <p className="text-xs text-gray-500 mt-4">{product.category.name}</p>
        <h3 className="font-semibold line-clamp-1">{product.title}</h3>
        {/* line-clamp-1 == .split(" ",4).join(" ") هنا بقص عن طريق المسافه و بعدين بحدد الليمت اللي هو 2 و بعدين بحطهم علي بعض و بسيب بينهم مسافه */}
        <div className="flex gap-2 mt-2  items-center">
          <div>
            {" "}
            <StarRating rating={product.ratingsAverage} />
          </div>
          <p className="text-sm text-muted-foreground">
            ({product.ratingsQuantity})
          </p>
        </div>

        <div className="mt-2 flex justify-between items-center">
          {hasDiscount ? (
            <div className="grid grid-cols-2 items-center gap-2 mb-2">
              <p className="text-lg font-semibold text-green-600">
                {priceAfterDiscount} EGP
              </p>
              <p className="text-sm line-through text-muted-foreground">
                {product.price} EGP
              </p>
            </div>
          ) : (
            <h4>{product.price} EGP</h4>
          )}

          <AddToCartButton productId={String(product.id)} />
        </div>
      </div>
    </>
  );
}
