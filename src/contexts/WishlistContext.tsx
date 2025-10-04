"use client";
import { ProductType } from "@/types/product.type";
import getMyToken from "@/utilities/getMyToken";
import getMyWishlist from "@/wishlistActions/getMyWishlist";
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
type WishlistContextType = {
  numOfWishlistProd: number;
  setNumOfWishlistProd: Dispatch<SetStateAction<number>>;
  wishlistProducts: ProductType[];
  setWishlistProducts: Dispatch<SetStateAction<ProductType[]>>;
};
export const WishlistContext = createContext<WishlistContextType>({
  numOfWishlistProd: 0,
  setNumOfWishlistProd: () => {},
  wishlistProducts:[],
  setWishlistProducts :() => {},
});
type WishlistContextProviderProps = {
  children: ReactNode;
};
export default function WishlistContextProvider({
  children,
}: WishlistContextProviderProps) {
  const [numOfWishlistProd, setNumOfWishlistProd] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    (async () => {
      const payload = await getMyWishlist()
      setNumOfWishlistProd(payload.count);
      setWishlistProducts(payload.data);
    })();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ numOfWishlistProd, setNumOfWishlistProd , wishlistProducts ,setWishlistProducts }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
