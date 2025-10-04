import { Frown } from "lucide-react";
import React from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";

export default function AllBrandsProducts({
  products,brandName
}: {
  products: ProductType[];
  brandName:string
}) {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-y-4 py-6">
        <h1 className="p-3 font-bold text-4xl">{brandName}:</h1>
        {products.length === 0 ? (
          <div className="h-[70vh] flex justify-center items-center">
            <h6 className="text-4xl font-light flex items-center gap-x-2">
              No Products Found <Frown className="text-emerald-500" size={50} />
            </h6>
          </div>
        ) : (
          <div className="flex flex-wrap gap-y-3 ">
            {products.map((currentProduct, index) => (
              <SingleProduct
                key={currentProduct.id}
                index={index}
                product={currentProduct}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
