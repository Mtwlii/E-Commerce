import React from "react";
import { FaSpinner } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";

export default function loading() {
  return (
    <>
      <div className="bg-gray-200 h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-6xl" />
        {/* <InfinitySpin
width="200"
color="#4fa94d"

/> */}
      </div>
    </>
  );
}
