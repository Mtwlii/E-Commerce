"use client";

import { signOut, useSession } from "next-auth/react";
import {
  FaPhone,
  FaEnvelope,
  FaTruck,
  FaStar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <div className="hidden md:flex bg-gray-100 border-b text-sm py-2 px-5 justify-between items-center">
      {/* Left side */}
      <div className="flex items-center gap-5 text-gray-600">
        <span className="flex items-center gap-1">
          <FaTruck className="text-green-600" />
          Free Shipping on Orders 500 EGP
        </span>
        <span className="flex items-center gap-1">
          <FaStar className="text-green-600" />
          New Arrivals Daily
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5 text-gray-600">
        <span className="flex items-center gap-1">
          <FaPhone className="text-green-600" />
          +1 (800) 123-4567
        </span>
        <span className="flex items-center gap-1">
          <FaEnvelope className="text-green-600" />
          support@freshcart.com
        </span>

        {session ? (
          <>
            <span className="flex items-center gap-1 font-medium text-gray-700">
              <FaUser />
              {session.user?.name}
            </span>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
              className="flex items-center gap-1 text-green-700 hover:text-green-900 font-medium"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-green-700 hover:text-green-900 font-medium"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
