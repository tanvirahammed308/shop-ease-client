'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import toast from 'react-hot-toast';
import { clearProductError, clearProductSuccess } from '@/features/product/productSlice';
import { createProduct } from '@/features/product/productTunks';
import Image from 'next/image';

type ProductFormInputs = {
  name: string;
  description: string;
  price: number;
  discount?: number;
  inStock?: boolean; 
  status?: 'active' | 'inactive';
  categories: string;
  photos: FileList;
};

const CreateProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.product);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<ProductFormInputs>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const watchPhotos = watch('photos');

  // Generate image previews
  useEffect(() => {
    if (!watchPhotos || watchPhotos.length === 0) {
      setImagePreviews([]);
      return;
    }

    const previews: string[] = Array.from(watchPhotos).map(file => URL.createObjectURL(file));
    setImagePreviews(previews);

    // Cleanup to avoid memory leaks
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [watchPhotos]);

  // Handle toast messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
    if (success) {
      toast.success(success);
      dispatch(clearProductSuccess());
      reset();
      setImagePreviews([]);
    }
  }, [error, success, dispatch, reset]);

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    if (data.discount !== undefined) formData.append('discount', data.discount.toString());
    formData.append('inStock', (data.inStock ? 'true' : 'false'));
    if (data.status) formData.append('status', data.status);
    formData.append('categories', data.categories);

    if (data.photos && data.photos.length > 0) {
      Array.from(data.photos).forEach(file => formData.append('photos', file));
    }

    dispatch(createProduct(formData));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Product name is required' })}
            className="w-full border rounded px-3 py-2 outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full border rounded px-3 py-2 outline-none"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required' })}
            className="w-full border rounded px-3 py-2 outline-none"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Discount */}
        <div>
          <label className="block mb-1">Discount (%)</label>
          <input
            type="number"
            step="0.01"
            {...register('discount')}
            className="w-full border rounded px-3 py-2 outline-none"
          />
        </div>

        {/* In Stock */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('inStock')}
            onChange={e => setValue('inStock', e.target.checked)}
          />
          <label>Available</label>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1">Status</label>
          <select {...register('status')} className="w-full border rounded px-3 py-2 outline-none">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Categories */}
        <div>
          <label className="block mb-1">Categories (comma separated)</label>
          <input
            type="text"
            {...register('categories', { required: 'At least one category is required' })}
            className="w-full border rounded px-3 py-2 outline-none"
          />
          {errors.categories && <p className="text-red-500 text-sm">{errors.categories.message}</p>}
        </div>

        {/* Photos */}
        <div>
          <label className="block mb-1">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register('photos')}
            className="w-full border p-2 rounded"
          />
          <div className="flex mt-2 gap-2 flex-wrap">
            {imagePreviews.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                width={80}
                height={80}
                className="h-20 w-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#e94560] text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
