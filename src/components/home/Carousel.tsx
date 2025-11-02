'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img from '../../../public/imges/e1.png'

const images = [
  img,
  "https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
 " https://images.unsplash.com/photo-1484704849700-f032a568e944?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"
];

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#e94560",
        }}
      />
    ),
  };

  return (
  <div className="relative w-full h-[350px]  ">
  <Slider {...settings}>
    {images.map((img, i) => (
      <div key={i} className="relative w-full h-[350px] overflow-hidden rounded">
        <Image
          src={img}
          alt={`Banner ${i + 1}`}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-[#e94560] font-bold  text-2xl">Welcome to ShopEase</h1>
          <button
            className="px-6 py-3 text-white font-semibold rounded-lg shadow-lg"
            style={{ backgroundColor: "#e94560" }}
          >
            Shop Now
          </button>
        </div>
      </div>
    ))}
  </Slider>

  <style jsx global>{`
  .slick-prev, .slick-next {
    top: 30%;
    transform: translateY(-50%);
    z-index: 10;
  }

  /* Left arrow  */
  .slick-prev {
    left: 10px; 
  }

  /* Right arrow  */
  .slick-next {
    right: 15px; 
  }

  /* Ensure arrows are visible outside rounded container */
  .slick-slider {
    overflow: visible !important;
  }
`}</style>

</div>


  );
}
