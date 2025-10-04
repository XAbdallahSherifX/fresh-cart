"use client";
import { Heart, Star } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import DetailsSwiper from "../DetailsSwiper/DetailsSwiper";
import { ProductType } from "@/types/product.type";
import AddToCart from "../AddToCart/AddToCart";
import AddToWishlist from "../AddToWishlist/AddToWishlist";
import RemoveFromWishlist from "../RemoveFromWishlist/RemoveFromWishlist";
import { WishlistContext } from "@/contexts/WishlistContext";
export default function Details({ product }: { product: ProductType }) {
  const { wishlistProducts = [] } = useContext(WishlistContext) || {};
  const isInWishlist = wishlistProducts.some(
    (wishlistProduct) => wishlistProduct.id === product.id
  );
  return (
    <div className="container mx-auto my-6">
      <div className="flex flex-wrap bg-transparent backdrop-blur-xs shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)] rounded-xl">
        <div className="md:w-[40%] w-full">
          <DetailsSwiper product={product} />
        </div>
        <div className="md:w-3/5 w-full">
          <div className="p-6 max-md:border-t-5 flex flex-col min-h-80 md:h-full justify-between">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <h3 className="text-sm font-light">{product.description}</h3>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span className="text-2xl">{product.price} EGP</span>
                  <span className="flex items-center">
                    <span className="text-lg">{product.ratingsAverage}</span>
                    <Star className="text-yellow-400 fill-yellow-400" />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <AddToCart
                  id={product.id}
                  design="border-2 w-[84%] sm:w-[90%] border-emerald-500 rounded-3xl hover:text-white hover:bg-emerald-500 duration-300 cursor-pointer flex justify-center items-center disabled:bg-gray-700 disabled:border-gray-700 disabled:text-white disabled:cursor-not-allowed"
                />
                {isInWishlist ? (
                  <RemoveFromWishlist
                    productId={product.id}
                    design={
                      "flex w-[14%] sm:w-[8%] justify-center items-center duration-300"
                    }
                  />
                ) : (
                  <AddToWishlist
                    product={product}
                    design={
                      "flex w-[14%] sm:w-[8%] justify-center items-center duration-300"
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
