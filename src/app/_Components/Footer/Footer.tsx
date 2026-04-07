import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { PiShoppingCartFill } from "react-icons/pi";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-12 pb-6 ">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* اللوجو والمعلومات */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 bg-[#1e293b] px-4 py-2 rounded-lg w-fit mb-4">
            <PiShoppingCartFill className="text-[#16a34a] text-2xl" />
            <span className="text-white font-bold text-xl">FreshCart</span>
          </div>
          <p className="text-sm text-gray-400 mb-5">
            FreshCart is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices with a seamless shopping experience.
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
              <MdPhone className="text-[#16a34a]" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail className="text-[#16a34a]" />
              <span>support@freshcart.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MdLocationOn className="text-[#16a34a]" />
              <span>123 Commerce Street, New York, NY 10001</span>
            </div>
          </div>
          {/* السوشيال ميديا */}
          <div className="flex gap-3 mt-5">
            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <div
                key={i}
                className="bg-[#1e293b] p-2 rounded-full cursor-pointer hover:bg-[#16a34a] transition"
              >
                <Icon className="text-gray-300 text-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-bold mb-4">Shop</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            {[
              "All Products",
              "Categories",
              "Brands",
              "Electronics",
              "Men's Fashion",
              "Women's Fashion",
            ].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[#16a34a] transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-white font-bold mb-4">Account</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            {[
              "My Account",
              "Order History",
              "Wishlist",
              "Shopping Cart",
              "Sign In",
              "Create Account",
            ].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[#16a34a] transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            {[
              "Contact Us",
              "Help Center",
              "Shipping Info",
              "Returns & Refunds",
              "Track Order",
            ].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[#16a34a] transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-[#16a34a] transition">
                    {item}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-11/12 mx-auto flex items-center justify-between mt-10 pt-5 border-t border-gray-700 text-sm text-gray-500">
        <span>© 2026 FreshCart. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <SiVisa className="text-2xl" />
          <SiMastercard className="text-2xl" />
          <SiPaypal className="text-2xl" />
        </div>
      </div>
    </footer>
  );
}
