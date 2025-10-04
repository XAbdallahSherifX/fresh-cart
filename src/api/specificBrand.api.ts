export default async function getSpecifcBrandProducts(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand[in]=${id}`
  );
  const { data } = await response.json();
  return data;
}
