'use client'

import { fetchProducts } from '@/features/product/productTunks'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import ProductCard from './ProductCard'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function TrendingCarousel() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, error } = useSelector((state: RootState) => state.product)

 /*  console.log("products",products) */
  const [slidesToShow, setSlidesToShow] = useState(4)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Responsive slides count
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setSlidesToShow(1)   // Mobile
      else if (window.innerWidth < 1024) setSlidesToShow(2) // Tablet
      else setSlidesToShow(4) // Desktop
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
    autoplaySpeed: 2500,
    arrows: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul style={{ margin: 0 }}>{dots}</ul>
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
  }

  if (loading) return <p className="text-center py-10">Loading...</p>
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>

  return (
    <div className="w-full px-4 py-5 relative">
      <h1 className="font-bold text-2xl text-[#e94560] mb-5 border-b-4 w-fit pb-2">
        Trending Products
      </h1>

      <Slider {...settings} className="!overflow-visible">
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        .slick-prev, .slick-next {
          top: 40%;
          transform: translateY(-50%);
          z-index: 10;
        }
        .slick-prev:before, .slick-next:before {
          color: #e94560;
          font-size: 30px;
        }
        .slick-slider {
          overflow: visible !important;
        }
      `}</style>
    </div>
  )
}
