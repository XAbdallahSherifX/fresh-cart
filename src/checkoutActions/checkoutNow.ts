"use server";
import { AddressType } from "@/types/address.type";
import getMyToken from "@/utilities/getMyToken";
import { redirect } from "next/navigation";
export default async function (id: string, shippingAddress: AddressType) {
  const token = await getMyToken();
  if (!token) return;
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${process.env.NEXT_URL}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: { token, "Content-Type": "application/json" },
    }
  );
  const payload = await response.json();
  if (payload.status === "success") {
    redirect(payload.session.url);
  }
}
