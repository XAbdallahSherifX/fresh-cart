import getCategories from "@/api/categories.api";
import AllCategories from "@/app/_Components/AllCategories/AllCategories";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default async function Categories() {
  const categories: CategoryType[] = await getCategories();
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap gap-y-3 ">
          <AllCategories categories={categories}/>
        </div>
      </div>
    </>
  );
}
