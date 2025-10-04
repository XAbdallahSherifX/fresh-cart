import getProductDetails from "@/api/productDetails.api";
import React from "react";
import { ProductType } from "@/types/product.type";
import Details from "@/app/_Components/Details/Details";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product: ProductType = await getProductDetails(id);
  return <Details product={product} />;
}
