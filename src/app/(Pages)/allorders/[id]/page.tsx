import { Order } from "@/types/order.type";
import getMyToken from "@/utilities/getMyToken";
import React from "react";
import Link from "next/link";
import Image from "next/image";
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getMyToken();
  if (!token) return;
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
    { headers: { token } }
  );
  const payload = await res.json();
  const order: Order = await payload?.data;
  return (
    <div className="container mx-auto">
      {
        <div
          key={order._id}
          className="border-2 border-emerald-500 rounded-xl p-4 mt-3 flex flex-col gap-y-4 mx-5 my-3"
        >
          <div>
            <h2 className="text-lg">
              <span className="text-xl text-emerald-700">Date of order :</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </h2>
            <h2 className="text-lg">
              <span className="text-xl text-emerald-700">Payment method :</span>{" "}
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
            <h2 className="text-lg">
              <span className="text-xl text-emerald-700">Delivered : </span>
              {order.isDelivered ? "Yes" : "Not yet"}
            </h2>
            <h2 className="text-lg">
              <span className="text-xl text-emerald-700">Paid at : </span>
              {new Date(order.paidAt).toLocaleString()}
            </h2>
            <h2 className="text-lg">
              <span className="text-xl text-emerald-700">
                Ordered products :{" "}
              </span>
              {order.cartItems.length}
            </h2>
          </div>
          <div>
            <h6 className="text-5xl text-emerald-700 px-3 my-3">Products : </h6>
            <div className="flex flex-wrap gap-y-3">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2"
                >
                  <div
                    className="flex w-[90%] mx-auto
          flex-col justify-between gap-y-2 border-3 rounded-3xl hover:border-emerald-500 duration-300 p-3 relative"
                  >
                    <Link href={`/products/${item.product.id}`}>
                      <div>
                        <Image
                          src={item.product.imageCover}
                          className="rounded-3xl w-full"
                          alt={item.product.title}
                          width={450}
                          height={450}
                          priority
                        />
                        <h1 className="sm:text-xl text-lg font-medium line-clamp-1">
                          {item.product.title}
                        </h1>
                      </div>
                      <span className="text-emerald-400 sm:text-lg">
                        {item.product.category.name}
                      </span>
                      <div className="flex flex-col">
                        <span className="sm:text-lg">
                          Count :{" "}
                          {item.count === 1
                            ? `${item.count} piece`
                            : `${item.count} pieces`}
                        </span>
                        <span className="sm:text-lg">
                          Price : {item.price * item.count} EGP
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
