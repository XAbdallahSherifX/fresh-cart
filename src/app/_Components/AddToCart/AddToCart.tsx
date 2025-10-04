"use client";
import addToCart from "@/cartActions/addToCart";
import { CartContext } from "@/contexts/CartContext";
import { cartProductsType } from "@/types/cart.type";
import { LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
export default function AddToCart ({ id, design }: { id: string; design: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setNumOfCartProd } = useContext(CartContext);
  return (
    <button
      onClick={async () => {
        setIsLoading(true);
        const res = await addToCart(`${id}`);
        if (!res) {
          setIsLoading(false);
          return;
        }
        setNumOfCartProd(
          res.data.products.reduce(
            (a: number, c: cartProductsType) => a + c.count,
            0
          )
        );
        if (res.status === "success") {
          toast.success("Product is added successfully to your cart!❤️", {
            position: "top-center",
            duration: 3000,
            style: {
              backgroundImage:
                "linear-gradient(23deg,rgba(0, 188, 125, 1) 0%, rgba(77, 191, 109, 1) 50%, rgba(0, 188, 125, 1) 100%)",
              color: "white",
              fontSize: "16px",
            },
          });
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
      {isLoading ? <LoaderCircle className="animate-spin" /> : `+Add To Cart`}
    </button>
  );
}
