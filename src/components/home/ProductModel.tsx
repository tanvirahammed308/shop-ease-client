"use client"

import { Product } from '@/features/product/productTypes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import ReactDOM from 'react-dom'

interface ProductModalProps {
    product: Product | null
    onClose: () => void
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!product || !mounted) return null

    const modalContent = (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-70 flex justify-center items-start sm:items-center overflow-auto">
            <div className="bg-white w-[80%] md:w-[30%] md:h-[70%] sm:max-w-3xl h-auto sm:h-[90%] mt-10 sm:mt-0 rounded-xl shadow-lg relative flex flex-col">

                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-500 z-50"
                    onClick={onClose}
                >
                    <FaTimes size={28} />
                </button>

                {/* Product image */}
                <div className="w-full h-64 sm:h-1/2 relative rounded-t-xl overflow-hidden">
                    <Image
                        src={product.photos[0] || '/placeholder.png'}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Product info */}
                <div className="p-6 overflow-auto flex-1">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-gray-700 mt-3">{product.description}</p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="text-xl font-semibold text-[#e94560]">
                            ${product.price - (product.discount ?? 0)}
                        </span>
                        {product.discount && (
                            <span className="line-through text-gray-400 text-sm">
                                ${product.price}
                            </span>
                        )}
                    </div>

                    <div className="mt-4">
                        <span
                            className={`px-3 py-1 text-sm rounded-full ${
                                product.inStock
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-red-100 text-red-600'
                            }`}
                        >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

    // Render modal content using React Portal
    return ReactDOM.createPortal(modalContent, document.body)
}

export default ProductModal
