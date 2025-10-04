import React from "react";
import { ProductType } from "@/types/product.type";
import SingleProduct from "@/app/_Components/SingleProduct/SingleProduct";
import { ListFilter } from "lucide-react";
import { subcategoryType } from "@/types/subcategory";
import getSubcategory from "@/api/subcatogry.api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getSpecifcCategoryProducts from "@/api/specificCategory.api";
import getSpecifcSubcategoryProducts from "@/api/specificSubcategory.api";
import SortableCategoryProducts from "@/app/_Components/SortableCategoryProducts/SortableCategoryProducts";
export default async function category({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryProducts: ProductType[] = await getSpecifcCategoryProducts(id);
  const subCategories: subcategoryType[] = await getSubcategory(id);
  return (
    <SortableCategoryProducts
      categoryProducts={categoryProducts}
      subCategories={subCategories}
    />
  );
}
