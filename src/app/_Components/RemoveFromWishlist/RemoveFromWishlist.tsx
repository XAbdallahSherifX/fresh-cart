"use client";
import { WishlistContext } from "@/contexts/WishlistContext";
import { cartProductsType } from "@/types/cart.type";
import removeFromWishlist from "@/wishlistActions/removeFromWishlist";
import { Heart, LoaderCircle, Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
export default function RemoveFromWishlist({
  productId,
  design,
}: {
  productId: string;
  design: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setNumOfWishlistProd, setWishlistProducts } =
    useContext(WishlistContext);
  async function remove(id: string) {
    setIsLoading(true);
    const res = await removeFromWishlist(`${id}`);
    if (res.status === "success") {
      toast.success("Product is removed successfully from your wishlist!🥲", {
        position: "top-center",
        duration: 3000,
        style: {
          backgroundImage:
            "linear-gradient(23deg,rgba(0, 188, 125, 1) 0%, rgba(77, 191, 109, 1) 50%, rgba(0, 188, 125, 1) 100%)",
          color: "white",
          fontSize: "16px",
        },
      });
      setNumOfWishlistProd(res.data.length);
      setWishlistProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
      );
    } else {
      toast.error(`Can't remove this product now!`, {
        position: "top-center",
        duration: 3000,
        style: {
          backgroundImage:
            "linear-gradient(23deg, rgba(220, 38, 38, 1) 0%, rgba(239, 68, 68, 1) 50%, rgba(220, 38, 38, 1) 100%)",
          color: "white",
          fontSize: "16px",
        },
      });
    }
    setIsLoading(false);
  }
  return (
    <button
      onClick={() => remove(productId)}
      disabled={isLoading}
      className={design}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin w-full h-full" />
      ) : (
        <>
          <Heart
            className="hover:text-black hover:bg-transparent hover:fill-transparent
          w-full h-full bg-emerald-100 cursor-pointer border-2 rounded-full p-1 fill-emerald-500 text-emerald-500 duration-300"
          />
        </>
      )}
    </button>
  );
}
