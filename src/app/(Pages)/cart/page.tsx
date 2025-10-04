"use client";
import getMyCart from "@/cartActions/getMyCart";
import { cartProductsType, cartType } from "@/types/cart.type";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import RemoveFromCart from "@/app/_Components/RemoveFromCart/RemoveFromCart";
import UpdateCartProduct from "./../../_Components/UpdateCartProduct/UpdateCartProduct";
import { Frown } from "lucide-react";
import ClearCart from "@/app/_Components/ClearCart/ClearCart";
import Link from "next/link";
import { CartContext } from "@/contexts/CartContext";
export default function Cart() {
  const [cartProducts, setCartProducts] = useState<cartProductsType[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const {totalCartPrice , setTotalCartPrice} = useContext(CartContext)
  const [cartId, setCartId] = useState("")
  useEffect(() => {
    (async () => {
      const { data }: { data: cartType } = await getMyCart();
      setTotalCartPrice(data.totalCartPrice)
      setPageLoading(false);
      setCartId(data._id)
      setCartProducts(data.products);
    })();
  }, []);
  return (
    <>
      {pageLoading ? (
        <div className="h-[90vh] flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : cartProducts.length !== 0 ? (
        <div className="container mx-auto flex justify-between flex-wrap gap-y-4 py-6 px-2">
          {cartProducts?.map((product: cartProductsType) => (
            <div
              key={product._id}
              className="flex flex-wrap bg-transparent backdrop-blur-xs border-2 p-2 max-sm:w-[48%] w-full lg:w-[48%] border-emerald-500 rounded-xl"
            >
              <div className="sm:w-1/3 w-2/3 mx-auto">
                <Link href={`/products/${product.product.id}`}>
                  <Image
                    className="w-full rounded-tl-xl sm:pr-1 rounded-bl-xl sm:border-r-2 sm:border-black"
                    src={product.product.imageCover}
                    alt={product.product.title}
                    width={100}
                    height={100}
                    priority
                  />
                </Link>
              </div>
              <div className="sm:w-2/3 w-full">
                <div className="p-2 flex flex-col justify-between sm:h-full max-sm:gap-y-6">
                  <div className="flex flex-col gap-y-1">
                    <Link href={`/products/${product.product.id}`}>
                      <h6 className="sm:line-clamp-2 line-clamp-1 text-lg sm:text-3xl">
                        {product.product.title}
                      </h6>
                    </Link>
                    <h6 className="text-emerald-400 sm:text-lg">
                      {product.product.category.name}
                    </h6>
                    <h6 className="text-[16px] font-semibold">
                      {product.price * product.count}EGP
                    </h6>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-y-2">
                    <div className="flex justify-between items-center border-2 p-1.5 w-full sm:w-[48%] border-emerald-500 rounded-full">
                      <UpdateCartProduct
                        productId={product.product._id}
                        count={product.count}
                        setCartProducts={setCartProducts}
                      ></UpdateCartProduct>
                    </div>
                    <div className="sm:w-[48%] w-full">
                      <RemoveFromCart
                        productId={product.product._id}
                        setCartProducts={setCartProducts}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-between">
            <Link href={`/checkout/${cartId}`} className="lg:w-1/3 w-[48%] text-xl border-2 bg-emerald-400 border-emerald-400 rounded-sm py-1 text-white duration-300 cursor-pointer flex justify-center items-center text-center px-5 hover:bg-emerald-600 hover:border-emerald-600">
              Checkout ({totalCartPrice}EGP)
            </Link>
            <ClearCart setCartProducts={setCartProducts} />
          </div>
        </div>
      ) : (
        <div className="h-[70vh] flex justify-center items-center">
          <h6 className="text-4xl font-light flex items-center gap-x-2">
            Cart is empty
            <Frown className="text-emerald-500" size={50} />
          </h6>
        </div>
      )}
    </>
  );
}
