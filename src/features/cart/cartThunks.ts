import { createAsyncThunk } from "@reduxjs/toolkit";
import {  AddToCartPayload, Cart } from "./cartTypes";
import axiosInstance from "../../api/axiosIntance";
import { AxiosError } from "axios";

// Get cart
export const fetchCart = createAsyncThunk<Cart, void>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/carts/get-cart");
      return data.cart as Cart;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);


// Add to cart - FIXED & supports cached product data
export const addToCart = createAsyncThunk<Cart, AddToCartPayload>(
  "cart/addToCart",
  async ({ productId, name, price, photos, quantity }, { rejectWithValue }) => {
    try {
      const cleanProductId =
        typeof productId === "string" ? productId : String(productId);

      //  Send cached product info to backend (optional for frontend use)
      const { data } = await axiosInstance.post(
        "/carts/add-cart",
        {
          productId: cleanProductId,
          name,
          price,
          image: photos, 
          quantity,
        },
        { withCredentials: true }
      );

      return data.cart as Cart;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);


// Remove from cart - FIXED
export const removeCart = createAsyncThunk<Cart, string>(
  "cart/removeCart",
  async (productId, { rejectWithValue }) => {
    try {
      // Ensure productId is a string, not an object
      const cleanProductId = typeof productId === 'string' ? productId : String(productId)
      
      /* console.log('Removing from backend - productId:', cleanProductId) */
      
      const { data } = await axiosInstance.delete(`/carts/remove-cart/${cleanProductId}`);
      return data.cart as Cart;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to remove from cart");
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk<string, void>(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete("/carts/remove-all-cart");
      return data.message as string;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to clear cart");
    }
  }
);
