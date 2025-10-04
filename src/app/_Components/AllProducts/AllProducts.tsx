import getProducts from "@/api/products.api";
import React from "react";
import { ProductType } from "@/types/product.type";
import SingleProduct from "../SingleProduct/SingleProduct";
export default async function AllProducts() {
  const { data: products }: { data: ProductType[] } = await getProducts(
    "?limit=25"
  );
  return (
    <div className="container mx-auto flex flex-col gap-y-4">
      <h3 className="sm:text-4xl text-2xl font-semibold sm:font-light px-3">
        Frequently Bought Products
      </h3>
      <div className="flex flex-wrap gap-y-3 ">
        {products.map((currentProduct, index) => (
          <SingleProduct
            key={currentProduct.id}
            index={index}
            product={currentProduct}
          />
        ))}
      </div>
    </div>
  );
}
