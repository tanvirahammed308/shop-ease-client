'use client'

import { useSelector } from 'react-redux'
import {  RootState } from '@/redux/store'


const DashboardHome = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  /* console.log('user',user); */

  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold">
          Welcome back, <span className="text-blue-600">{user?.name || "User"}</span>
        </h1>
        <p className="text-gray-600">Here’s an overview of your account.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center shadow">
          <h2 className="text-lg font-semibold">Wishlist</h2>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center shadow">
          <h2 className="text-lg font-semibold">Cart Items</h2>
          <p className="text-2xl font-bold"> {cart?.items?.length || 0}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            View Orders
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Wishlist
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
