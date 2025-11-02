"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { fetchCart, addToCart, removeCart, clearCart } from "@/features/cart/cartThunks";
import { RootState, AppDispatch } from "@/redux/store";
import { CartItem } from "@/features/cart/cartTypes";

// Type for the actual data we receive from API (which might have object productId)
interface ApiCartItem extends Omit<CartItem, 'productId'> {
  productId: string | { _id?: string };
}

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);
  const items = cart?.items || [];

  useEffect(() => { 
    dispatch(fetchCart()); 
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // ✅ FIXED: Safe product ID extraction
  const getProductId = (item: ApiCartItem): string => {
    // If productId is a string, use it directly
    if (typeof item.productId === 'string') {
      return item.productId;
    }
    
    // If productId is an object, extract the _id
    if (item.productId && typeof item.productId === 'object' && item.productId._id) {
      return item.productId._id;
    }
    
    // Fallback to empty string if no valid ID found
    console.error("Could not extract product ID from:", item);
    return '';
  };

  const handleIncrease = async (item: ApiCartItem) => {
    const productId = getProductId(item);
    
    if (!productId) {
      toast.error("Invalid product data");
      return;
    }

    try {
      await dispatch(addToCart({
        productId,
        name: item.name,
        price: item.price,
        photos: item.image || "", 
        quantity: 1,
      })).unwrap();
      toast.success("Item increased");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update cart";
      toast.error(errorMessage);
    }
  };

  const handleDecrease = async (item: ApiCartItem, quantity: number) => {
    const productId = getProductId(item);
    
    if (!productId) {
      toast.error("Invalid product data");
      return;
    }

    try {
      if (quantity <= 1) {
        await dispatch(removeCart(productId)).unwrap();
        toast.success("Item removed from cart");
      } else {
        await dispatch(addToCart({
        productId,
        name: item.name,
        price: item.price,
        photos: item.image || "", 
        quantity: -1,
      })).unwrap();
        toast.success("Item decreased");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update cart";
      toast.error(errorMessage);
    }
  };

  const handleRemoveItem = async (item: ApiCartItem) => {
    const productId = getProductId(item);
    
    if (!productId) {
      toast.error("Invalid product data");
      return;
    }

    try {
      await dispatch(removeCart(productId)).unwrap();
      toast.success("Item removed from cart");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to remove item";
      toast.error(errorMessage);
    }
  };

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart()).unwrap();
      toast.success("Cart cleared successfully");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to clear cart";
      toast.error(errorMessage);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            {items.length > 0 && (
              <button 
                onClick={handleClearCart}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                disabled={loading}
              >
                <FaTrash />
                Clear Cart
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-lg">Loading cart...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(items as ApiCartItem[]).map((item, index) => {
                const productId = getProductId(item);
                
                return (
                  <div key={productId || index} className="flex justify-between items-center border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative w-20 h-20">
                        <Image 
                          src={item.image || "/placeholder.png"} 
                          alt={item.name} 
                          fill
                          className="object-cover rounded"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => handleDecrease(item, item.quantity)}
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                            disabled={loading}
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleIncrease(item)}
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                            disabled={loading}
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => handleRemoveItem(item)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        disabled={loading}
                      >
                        <IoMdCloseCircleOutline size={24} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-lg">
              <span>Total Items:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Total Price:</span>
              <span className="font-bold text-green-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={items.length === 0 || loading}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;