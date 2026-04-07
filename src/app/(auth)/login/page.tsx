import { FaClock, FaFacebook, FaGoogle } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import FromForLogin from "./FormForLogin";
import { Button } from "@/components/ui/button";
import img1 from "@/images/381609d78c4d97f9277837bc4bdf05035b888463.png";
import { TbTruckDelivery } from "react-icons/tb";
import { ImSpinner11 } from "react-icons/im";
import { BiSupport } from "react-icons/bi";

export default function page() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 lg:w-11/12 mx-auto mt-5">
        <div className="hidden md:block  md:col-span-2 lg:col-span-2 flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-10">
          <div className="w-full max-w-sm m-auto mt-10 mb-10">
            <img
              src={img1.src}
              alt="FreshCart"
              className="w-full object-contain rounded rounded-2xl shadow-lg "
            />
          </div>
          <h2 className="text-2xl font-bold text-center mt-4">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-[#16a34a]">
                <TbTruckDelivery />
              </span>{" "}
              Free Delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-[#16a34a]">
                <SiSpringsecurity />
              </span>{" "}
              Secure Payment
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-[#16a34a]">
                <FaClock />
              </span>{" "}
              24/7 Support
            </div>
          </div>
        </div>

        {/* ! Form */}

        <div className="col-span-4 md:col-span-2 sm:w-10/12 sm:mx-auto shadow-lg border rounded-xl p-5 mb-7">
          <div className="text-center">
            <h3 className="mb-2 text-3xl">
              <span className="text-[#16a34a]">Fresh</span>Cart
            </h3>
            <h3 className="mb-2 text-3xl">Welcome Back!</h3>
            <p className="text-lg text-gray-600">
              Sign in to continue your fresh shopping experience
            </p>
            <Button className="w-[90%] mx-auto py-6 bg-transparent cursor-pointer hover:bg-green-200/20 hover:border-green-400/50 text-black text-lg border-2 border-gray-200 mt-5">
              <FaGoogle className="mr-2 text-red-600" />
              Continue with Google
            </Button>
            <Button className="w-[90%] mx-auto py-6 bg-transparent cursor-pointer hover:bg-green-200/20 hover:border-green-400/50 text-black text-lg border-2 border-gray-200 mt-3">
              <FaFacebook className="mr-2 text-blue-600" />
              Continue with Facebook
            </Button>
          </div>
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm whitespace-nowrap">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
          <FromForLogin />
        </div>
      </div>

      {/* ! Features */}

     
    </>
  );
}
