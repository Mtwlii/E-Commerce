import ProductCart from "./_Components/ProductCart/ProductCart";
import { getAllProducts } from "@/services/product.api";

// import Slider from "./_Components/Slider/Slider";
import Slider from "./_Components/Slider/Slider";
import img1 from "@/images/1.png";
import img2 from "@/images/2.png";
import img3 from "@/images/3.png";
// import ShopByCategory from "./_Components/ShopByCategory/ShopByCategory";
import { lazy, Suspense } from "react";

//---------Lazy Loading ------------------
import { FaSpinner } from "react-icons/fa";
import { getMyToken } from "@/utils/getMyToken";

const images = [img1.src, img2.src, img3.src];

//---------Lazy Loading ------------------
const ShopByCategoryAsLazyComp = lazy(
  () => import("./_Components/ShopByCategory/ShopByCategory"),
);

export default async function page() {
  const products = await getAllProducts();

  // getMyToken();

  return (
    <>
      <Slider
        listOfImages={images}
        slidesPerView={1}
        spaceBetween={10}
        showLayer
        className="w-11/12 mx-auto mb-5"
      />

      <Suspense
        fallback={
          <div className=" h-min flex items-center justify-center">
            <FaSpinner className="animate-spin text-6xl" />
          </div>
        }
      >
        <ShopByCategoryAsLazyComp />

      </Suspense>

      <div className="relative pl-4 w-11/12  text-3xl mx-auto">
        <div
          className="absolute left-0 top-0 h-full w-1 rounded-full 
                  bg-gradient-to-b from-[#00C853] to-[#69F0AE]"
        />

        <h2 className="text-2xl font-bold">
          Featured{" "}
          <span
            className="bg-gradient-to-b from-[#00C853] to-[#69F0AE] 
                 bg-clip-text text-transparent text-2xl font-bold"
          >
            Products
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-4 xl:grid-cols-5 countainer w-11/12 mx-auto p-5 gap-5  ">
        {products?.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div> 
    </>
  );
}
