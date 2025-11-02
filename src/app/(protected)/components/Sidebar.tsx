'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
    const pathname=usePathname();
  const links = [
    {
      name: "Home",
      path: "/dashboard",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
    },
    {
      name: "Carts",
      path: "/dashboard/cart",
    },
    {
      name: "Setting",
      path: "/dashboard/setting",
    },
  ];
  return <aside className="w-64 p-6 bg-white shadow-md min-h-screen">
    <h1 className="text-xl font-bold mb-6">Dashboard</h1>
    <ul>
        {
            links.map((link)=><li key={link.name}>
                <Link href={link.path} className={`block px-3 py-2 rounded ${pathname ===link.path ? 'bg-[#e94560] text-white':'text-gray-700 hover:text-[#e94560]'}`}>
                {
                    link.name
                }
                </Link>

            </li>)
        }
    </ul>
  </aside>;
};

export default Sidebar;
