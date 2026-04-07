import { Button } from "@/components/ui/button";
import { getSingleProduct } from "@/services/product.api";
import {
  FaRegHeart,
  FaRegStar,
  FaShareAlt,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";

export default async function Page({ params }: { params: { id: string } }) {
  //  const singleProduct = await getSingleProduct(id);

  const myParams = await params;
  // console.log(myParams);
  const product = await getSingleProduct(myParams.id);
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
      <div className="mb-5 md:h-screen grid grid-cols-1 md:grid-cols-4  items-center  gap-4 w-10/12 mx-auto ">
        <div className="col-span-1  ">
          <img
            className="w-full h-full object-cover "
            src={product?.imageCover}
            alt={product?.title}
          />
        </div>

        <div className="col-span-3 ">
          <div>
            {" "}
            <span className="text-xs bg-[#dcfce7a2] hover:bg-[#dcfce7] text-[#15803d] rounded-2xl p-3 mx-3 cursor-pointer">
              {product?.category.name}
            </span>
            <span className="text-xs  bg-[#f3f4f6] rounded-2xl p-3 mx-3">
              {product?.brand.name}
            </span>
          </div>
          <h1 className="text-3xl font-bold my-3">{product?.title}</h1>
          <div className="flex gap-2 items-center mb-4">
            {" "}
            <StarRating   rating={product?.ratingsAverage} />
            <span className="text-sm text-gray-500 ml-1">
              ({product?.ratingsQuantity})
            </span>
          </div>
          <div className="text-3xl font-bold mb-4">{product?.price} EGP</div>
          {product?.stock === 0 ? (
            <p className="text-sm text-gray-500">Out of stock</p>
          ) : (
            <div className="flex gap-2 items-center mb-4">
              <p className="text-lg text-green-600 flex items-center">
                {" "}
                <TbPointFilled />
                In Stock{" "}
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500">{product?.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center justify-between mt-4">
            <Button className="  md:grid-cols-1 w-full bg-green-600 hover:bg-green-700 cursor-pointer">
              {" "}
              <RiShoppingCart2Fill />
              Add to Cart
            </Button>
            <Button className=" md:grid-cols-1 w-full hover:bg-gray-800 cursor-pointer">
              <MdElectricBolt />
              Buy Now
            </Button>
          </div>
          <div className=" gap-2 grid grid-cols-6 items-center justify-between mt-4">
            <Button className=" col-span-5 bg-white text-black  border border-gray-400 hover:border-green-500 hover:text-green-500 cursor-pointer">
              <FaRegHeart />
              Add to Wishlist
            </Button>
            <Button className=" col-span-1 bg-white text-black  border border-gray-400 hover:border-green-500 hover:text-green-500 cursor-pointer">
              <FaShareAlt />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
