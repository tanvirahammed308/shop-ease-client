'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';

import ProductCard from '@/components/home/ProductCard';
import { fetchProducts } from '@/features/product/productTunks';

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Fetch products when page loads
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Filter products when selectedCategory or products change
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.categories?.includes(selectedCategory))
      );
    }
  }, [selectedCategory, products]);

  const uniqueCategories = Array.from(
    new Set(products.flatMap((p) => p.categories || []))
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full border ${
            !selectedCategory ? 'bg-[#e94560] text-white' : 'bg-white text-gray-700'
          }`}
        >
          All
        </button>

        {uniqueCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category ? 'bg-[#e94560] text-white' : 'bg-white text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-500">Loading products...</p>}

      {/* Products Grid */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
