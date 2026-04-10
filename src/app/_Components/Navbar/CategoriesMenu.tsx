"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { CategoryType } from "@/interfaces/Product.interface";
export default function CategoriesMenu({ categories }: { categories: CategoryType[] }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-56 p-2">
          <li>
            <Link
              href="/categories"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg"
            >
              All Categories
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat._id}>
              <Link
                href={`/categories/${cat.slug}`}
                className="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
