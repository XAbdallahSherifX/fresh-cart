export default async function getSubcategory(id: string) {
  const respons = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  );
  const {data} = await respons.json();
  return data;
}
