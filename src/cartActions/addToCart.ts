"use server";
import getMyToken from "@/utilities/getMyToken";
import { redirect } from "next/navigation";
export default async (id: string) => {
  const token = await getMyToken();
  if (!token) {
    redirect("/login");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const payload = await response.json();
  return payload;
};
