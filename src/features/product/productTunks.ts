import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./productTypes";
import axiosInstance from "@/api/axiosIntance";
import { AxiosError } from "axios";

//------------product create---------------

export const createProduct = createAsyncThunk<Product,FormData,{ rejectValue:string }>(
  "product/createProduct",
  async (formData:FormData, { rejectWithValue }) => {
   
    try {
      const{data} = await axiosInstance.post('/products/create-product',formData);
      return data.product as Product;
    } catch (err) {
        const error=err as AxiosError<{message:string}>
      
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

//-----------fetch all product------------------

export const fetchProducts = createAsyncThunk<Product[],void,{ rejectValue:string }>(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
   
    try {
      const {data} = await axiosInstance.get('/products/all-products')
      return data.products as Product[]
    } catch (err) {
      const error=err as AxiosError<{message:string}>
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products")
    }
  },
)

//------------fetch single product----------

export const fetchSingleProduct = createAsyncThunk<Product,string, { rejectValue:string }>(
  'product/fetchSingleProduct',
  async (slug, { rejectWithValue }) => {
   
    try {
      const {data}= await axiosInstance(`products/product/${slug}`)
      return data.product as Product;
    } catch (err) {
      const error=err as AxiosError<{message:string}>
      return rejectWithValue(error.response?.data?.message || "Failed to fetch product")
    }
  },
)

//-----------------product delete-----------------

export const deleteProduct = createAsyncThunk<string,string,{ rejectValue:string }>(
  'product/deleteProduct',
  async (slug, { rejectWithValue }) => {
  
    try {
       await axiosInstance.delete(`products/delete-product/${slug}`)
      return slug
    } catch (err) {
      const error=err as AxiosError<{message:string}>
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product')
    }
  },
)

//----------update product-------------------

export const updateProduct = createAsyncThunk<
  Product,
  { slug: string; formData: FormData },
  { rejectValue: string }
>(
  "product/updateProduct",
  async ({ slug, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/products/update-product/${slug}`, formData);
      return data.product as Product;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
  }
);