import getBrands from "@/api/brands.api";
import AllBrands from "@/app/_Components/AllBrands/AllBrands";
import { Brand } from "@/types/brand.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Brands() {
  const brands: Brand[] = await getBrands();
  return (
   <AllBrands brands={brands}/>
  );
}
