"use client";
import getMyCart from "@/cartActions/getMyCart";
import { cartProductsType } from "@/types/cart.type";
import getMyToken from "@/utilities/getMyToken";
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type CartContextType = {
  numOfCartProd: number;
  setNumOfCartProd: Dispatch<SetStateAction<number>>;
  totalCartPrice: number;
  setTotalCartPrice: Dispatch<SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType>({
  numOfCartProd: 0,
  setNumOfCartProd: () => {},
  totalCartPrice: 0,
  setTotalCartPrice: () => {},
});

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numOfCartProd, setNumOfCartProd] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    (async () => {
      const payload = await getMyCart();
      if (payload.status === "success") {
        const totalItems = payload.data.products.reduce(
          (a: number, c: cartProductsType) => a + c.count,
          0
        );
        setNumOfCartProd(totalItems);
        setTotalCartPrice(payload.data.totalCartPrice);
      }
    })();
  }, []);
  return (
    <CartContext.Provider
      value={{
        numOfCartProd,
        setNumOfCartProd,
        totalCartPrice,
        setTotalCartPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
