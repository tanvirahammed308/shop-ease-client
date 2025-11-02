"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/features/product/productTunks";

const AdminHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);
  const { users = [],  } = useSelector((state: RootState) => state.auth)

  // product loading
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalProducts = products.length;
  const totalOrders = 350;
  const totalCustomers = users.length; 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-2xl font-bold mt-2">{totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold mt-2">{totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Customers</h2>
            <p className="text-2xl font-bold mt-2">{totalCustomers}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
