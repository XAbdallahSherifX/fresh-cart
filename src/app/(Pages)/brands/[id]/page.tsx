import getSpecifcBrandProducts from "@/api/specificBrand.api";
import AllBrandsProducts from "@/app/_Components/AllBrandsProducts/AllBrandsProducts";
import { Brand } from "@/types/brand.type";
import React from "react";

export default async function brand({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id }: { id: string } = await params;
  const brandProducts = await getSpecifcBrandProducts(id);
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`
  );
  const { data }: { data: Brand } = await response.json();
  return <AllBrandsProducts products={brandProducts} brandName={data.name} />;
}
