import React from 'react'
import { BiSupport } from 'react-icons/bi';
import { ImSpinner11 } from 'react-icons/im';
import { SiSpringsecurity } from 'react-icons/si';
import { TbTruckDelivery } from 'react-icons/tb';

export const Features = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-12/12 mx-auto gap-4 mt-6 p-4 bg-[#f0fdf4] ">
        <div className=" flex items-center gap-3">
          <span className="text-[#16a34a] bg-green-100 p-3 rounded-lg">
            <TbTruckDelivery />
          </span>
          <div>
            <h4 className="font-bold text-sm">Free Shipping</h4>
            <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
          </div>
        </div>

        <div className=" flex items-center gap-3">
          <span className="text-[#16a34a] bg-green-100 p-3 rounded-lg">
            <ImSpinner11 className="scale-x-[-1]" />
          </span>
          <div>
            <h4 className="font-bold text-sm">Easy Returns</h4>
            <p className="text-gray-500 text-xs">14-day return policy</p>
          </div>
        </div>

        <div className=" flex items-center gap-3">
          <span className="text-[#16a34a] bg-green-100 p-3 rounded-lg">
            <SiSpringsecurity />
          </span>
          <div>
            <h4 className="font-bold text-sm">Secure Payment</h4>
            <p className="text-gray-500 text-xs">100% secure checkout</p>
          </div>
        </div>
        <div className=" flex items-center gap-3">
          <span className="text-[#16a34a] bg-green-100 p-3 rounded-lg">
            <BiSupport />
          </span>
          <div>
            <h4 className="font-bold text-sm">24/7 Support</h4>
            <p className="text-gray-500 text-xs">Contact us anytime</p>
          </div>
        </div>
      </div>
    </>
  );
}
