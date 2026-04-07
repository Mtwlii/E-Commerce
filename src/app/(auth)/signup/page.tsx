
import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import { TiStarFullOutline } from "react-icons/ti";
import FromForSignup from "./FromForSignup";

export default function page() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 w-11/12 md:10/12  mx-auto mt-5">
        <div className="col-span-2 md:col-span-2">
          <h2 className="text-4xl font-bold  mt-5">
            Welcome to{" "}
            <span className=" text-[#16a34a] text-4xl font-bold">
              FreshCart
            </span>
          </h2>
          <p className="text-lg">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>
          <div className="flex gap-4 mt-5 pt-2">
            <div className="flex items-center justify-center">
              <TiStarFullOutline className="text-5xl text-[#16a34a] bg-[#bbf7d0] p-3 rounded-full " />
            </div>
            <div>
              <h4>Fast Delivery</h4>
              <p>Same-day delivery available in most areas</p>
            </div>
          </div>
          <div className="flex gap-4 mt-5 pt-2">
            <div className="flex items-center justify-center">
              <FaShippingFast className="text-5xl text-[#16a34a] bg-[#bbf7d0] p-3 rounded-full " />
            </div>
            <div>
              <h4>Premium Quality</h4>
              <p>Premium quality products sourced from trusted suppliers.</p>
            </div>
          </div>
          <div className="flex gap-4 mt-5 pt-2 ">
            <div className="flex items-center justify-center">
              <SiSpringsecurity className="text-5xl text-[#16a34a] bg-[#bbf7d0] p-3 rounded-full " />
            </div>
            <div>
              <h4>Secure Shopping</h4>
              <p>Your data and payments are completely secure</p>
            </div>
          </div>
        </div>

        {/* ! Start Form  For Signup */}
        <div className="col-span-2 md:col-span-2 shadow-lg border rounded-xl p-5 mb-7">
          <div className="text-center">
            <h3 className="mb-2 text-3xl">Create Your Account</h3>
            <p className="text-lg">Start your fresh journey with us today</p>
          </div>

          {/*  ! Start Form  For Signup  */}
          <FromForSignup />
        </div>
      </div>
    </>
  );
}
