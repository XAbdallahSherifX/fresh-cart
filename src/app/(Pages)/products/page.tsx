import getProducts from "@/api/products.api";
import SortableProducts from "@/app/_Components/SortableProducts/SortableProducts";
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = params["page"] ?? "1";
  const limit = params["limit"] ?? "25";
  const sort = params["sort"] ?? "";
  const minPrice = params["price[gte]"] ?? "";
  const maxPrice = params["price[lte]"] ?? "";
  const category = params["category[in]"] ?? "";
  let query = `?page=${page}&limit=${limit}`;
  if (sort) query += `&sort=${sort}`;
  if (minPrice) query += `&price[gte]=${minPrice}`;
  if (maxPrice) query += `&price[lte]=${maxPrice}`;
  if (category) query += `&category[in]=${category}`;
  const initialData = await getProducts(query);
  return <SortableProducts initialProducts={initialData} />;
}
