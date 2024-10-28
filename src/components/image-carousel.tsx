//@ts-expect - error
"use client";
import { FC, useState } from "react";
import { Swiper as SwiperCore } from "swiper"; // Import Swiper core type
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Base Swiper CSS
import "swiper/css/navigation"; // Navigation module styles
import "swiper/css/thumbs"; // Thumbs module styles
import Image from "next/image";
import { ArrowCircleLeft2, ArrowCircleRight2 } from "iconsax-react"; // Iconsax imports for custom buttons
import { Navigation, Thumbs } from "swiper/modules";

interface ImageCarouselProps {
  images: string[]; // Array of image URLs to be displayed in the carousel
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  const [activeThumb, setActiveThumb] = useState<SwiperCore | null>(null);

  return (
    <div className="carousel-container w-full relative">
      {/* Main Swiper for the large images */}
      <Swiper
        modules={[Navigation, Thumbs]} // Enable lazy loading via modules
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        thumbs={{ swiper: activeThumb }}
        className="main-swiper"
      >
        {images &&
          images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`Slide ${index}`}
                className="w-[80%] swiper-lazy mx-auto h-auto object-contain"
                width={300}
                height={300}
                layout="responsive"
                loading="lazy"
                // priority={index === 0} // Load the first image eagerly
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </SwiperSlide>
          ))}

        {/* Custom navigation buttons */}
        <div className="swiper-button-prev-custom absolute top-1/2  transform cursor-pointer">
          <ArrowCircleLeft2 size="24" color="#000000" variant="Outline" />
        </div>
        <div className="swiper-button-next-custom absolute top-1/2 transform right-0 cursor-pointer">
          <ArrowCircleRight2 size="24" color="#000000" variant="Outline" />
        </div>
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setActiveThumb}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className="thumb-swiper mt-4"
      >
        {images?.map((image, index) => (
          <SwiperSlide
            className="max-w-[80px] max-h-[80px] hover:border hover:border-black hover:rounded"
            key={index}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index}`}
              className="cursor-pointer"
              width={80}
              height={80}
              layout="responsive"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
