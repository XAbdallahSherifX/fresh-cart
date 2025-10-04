"use server";
import getMyToken from "@/utilities/getMyToken";
export default async function (addressId: string) {
  const token = await getMyToken();
  if (!token) return;
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );
  const payload = await res.json();
  return payload;
}
