import getCategories from "@/api/categories.api";
import CategorySwiper from "../CategorySwiper/CategorySwiper";
import { CategoryType } from "@/types/category.type";
export default async function CategorySlider() {
  const categories:CategoryType[] = await getCategories();
  return (
    <>
      <div className="container mx-auto px-3">
        <h1 className="sm:text-4xl text-2xl font-semibold sm:font-light py-3">
          Shop Popular Categories
        </h1>
        <CategorySwiper categories={categories} />
      </div>
    </>
  );
}
