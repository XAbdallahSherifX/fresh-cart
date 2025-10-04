"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import { Autoplay, Thumbs } from "swiper/modules";
import Image from "next/image";
import { ProductType } from "@/types/product.type";
export default function DetailsSwiper({ product }: { product: ProductType }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  return (
    <div className="md:border-r-2">
      <div className="p-2 border-b-2">
        <Swiper
          modules={[Thumbs, Autoplay]}
          spaceBetween={0}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          thumbs={{
            swiper: thumbsSwiper,
            slideThumbActiveClass: "!border-emerald-600",
          }}
        >
          {product.images.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <Image
                className="w-full h-[50vh] object-contain"
                src={image}
                alt={product.title}
                width={100}
                height={100}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {product.images.length > 4 ? (
        <div className="p-2">
          <Swiper
            modules={[Thumbs]}
            watchSlidesProgress
            slidesPerView={product?.images?.length}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
          >
            {product.images.map((image: string, index: number) => (
              <SwiperSlide
                key={index}
                className="p-1 border-2 rounded-md cursor-pointer transition duration-300 hover:border-emerald-500 [&.swiper-slide-thumb-active]:!border-emerald-600"
              >
                <Image
                  className="w-full rounded-md p-1"
                  src={image}
                  alt=""
                  width={100}
                  height={100}
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="p-2">
          <Swiper
            modules={[Thumbs]}
            watchSlidesProgress
            slidesPerView={product?.images?.length + 3}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
          >
            {product.images.map((image: string, index: number) => (
              <SwiperSlide
                key={index}
                className="p-1 border-2 rounded-md cursor-pointer transition duration-300 hover:border-emerald-500 [&.swiper-slide-thumb-active]:!border-emerald-600"
              >
                <Image
                  className="w-full rounded-md p-1"
                  src={image}
                  alt=""
                  width={100}
                  height={100}
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
