export default async function getCategories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    { next: { revalidate: 120 } }
  );
  const { data } = await response.json();
  return data;
}
