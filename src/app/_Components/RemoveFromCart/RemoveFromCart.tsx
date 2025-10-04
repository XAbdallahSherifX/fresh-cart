import removeFromCart from "@/cartActions/removeFromCart";
import { CartContext } from "@/contexts/CartContext";
import { cartProductsType } from "@/types/cart.type";
import { LoaderCircle, Trash2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
export default function RemoveFromCart({
  productId,
  setCartProducts,
}: {
  productId: string;
  setCartProducts: React.Dispatch<React.SetStateAction<cartProductsType[]>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setNumOfCartProd } = useContext(CartContext);
  const { setTotalCartPrice } = useContext(CartContext);
  async function remove(id: string) {
    setIsLoading(true);
    const res = await removeFromCart(`${id}`);
    if (res.status === "success") {
      toast.success("Product is removed successfully from your cart!🥲", {
        position: "top-center",
        duration: 3000,
        style: {
          backgroundImage:
            "linear-gradient(23deg,rgba(0, 188, 125, 1) 0%, rgba(77, 191, 109, 1) 50%, rgba(0, 188, 125, 1) 100%)",
          color: "white",
          fontSize: "16px",
        },
      });
      setCartProducts(res.data.products);
      setNumOfCartProd(
        res.data.products.reduce(
          (a: number, c: cartProductsType) => a + c.count,
          0
        )
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
    setTotalCartPrice(res.data.totalCartPrice);
  }
  return (
    <button
      onClick={() => remove(productId)}
      disabled={isLoading}
      className="p-2 border-red-500 border-2 hover:bg-red-500 text-xl hover:text-white text-black  w-full rounded-full flex justify-center items-center cursor-pointer duration-300 gap-x-1 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-white  disabled:cursor-not-allowed disabled:border-2"
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          Remove <Trash2 className="mt-1" size={20} />
        </>
      )}
    </button>
  );
}
