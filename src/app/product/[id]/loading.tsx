import React from "react";
import { FaSpinner } from "react-icons/fa";
import { CirclesWithBar } from "react-loader-spinner";

export default function loading() {
  return (
    <>
      <div className="bg-gray-200 h-screen flex items-center justify-center text-6xl">
        {/* <FaSpinner className="animate-spin text-6xl" /> */}
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          outerCircleColor="#4fa94d"
          innerCircleColor="#4fa94d"
          barColor="#4fa94d"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}
