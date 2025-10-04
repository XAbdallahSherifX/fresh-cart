"use server";
import getMyToken from "@/utilities/getMyToken";
import { redirect } from "next/navigation";
export default async (id: string) => {
  const token = await getMyToken();
  if (!token) {
    redirect("/login");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    }
  );
  const payload = await response.json();
  return payload;
};
