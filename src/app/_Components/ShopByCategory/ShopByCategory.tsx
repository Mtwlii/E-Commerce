import React from "react";
import Link from "next/link";
import { getAllCategories } from "@/services/Categories";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function ShopByCategory() {
    const categories = await getAllCategories();
  return (
    <>
      <div className="flex justify-between w-11/12 mx-auto">
        <div className="relative pl-4  text-3xl ">
          <div
            className="absolute left-0 top-0 h-full w-1 rounded-full 
                  bg-gradient-to-b from-[#00C853] to-[#69F0AE]"
          />

          <h2 className="text-2xl font-bold">
            Shop By{" "}
            <span
              className="bg-gradient-to-b from-[#00C853] to-[#69F0AE] 
                 bg-clip-text text-transparent text-2xl font-bold"
            >
              Category
            </span>
          </h2>
        </div>
        <Link
          href={"/categories"}
          className="text-[#00C853] hover:text-[#69F0AE] "
        >
          View All Categories
          <FaArrowRightLong className="inline ms-2" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 w-11/12 mx-auto mb-5">
        {categories?.map((item) => (
          <Link
            href={`/categories/${item.slug}`}
            key={item._id}
            className="border-1 shadow-md rounded-md p-5 m-2 "
          >
            <img
              className="w-20 h-20 rounded-full m-auto "
              src={item.image}
              alt={item.slug}
            />
            <div className="text-center mt-2">{item.name}</div>{" "}
          </Link>
        ))}
      </div>
    </>
  );
}
