'use client';

import { Product } from '@/features/product/productTypes';
import Image from 'next/image';
import React, {  useState } from 'react';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import ProductModel from './ProductModel';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartThunks';
import { AppDispatch } from '@/redux/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log(product)
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch<AppDispatch>();



const handleAddToCart = async () => {
  try {
    await dispatch(
      addToCart({
        productId: product._id!,
        name: product.name,
        price: product.price,
        photos: product.photos[0],
        quantity: 1,
      })
    ).unwrap();

    toast.success(" Item added to cart successfully!");
  } catch (err: unknown) {
    // Type guard
    if (err instanceof Error) {
      toast.error(err.message);
    } else {
      toast.error(" Failed to add to cart");
    }
  }
};




  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition mt-5 flex flex-col h-full'>
      <div className='relative w-full h-48'>
        <Image
  src={product.photos?.[0] || '/placeholder.png'}
  alt={product.name}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
      </div>

      <div className='p-4   flex flex-col '>

        <h2 className='text-lg font-semibold h-16'>{product.name}</h2>
        
        <p className='text-sm text-gray-500 line-clamp-2 '>
          {product.description}
        </p>

        <div className='mt-3 flex items-center justify-between'>
          <div>
            <span className='text-xl font-bold text-[#e94560]'>
              ${product.price - (product.discount || 0)}
            </span>
            {product.discount && (
              <span className='ml-2 text-sm line-through text-gray-400'>
               {product.price ? `$${product.price.toFixed(2)}` : 'N/A'}
              </span>

            )}
          </div>
          <span
            className={`px-3 py-1 text-xs rounded-full ${
              product.inStock
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className='mt-3 flex items-center justify-between'>
          <button
            className='bg-[#e94560] p-2 rounded-full'
            onClick={() => setShowModel(true)}
          >
            <FaEye className='text-white' />
          </button>
          <button
            className='bg-[#e94560] p-2 rounded-full'
            onClick={handleAddToCart}
          >
            <FaShoppingCart className='text-white' />
          </button>
        </div>
      </div>

      {showModel && (
        <ProductModel product={product} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default ProductCard;
