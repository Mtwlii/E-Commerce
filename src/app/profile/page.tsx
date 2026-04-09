import { FaMapMarkerAlt, FaCog, FaChevronRight, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function MyAddressesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb + Header */}
      <div className="bg-green-50 px-8 py-7">
        <p className="text-xs text-gray-400 mb-3">
          Home / <span className="text-gray-700 font-medium">My Account</span>
        </p>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center">
            <svg
              className="text-white w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-medium text-gray-800">My Account</h1>
            <p className="text-sm text-gray-400">
              Manage your addresses and account settings
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[200px_1fr] gap-5 px-8 py-6">
        {/* Sidebar */}
        <div className="bg-white border border-gray-100 rounded-xl p-2 flex flex-col gap-1 h-fit">
          <p className="text-xs text-gray-400 font-medium px-3 py-1">
            My Account
          </p>

          <Link
            href="/profile/addresses"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-green-600 text-white text-sm"
          >
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-sm" />
              <span>My Addresses</span>
            </div>
            <FaChevronRight className="text-xs" />
          </Link>

          <Link
            href="/profile/settings"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 text-sm"
          >
            <div className="flex items-center gap-2">
              <FaCog className="text-sm" />
              <span>Settings</span>
            </div>
            <FaChevronRight className="text-xs" />
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                My Addresses
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Manage your saved delivery addresses
              </p>
            </div>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg">
              <FaPlus className="text-xs" />
              Add Address
            </button>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="text-gray-400 text-xl" />
            </div>
            <p className="text-base font-medium text-gray-700 mb-2">
              No Addresses Yet
            </p>
            <p className="text-sm text-gray-400 mb-5 max-w-xs leading-relaxed">
              Add your first delivery address to make checkout faster and
              easier.
            </p>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg">
              <FaPlus className="text-xs" />
              Add Your First Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}