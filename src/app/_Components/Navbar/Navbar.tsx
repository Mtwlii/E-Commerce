"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/images/freshcart-logo.49f1b44d.svg fill.png";
import { FaRegHeart, FaRegIdCard, FaSearch } from "react-icons/fa";
import {
  FaCartShopping,
  FaBars,
  FaXmark,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CartContext } from "@/app/_context/CartContextProvider";
export default function Navbar() {
  const { data: session } = useSession();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function handleLogOut() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  const { noumberOfCartItems } = React.useContext(CartContext);
  
  const cartItemCount =
    typeof noumberOfCartItems === "number" &&
    !Number.isNaN(noumberOfCartItems)
      ? noumberOfCartItems
      : 0;

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
      <NavigationMenu className="hidden md:flex sticky top-0 z-50 max-w-screen py-3 px-5 justify-between items-center bg-white border-b">
        <Link href="/">
          <Image src={logoImage} alt="logo" />
        </Link>

        <div className="w-1/2 relative flex items-center">
          <input
            type="text"
            className="border rounded-full px-4 py-2 w-full pr-12"
            placeholder="Search for products, brands and more..."
          />
          <Button className="absolute right-2 bg-green-600 hover:bg-green-700 text-white rounded-full p-2">
            <FaSearch />
          </Button>
        </div>

        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link className="bg-transparent hover:bg-transparent" href="/">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                className="bg-transparent hover:bg-transparent"
                href="/shop"
              >
                Shop
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                className="bg-transparent hover:bg-transparent"
                href="/brands"
              >
                Brands
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                className="bg-transparent hover:bg-transparent !flex-row gap-2 items-center"
                href="/support"
              >
                <MdSupportAgent className="text-xl" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] text-gray-500 font-normal">
                    Support
                  </span>
                  <span className="text-[10px] text-gray-700 font-semibold">
                    24/7 Help
                  </span>
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                className="bg-transparent hover:bg-transparent"
                href="/wishlist"
              >
                <FaRegHeart />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link
                className="bg-transparent hover:bg-transparent relative"
                href="/cart"
              >
                {cartItemCount === 0 ? null : (
                  <span className="absolute right-0 top-0 flex justify-center items-center h-4 w-4 bg-green-600 text-white text-xs font-bold p-1 rounded-full">
                    {" "}
                    {cartItemCount}
                  </span>
                )}

                <FaCartShopping />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {session ? (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  className="bg-transparent hover:bg-transparent"
                  href="/profile"
                >
                  <FaUser className="text-green-700" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    className="bg-green-700 hover:bg-green-800! text-white p-1 ms-2"
                    href="/signup"
                  >
                    Signup
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    className="bg-green-700 hover:bg-green-800! text-white p-1 ms-2"
                    href="/login"
                  >
                    Login
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {/* ===== MOBILE NAVBAR ===== */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <Image src={logoImage} alt="logo" width={120} />
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/wishlist" className="text-gray-600 text-xl">
            <FaRegHeart />
          </Link>
          <Link href="/cart" className="text-gray-600 text-xl relative">
            {cartItemCount === 0 ? null : (
              <span className="absolute right-[-8] top-[-8] flex justify-center items-center h-4 w-4 bg-green-600 text-white text-xs font-bold p-1 rounded-full">
                {" "}
                {cartItemCount}
              </span>
            )}
            <FaCartShopping />
          </Link>
          <Button
            onClick={() => setDrawerOpen(true)}
            className="bg-green-700 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg"
          >
            <FaBars />
          </Button>
        </div>
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col transition-transform duration-300 md:hidden ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <Link href="/" onClick={() => setDrawerOpen(false)}>
            <Image src={logoImage} alt="logo" width={120} />
          </Link>
          <Button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-500 text-2xl"
          >
            <FaXmark />
          </Button>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b">
          <div className="relative flex items-center">
            <input
              type="text"
              className="border rounded-full px-4 py-2 w-full pr-10 text-sm"
              placeholder="Search products..."
            />
            <Button className="absolute right-2 bg-green-600 text-white rounded-full p-1.5">
              <FaSearch className="text-xs" />
            </Button>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col px-5 py-2 border-b">
          {["Home", "Shop", "Categories", "Brands"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="py-3 text-gray-700 font-medium border-b last:border-0 hover:text-green-700"
              onClick={() => setDrawerOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Wishlist & Cart */}
        <div className="flex flex-col px-5 py-2 border-b">
          <Link
            href="/wishlist"
            className="flex items-center gap-3 py-3 text-gray-700 hover:text-green-700"
            onClick={() => setDrawerOpen(false)}
          >
            <span className="bg-red-100 text-red-500 rounded-full p-2 relative">
              <span className="absolute right-0 top-0 flex justify-center items-center h-4 w-4 bg-green-600 text-white text-xs font-bold p-1 rounded-full">
                {" "}
                {cartItemCount}
              </span>
              <FaRegHeart />
            </span>
            Wishlist
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-3 py-3 text-gray-700 hover:text-green-700"
            onClick={() => setDrawerOpen(false)}
          >
            <span className="bg-green-100 text-green-600 rounded-full p-2">
              <FaCartShopping />
            </span>
            Cart
          </Link>
        </div>

        {/* User Section */}
        <div className="flex flex-col px-5 py-2 border-b">
          {session ? (
            <>
              <div className="flex items-center gap-3 py-3 text-gray-700">
                <span className="bg-gray-100 text-gray-500 rounded-full p-2">
                  <FaUser />
                </span>
                {session.user?.name}
              </div>
              <Button
                onClick={handleLogOut}
                className="flex items-center gap-3 py-3 text-red-500 hover:text-red-700"
              >
                <span className="bg-red-100 text-red-500 rounded-full p-2">
                  <FaSignOutAlt />
                </span>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="py-3 text-center bg-green-700 text-white rounded-lg mb-2 hover:bg-green-800"
                onClick={() => setDrawerOpen(false)}
              >
                Signup
              </Link>
              <Link
                href="/login"
                className="py-3 text-center border border-green-700 text-green-700 rounded-lg hover:bg-green-50"
                onClick={() => setDrawerOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Need Help */}
        <div className="mx-5 mt-3 bg-green-50 rounded-xl p-4 flex items-center gap-3">
          <span className="bg-green-100 text-green-700 rounded-full p-2 text-xl">
            <MdSupportAgent />
          </span>
          <div>
            <p className="font-semibold text-gray-800 text-sm">Need Help?</p>
            <Link
              href="/support"
              className="text-green-600 text-sm hover:underline"
              onClick={() => setDrawerOpen(false)}
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm p-3">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
