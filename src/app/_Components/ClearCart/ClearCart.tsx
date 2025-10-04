import clearCart from "@/cartActions/clearCart";
import { CartContext } from "@/contexts/CartContext";
import { cartProductsType } from "@/types/cart.type";
import { LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function ClearCart({
  setCartProducts,
}: {
  setCartProducts: React.Dispatch<React.SetStateAction<cartProductsType[]>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setNumOfCartProd } = useContext(CartContext);
  async function clearMyCart() {
    setIsLoading(true);
    const res = await clearCart();
    if (res.message === "success") {
      setCartProducts([]);
      setNumOfCartProd(0);
      toast.success("Cart is cleared successfully!🥲", {
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
      toast.error(`Can't clear this cart now!`, {
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
      onClick={() => clearMyCart()}
      disabled={isLoading}
      className="lg:w-1/3 w-[48%] items-center py-1 px-5 border-red-400 border-2 bg-red-400 hover:border-red-600 hover:bg-red-600  text-xl text-white rounded-sm cursor-pointer duration-300 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-white  disabled:cursor-not-allowed flex justify-center"
    >
      {isLoading ? <LoaderCircle className="animate-spin" /> : <>Clear</>}
    </button>
  );
}
