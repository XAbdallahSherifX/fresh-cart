"use client";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AllCategories({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <>
      {categories.map((cat, ind) => (
        <div key={cat._id} className="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2">
          <div className="px-0.5">
            <div className="bg-gray-600 p-2 rounded-xl">
              <Image
                className="w-full h-48 sm:h-60 border-2 rounded-xl"
                src={cat.image}
                alt={cat.name}
                width={100}
                priority={ind <= 3}
                height={100}
              />
              <h2 className="text-white text-lg text-center my-2">
                {cat.name}
              </h2>
              <Link href={`categories/${cat._id}`}>
                <button className="text-center bg-emerald-400 text-white w-full rounded-2xl py-2 cursor-pointer hover:bg-emerald-500 duration-300 disabled:bg-gray-700 disabled:border-gray-700 disabled:text-white  disabled:cursor-not-allowed flex justify-center items-center">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
