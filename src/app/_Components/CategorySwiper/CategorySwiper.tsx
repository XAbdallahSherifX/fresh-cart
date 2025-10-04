"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";

export default function CategorySwiper({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <Swiper
      modules={[Pagination, FreeMode, Autoplay]}
      spaceBetween={10}
      slidesPerView={2}
      slidesPerGroup={2}
      freeMode={true}
      speed={1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        el: ".custom-pagination",
      }}
      className="[--swiper-pagination-color:theme(colors.emerald.500)] 
             [--swiper-pagination-bullet-inactive-color:theme(colors.gray.600)] 
             [--swiper-pagination-bottom:16px] 
             [--swiper-wrapper-transition-timing-function:linear] 
             !pb-8"
      breakpoints={{
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 6,
          slidesPerGroup: 2,
          spaceBetween: 10,
        },
      }}
    >
      {categories.map((category: CategoryType) => (
        <SwiperSlide key={category._id}>
          <Link href={`categories/${category._id}`} className="cursor-pointer">
            <Image
              className="w-full h-[220px]"
              src={category.image}
              alt={category.name}
              width={100}
              height={200}
              priority
            />
            <h4 className="text-xl">{category.name}</h4>
          </Link>
        </SwiperSlide>
      ))}
      <div className="custom-pagination mt-6 flex justify-center" />
    </Swiper>
  );
}
