"use client"
import React, { useContext } from "react";
import AddToCart from "@/app/_Components/AddToCart/AddToCart";
import RemoveFromWishlist from "@/app/_Components/RemoveFromWishlist/RemoveFromWishlist";
import { Frown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WishlistContext } from "@/contexts/WishlistContext";
export default function Wishlist() {
  const {wishlistProducts} = useContext(WishlistContext)
  return (
    <div className="container mx-auto flex flex-col gap-y-4 py-6">
      <h1 className="p-3 font-bold text-4xl">WishList:</h1>
      {wishlistProducts.length === 0 ? (
        <div className="h-[70vh] flex justify-center items-center">
          <h6 className="text-4xl font-light flex items-center gap-x-2">
            No Products Found <Frown className="text-emerald-500" size={50} />
          </h6>
        </div>
      ) : (
        <div className="flex flex-wrap gap-y-3 ">
          {wishlistProducts?.map((product, index) => (
            <div key={product?._id} className="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2">
              <div
                className="flex w-[90%] mx-auto
          flex-col justify-between gap-y-2 border-3 rounded-3xl hover:border-emerald-500 duration-300 p-3 relative"
              >
                <Link href={`/products/${product?.id}`}>
                  <div>
                    <Image
                      src={product?.imageCover}
                      className="rounded-3xl w-full"
                      alt={product?.title}
                      width={450}
                      height={450}
                      priority={index <= 3}
                    />
                    <h1 className="sm:text-xl text-lg font-medium line-clamp-1">
                      {product?.title}
                    </h1>
                  </div>
                  <span className="text-emerald-400 sm:text-lg">
                    {product?.category?.name}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <span className="sm:text-lg">{product?.price} EGP</span>
                      <span className="flex items-center">
                        <span className="sm:text-lg">
                          {product?.ratingsAverage}
                        </span>
                        <Star className="text-yellow-400 fill-yellow-400" />
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-between">
                  <RemoveFromWishlist
                    productId={product?.id}
                    design={
                      "sm:w-[18%] w-[24%] aspect-square flex justify-center items-center duration-300"
                    }
                  />
                  <AddToCart
                    id={product?.id}
                    design="sm:w-[80%] w-[75%] max-sm:text-sm
             border-2 border-emerald-500 rounded-3xl py-1 hover:text-white hover:bg-emerald-500 duration-300 cursor-pointer disabled:bg-gray-700 disabled:border-gray-700 disabled:text-white  disabled:cursor-not-allowed flex justify-center items-center text-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
