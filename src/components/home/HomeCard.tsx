'use client'
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import cardImg1 from '../../../public/imges/home-card/home-card1.jpg'
import cardImg2 from '../../../public/imges/home-card/home-card2.jpg'
import cardImg3 from '../../../public/imges/home-card/home-card3.jpg'

const cards = [
  {
    title: "Wireless Headphones",
    desc: "High quality sound with noise cancellation.",
    img: cardImg1,
  },
  {
    title: "Smart Watch",
    desc: "Track your fitness and notifications on the go.",
    img: cardImg2,
  },
  {
    title: "Gaming Console",
    desc: "Experience next-gen gaming with powerful performance.",
    img: cardImg3,
  },
];

export default function HomeCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-10">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className="relative h-[200px] w-full rounded-2xl overflow-hidden shadow-lg group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Background Image */}
          <Image
            src={card.img}
            alt={card.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Overlay */}
          <div className="absolute inset-0 transition-colors duration-500 flex flex-col justify-center items-center text-center px-4">
            <motion.h2
              className="text-2xl font-bold text-[#e94560] mb-2"
              whileHover={{ scale: 1.1 }}
            >
              {card.title}
            </motion.h2>
            <p className="text-[#e94560] text-sm mb-4">{card.desc}</p>
            <motion.button
              className="px-5 py-2 rounded-lg bg-[#e94560] text-white font-semibold hover:bg-[#d3344f] transition"
              whileTap={{ scale: 0.9 }}
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
