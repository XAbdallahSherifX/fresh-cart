export default async function getSpecifcSubcategoryProducts(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${id}`
  );
  const { data } = await response.json();
  return data;
}
