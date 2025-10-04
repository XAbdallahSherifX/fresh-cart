"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import slide1 from "../../../../public/images/banner-1.jpeg";
import slide2 from "../../../../public/images/banner-2.png";
import slide3 from "../../../../public/images/banner-3.jpeg";
import topRight from "../../../../public/images/slider-image-2.jpeg";
import bottomRight from "../../../../public/images/slider-image-3.jpeg";
import { Autoplay } from "swiper/modules";
export default function MainSwiper() {
  return (
    <div className="container mx-auto flex flex-wrap px-3">
      <div className="w-full lg:w-[70%]">
        <Swiper
          className="w-full"
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          speed={800}
          loop
        >
          <SwiperSlide>
            <div className="relative">
              <div className="z-20 absolute w-full h-[200px] md:h-[400px] bg-[rgba(0,0,0,0.15)] flex items-center px-8 md:text-5xl text-2xl text-[#906746] cursor-default">
                Your favorites, fresh
                <br /> from our oven.
              </div>
              <Image
                src={slide1}
                alt=""
                className="w-full h-[200px] md:h-[400px] object-cover"
                priority
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <div className="z-20 absolute w-full h-[200px] md:h-[400px] bg-[rgba(0,0,0,0.55)] flex items-center px-8 md:text-5xl text-2xl text-white cursor-default">
                Where health <br /> meets flavor.
              </div>
              <Image
                src={slide2}
                alt=""
                className="w-full h-[200px] md:h-[400px] object-cover"
                priority
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <div className="z-20 absolute w-full h-[200px] md:h-[400px] bg-[rgba(0,0,0,0.55)] p-6 flex items-center justify-center md:text-5xl text-2xl text-emerald-200 text-center cursor-default">
                From the field to your basket, crisp veggies every day.
              </div>
              <Image
                src={slide3}
                alt=""
                className="w-full h-[200px] md:h-[400px] object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full lg:w-[30%] max-lg:hidden">
        <div className="flex md:flex-col h-full">
          <div>
            <Image
              className="h-[120px] md:h-[200px] object-cover object-right"
              src={topRight}
              alt=""
              priority
            />
          </div>
          <div>
            <Image
              className="h-[120px] md:h-[200px] object-cover object-right"
              src={bottomRight}
              alt=""
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
