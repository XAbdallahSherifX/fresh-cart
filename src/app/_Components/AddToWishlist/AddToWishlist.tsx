"use client";
import addToWishlist from "@/wishlistActions/addToWishlist";
import { Heart, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { WishlistContext } from "@/contexts/WishlistContext";
import { ProductType } from "@/types/product.type";
export default function AddToWishlist ({
  product,
  design,
}: {
  product: ProductType;
  design: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setNumOfWishlistProd, setWishlistProducts } =
    useContext(WishlistContext);

  return (
    <button
      onClick={async () => {
        setIsLoading(true);
        const res = await addToWishlist(`${product.id}`);
        if (!res) {
          setIsLoading(false);
          return;
        }
        if (res.status === "success") {
          toast.success("Product is added successfully to your wishlist!❤️", {
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
          setWishlistProducts((currentProducts) => [
            ...currentProducts,
            product,
          ]);
        } else {
          toast.error(`Can't add this product now!`, {
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
      }}
      disabled={isLoading}
      className={design}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin w-full h-full" />
      ) : (
        <Heart className="text-black w-full h-full bg-transparent hover:bg-emerald-100 cursor-pointer border-2 rounded-full p-1 fill-transparent hover:fill-emerald-500 hover:text-emerald-500 duration-300" />
      )}
    </button>
  );
}
