"use client"

import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { fetchProducts } from "@/features/product/productTunks"
import Image from "next/image"
import img from "../../../public/imges/propular-item.jpg"
import ProductCard from "./ProductCard"
import { motion } from "framer-motion"

export default function PopularItem() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  )

  const [slidesToShow, setSlidesToShow] = useState(3) // default desktop

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // ✅ Responsive slides count (manual via useEffect)
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setSlidesToShow(1) // Mobile
      else if (window.innerWidth < 1024) setSlidesToShow(3) // Tablet
      else setSlidesToShow(3) // Desktop
    }

    updateSlides()
    window.addEventListener("resize", updateSlides)
    return () => window.removeEventListener("resize", updateSlides)
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  }

  if (loading) return <p className="text-center py-10">Loading...</p>
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>

  return (
    <motion.div
      className="w-full px-4 py-10 relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="font-bold text-2xl text-[#e94560] mb-6 border-b-4 w-fit pb-2">
        Popular Items
      </h1>

      <div className="flex flex-col md:flex-row item-center  gap-6">
        {/* Left Static Image */}
        <motion.div
          className="w-full md:w-1/3 h-64 md:h-72 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src={img}
            alt="Popular Item"
            width={300}
            height={300}
            className="object-container rounded-xl absolute h-full w-full md:h-[400px] md:w-[350px]"
          />
        </motion.div>

        {/* Right Carousel */}
        <motion.div
          className="w-full md:w-2/3 "
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Slider {...settings}>
            {products.map((product) => (
              <motion.div
              className="px-2"
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </div>

      <style jsx global>{`
        .slick-prev,
        .slick-next {
          top: 40%;
          transform: translateY(-50%);
          z-index: 10;
        }
        .slick-prev:before,
        .slick-next:before {
          color: #e94560;
          font-size: 30px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #e94560 !important;
          opacity: 0.6;
        }
        .slick-dots li.slick-active button:before {
          color: #e94560 !important;
          opacity: 1;
        }
      `}</style>
    </motion.div>
  )
}
