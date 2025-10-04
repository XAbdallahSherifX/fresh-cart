export default async function getBrands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands?limit=54",
    { next: { revalidate: 120 } }
  );
  const { data } = await response.json();
  return data;
}
