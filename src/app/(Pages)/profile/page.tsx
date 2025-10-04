import getMyToken from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";
import { KeyRound, PencilOff } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Profile() {
  const token = await getMyToken();
  if (!token) {
    return;
  }
  const { id }: { id: string } = jwtDecode(`${token}`);
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/${id}`);
  const { data } = await res.json();
  return (
    <>
      <div className="mt-4 md:w-3/4 lg:w-1/2 mx-auto p-3">
        <div
          className="w-full backdrop-blur-xs
        p-6 rounded-xl border-2 shadow-[0px_0px_40px_-4px_rgba(0,_0,_0,_0.8)]"
        >
          <h5 className="sm:text-4xl text-lg text-center mb-5">My Profile</h5>
          <div className="py-3">
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-1.5">
                <h6 className="text-2xl text-emerald-500">User name:</h6>
                <h5 className="bg-gray-200 text-lg px-4 py-2 rounded-3xl">
                  {data.name}
                </h5>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <h6 className="text-2xl text-emerald-500">User email:</h6>
                <h5 className="bg-gray-200 text-lg px-4 py-2 rounded-3xl">
                  {data.email}
                </h5>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <h6 className="text-2xl text-emerald-500">User phone:</h6>
                <h5 className="bg-gray-200 text-lg px-4 py-2 rounded-3xl">
                  {data.phone}
                </h5>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-center mt-5 gap-3">
              <Link href="/edit" className="bg-emerald-400 hover:bg-emerald-600 duration-200 text-lg px-4 py-2 rounded-xl text-white flex items-center gap-x-3 cursor-pointer justify-center">
                Edit Profile <PencilOff />
              </Link>
              <Link href="/changepass" className="bg-emerald-400 hover:bg-emerald-600 duration-200 text-lg px-4 py-2 rounded-xl text-white flex items-center gap-x-3 cursor-pointer justify-center">
                Change Password <KeyRound />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
