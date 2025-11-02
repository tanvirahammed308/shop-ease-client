"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  clearProductError,
  clearProductSuccess,
} from "@/features/product/productSlice";
import { deleteProduct, fetchProducts } from "@/features/product/productTunks";
import { Product } from "@/features/product/productTypes";

const AllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, success } = useSelector(
    (state: RootState) => state.product
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; 

  // Fetch products

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
    if (success) {
      toast.success(success);
      dispatch(clearProductSuccess());
    }
  }, [error, success, dispatch]);

  const handleDelete = (slug: string | undefined) => {
    if (!slug) return;
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(slug));
    }
  };

  //  Pagination logic

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {loading && <p>Loading...</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Categories</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              currentProducts.map((product: Product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {product.photos?.[0] ? (
                      <Image
                        src={product.photos[0]}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">${product.price}</td>
                  <td className="px-4 py-2 border">
                    {typeof product.inStock === "number"
                      ? product.inStock > 0
                        ? "In Stock"
                        : "Out of Stock"
                      : product.inStock
                      ? "In Stock"
                      : "Out of Stock"}
                  </td>
                  <td className="px-4 py-2 border">{product.status}</td>
                  <td className="px-4 py-2 border">
                    {product.categories?.join(", ")}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/update-product/${product.slug}`}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(product.slug)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*  Pagination Controls */}
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
