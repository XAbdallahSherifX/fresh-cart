import { Button } from "@/components/ui/button";
import { Order } from "@/types/order.type";
import getMyToken from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import React from "react";

export default async function page() {
  const token = await getMyToken();
  if (!token) {
    return;
  }
  const { id }: { id: string } = jwtDecode(`${token}`);
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  );
  const payload: Order[] = await res.json();
  return (
    <>
      <div className="container mx-auto flex flex-col gap-y-4 mt-3 my-4">
        {payload.map((order) => (
          <div
            key={order._id}
            className="border-2 border-emerald-500 rounded-xl p-4 flex max-sm:flex-col justify-between max-sm:gap-y-1.5"
          >
            <div>
              <h2 className="text-lg">
                <span className="text-xl text-emerald-700">
                  Date of order :
                </span>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </h2>
              <h2 className="text-lg">
                <span className="text-xl text-emerald-700">
                  Payment method :
                </span>{" "}
                {order.paymentMethodType}
              </h2>
              <h2 className="text-lg">
                <span className="text-xl text-emerald-700">Price : </span>
                {order.totalOrderPrice} EGP
              </h2>
              <h2 className="text-lg">
                <span className="text-xl text-emerald-700">City : </span>
                {order.shippingAddress.city}
              </h2>
              <h2 className="text-lg">
                <span className="text-xl text-emerald-700">Details : </span>
                {order.shippingAddress.details}
              </h2>
              <h2 className="text-lg">
                <span className="text-xl text-emerald-700">Phone : </span>
                {order.shippingAddress.phone}
              </h2>
            </div>
            <div className="flex justify-end items-end">
              <Link href={`allorders/${order._id}`}>
                <Button className="max-sm:w-full cursor-pointer bg-emerald-600 text-lg hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-900/50">
                  Order Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
