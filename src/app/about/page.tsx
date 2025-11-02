import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className=" min-h-screen">
      {/*  Hero Section */}
      <section className="text-center py-16 px-4 sm:px-6 text-[#e94560] ">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About ShopEase</h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Making online shopping simple, secure, and enjoyable for everyone.
        </p>
      </section>

      {/*  About Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
            alt="ShopEase online shopping illustration"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Welcome to <strong>ShopEase</strong> — your one-stop destination for a smooth,
            simple, and secure online shopping experience. We believe shopping should
            be easy, enjoyable, and accessible for everyone.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            From fashion to electronics, groceries to home essentials — we bring the
            best products to your doorstep at unbeatable prices. Our dedicated team
            ensures fast delivery, responsive support, and full satisfaction with every
            order.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            At ShopEase, we blend technology with trust to give you the future of online
            shopping — simple, secure, and smart.
          </p>
        </div>
      </main>

      {/*  Mission Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f3460] mb-10">
            Our Mission & Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#0f3460]">
                Customer First
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We focus on creating an exceptional shopping experience with every
                product you order.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#0f3460]">
                Innovation
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We continuously improve our platform with cutting-edge technologies to
                ensure smooth performance.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#0f3460]">
                Trust & Quality
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We partner only with trusted suppliers to bring you premium-quality
                products you can rely on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-4 sm:px-6 bg-[#0f3460] text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Join the ShopEase Community Today
        </h2>
        <p className="text-base sm:text-lg text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed">
          Discover how easy online shopping can be. Shop smarter with ShopEase.
        </p>
        <a
          href="/shop"
          className="inline-block bg-white text-[#e94560] font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-blue-100 transition"
        >
          Start Shopping
        </a>
      </section>
    </div>
  );
};

export default About;
