"use client";

import React, { createContext, ReactNode, useState } from "react";
import {
  CartResponsType,
  ProductsDataCartType,
} from "@/interfaces/cart.interface";

type CartContextType = {
  cartId: string;
  setCartId: React.Dispatch<React.SetStateAction<string>>;
  noumberOfCartItems: number;
  setnoumberOfCartItems: React.Dispatch<React.SetStateAction<number>>;
  totalPriceOfCart: number;
  settotalPriceOfCart: React.Dispatch<React.SetStateAction<number>>;
  cartProduct: ProductsDataCartType[];
  setCartProduct: React.Dispatch<React.SetStateAction<ProductsDataCartType[]>>;
};

export const CartContext = createContext<CartContextType>({
  cartId: "",
  setCartId: () => {},
  noumberOfCartItems: 0,
  setnoumberOfCartItems: () => {},
  totalPriceOfCart: 0,
  settotalPriceOfCart: () => {},
  cartProduct: [],
  setCartProduct: () => {},
});

export const CartContextProvider = ({
  children,
  userCart,
}: {
  children: ReactNode;
  userCart: CartResponsType;
}) => {
  // async function getDataFromAPI() {
  //     const userCart = await getUserCart()
  //     setnoumberOfCartItems(userCart.numOfCartItems)
  // }

  // useEffect(() => {
  //     getDataFromAPI()
  // },[])

  //   const [cartData, setcartData] = useState(userCart.data)
  const [cartId, setCartId] = useState(userCart.cartId);

  const [noumberOfCartItems, setnoumberOfCartItems] = useState(
    userCart.numOfCartItems ?? 0,
  );

  const [totalPriceOfCart, settotalPriceOfCart] = useState(
    userCart.data?.totalCartPrice ?? 0,
  );

  const [cartProduct, setCartProduct] = useState<ProductsDataCartType[]>(
    userCart.data?.products ?? [],
  );
  return (
    <CartContext.Provider
      value={{
        noumberOfCartItems,
        setnoumberOfCartItems,
        totalPriceOfCart,
        settotalPriceOfCart,
        cartProduct,
        setCartProduct,
        cartId,
        setCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
