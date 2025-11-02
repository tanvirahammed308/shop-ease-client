import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

export default function Footer() {
  
  return (
    <footer className="bg-[#0f3460] text-gray-200 pt-10 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row space-x-5">

        {/* Logo */}
        <div className="w-full md:w-1/4">
          <h2 className="text-2xl font-bold text-[#e94560] mb-4">ShopEase</h2>
          <p className="text-gray-400">
            Making your online shopping easy and convenient. Quality products at the best prices.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 md:pl-28 mt-10 md:mt-0">
            {/* About Us */}
        <div>
          <h3 className="text-md font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-blue-500 transition">Our Story</Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-blue-500 transition">Team</Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-blue-500 transition">Careers</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-500 transition">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-md font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="hover:text-blue-500 transition">FAQ</Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-blue-500 transition">Shipping</Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-blue-500 transition">Returns</Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-blue-500 transition">Support</Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-md font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">123 Main Street, Dhaka, Bangladesh</p>
          <p className="text-gray-400">Email: support@shopease.com</p>
          <p className="text-gray-400">Phone: +880 1234 567890</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="hover:text-blue-500">
              <FiFacebook size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-500">
              <FiTwitter size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-500">
              <FiInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-500 ">
              <FiYoutube size={20} />
            </Link>
          </div>
        </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
