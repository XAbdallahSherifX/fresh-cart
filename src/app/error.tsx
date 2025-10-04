"use client";
import React from "react";
import error404 from "../../public/images/404 Error-pana.svg";
import Image from "next/image";
export default function error() {
  return (
    <div className="flex items-center flex-col">
      <Image src={error404} alt="Check Your Network" priority />
      <h6 className="text-emerald-500 text-6xl font-extrabold">
        Check Your Network
      </h6>
    </div>
  );
}
