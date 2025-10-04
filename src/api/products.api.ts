export default async function getProducts(params: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products${params}`,
    { next: { revalidate: 120 } }
  );
  const  data  = await response.json();
  return data;
}
