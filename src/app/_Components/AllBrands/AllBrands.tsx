"use client";
import { Brand } from "@/types/brand.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AllBrands({ brands }: { brands: Brand[] }) {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-wrap gap-y-3 ">
        {brands.map((brand) => (
          <div key={brand._id} className="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2">
            <Link href={`/brands/${brand._id}`}>
              <div className="px-2">
                <div
                  className="w-full border-2 border-emerald-600
                  cursor-pointer overflow-hidden flex justify-center items-center"
                >
                  <Image
                    className="w-full hover:scale-115 duration-150"
                    src={brand.image}
                    alt={`${brand.name} Logo`}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
