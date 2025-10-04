"use server"
import { addressSchemaType } from "@/schema/address.schema";
import getMyToken from "@/utilities/getMyToken";
export default async function (values: addressSchemaType) {
  const token = await getMyToken();
  if (!token) return;
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { token, "Content-Type": "application/json" },
  });
  const payload = await res.json();
  return payload
}
