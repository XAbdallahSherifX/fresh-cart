"use client";
import { Heart, Star } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ProductType } from "@/types/product.type";
import Image from "next/image";
import AddToCart from "../AddToCart/AddToCart";
import AddToWishlist from "../AddToWishlist/AddToWishlist";
import RemoveFromWishlist from "../RemoveFromWishlist/RemoveFromWishlist";
import { WishlistContext } from "@/contexts/WishlistContext";
export default function SingleProduct({
  product,
  index,
}: {
  product: ProductType;
  index: number;
}) {
  const { wishlistProducts = [] } = useContext(WishlistContext) || {};
  const isInWishlist = wishlistProducts.some(
    (wishlistProduct) => wishlistProduct.id === product.id
  );
  return (
    <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2">
      <div
        className="flex w-[90%] mx-auto
          flex-col justify-between gap-y-2 border-3 rounded-3xl hover:border-emerald-500 duration-300 p-3 relative"
      >
        <Link href={`/products/${product.id}`}>
          <div>
            <Image
              src={product.imageCover}
              className="rounded-3xl w-full"
              alt={product.title}
              width={450}
              height={450}
              priority={index <= 3}
            />
            <h1 className="sm:text-xl text-lg font-medium line-clamp-1">
              {product.title}
            </h1>
          </div>
          <span className="text-emerald-400 sm:text-lg">
            {product.category.name}
          </span>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="sm:text-lg">{product.price} EGP</span>
              <span className="flex items-center">
                <span className="sm:text-lg">{product.ratingsAverage}</span>
                <Star className="text-yellow-400 fill-yellow-400" />
              </span>
            </div>
          </div>
        </Link>
        <div className="flex justify-between">
          {isInWishlist ? (
            <RemoveFromWishlist
              productId={product.id}
              design={
                "sm:w-[18%] w-[24%] aspect-square flex justify-center items-center duration-300"
              }
            />
          ) : (
            <AddToWishlist
              product={product}
              design={
                "sm:w-[18%] w-[24%] aspect-square flex justify-center items-center duration-300"
              }
            />
          )}
          <AddToCart
            id={product.id}
            design="sm:w-[80%] w-[75%] max-sm:text-sm
             border-2 border-emerald-500 rounded-3xl py-1 hover:text-white hover:bg-emerald-500 duration-300 cursor-pointer disabled:bg-gray-700 disabled:border-gray-700 disabled:text-white  disabled:cursor-not-allowed flex justify-center items-center text-center"
          />
        </div>
      </div>
    </div>
  );
}
