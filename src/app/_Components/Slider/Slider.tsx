"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface MySliderPropsType {
  listOfImages: string[];
  spaceBetween?: number;
  slidesPerView?: number;
  showLayer?: boolean;
  className?: string;
}

export default function Slider({
  listOfImages,
  spaceBetween = 100,
  slidesPerView = 3,
  showLayer = false,
  className,
}: MySliderPropsType) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={{
        clickable: true,
        //type: "fraction",
        bulletActiveClass: "bg-white! opacity-100! w-6! rounded-3xl!",
        //-----------For custom bullets number or img src
        // renderBullet: function (index, className) {
        //   return '<span class="' + className + '">' + (index + 1) + "</span>";
        // },
      }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop
      navigation
    //   scrollbar={{ draggable: true }}
      className={className}
    >
      {listOfImages.map((image) => (
        <SwiperSlide key={image}>
          <div className="relative">
            <img
              src={image}
              alt="slide"
              className="w-full h-[400px] object-cover"
            />

            {showLayer && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C853]/90 to-[#69F0AE]/50" />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
