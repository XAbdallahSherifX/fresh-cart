import updateCart from "@/cartActions/updateCart";
import { CartContext } from "@/contexts/CartContext";
import { cartProductsType } from "@/types/cart.type";
import { LoaderCircle, Minus, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
export default function UpdateCartProduct({
  productId,
  count,
  setCartProducts,
}: {
  productId: string;
  count: number;
  setCartProducts: React.Dispatch<React.SetStateAction<cartProductsType[]>>;
}) {
  const { setNumOfCartProd } = useContext(CartContext);
  const { setTotalCartPrice } = useContext(CartContext);
  async function update(id: string, numOfProducts: string) {
    setIsLoading(true);
    const res = await updateCart(id, `${numOfProducts}`);
    if (res.status === "success") {
      setNumOfCartProd(
        res.data.products.reduce(
          (a: number, c: cartProductsType) => a + c.count,
          0
        )
      );
      setCartProducts(res.data.products);
    }
    setTotalCartPrice(res.data.totalCartPrice);
    setIsLoading(false);
  }
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <button
        onClick={() => update(productId, `${count - 1}`)}
        disabled={isLoading}
        className="border-3 border-black rounded-full cursor-pointer p-0.5 hover:bg-black hover:text-white duration-300 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-white  disabled:cursor-not-allowed"
      >
        <Minus />
      </button>
      <h6 className="text-lg">
        {isLoading ? <LoaderCircle className="animate-spin" /> : <>{count}</>}
      </h6>
      <button
        onClick={() => update(productId, `${count + 1}`)}
        disabled={isLoading}
        className="border-3 border-black rounded-full cursor-pointer p-0.5 hover:bg-black hover:text-white duration-300 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-white  disabled:cursor-not-allowed"
      >
        <Plus />
      </button>
    </>
  );
}
