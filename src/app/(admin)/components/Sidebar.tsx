'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname=usePathname()
    const links=[
        {
            name:"Home",
            path:'/admin'
        },
        {
            name:"Create Product",
            path:'/admin/create-product'
        },
        {
            name:"All Products",
            path:'/admin/all-products'
        },
        {
            name:"All Users",
            path:'/admin/all-users'
        },
    ]
  return (
    <aside className='w-64 min-h-screen p-6 bg-white shadow-md'>
        <h1 className='text-xl font-bold mb-6'>Admin Dashboard</h1>
        <ul>
            {
                links.map((link)=><li key={link.name}>
                   <Link href={link.path} className={`block rounded px-3 py-2 ${
                    pathname==link.path ?  'bg-[#e94560] text-white':'text-gray-700 hover:text-[#e94560]'}`}>{link.name}</Link>

                </li>)
            }
        </ul>
    </aside>
  )
}

export default Sidebar