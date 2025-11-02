'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import toast from 'react-hot-toast';
import { clearProductError, clearProductSuccess } from '@/features/product/productSlice';
import { fetchSingleProduct, updateProduct } from '@/features/product/productTunks';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'; 

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

const UpdateProduct = () => {
  const { slug } = useParams(); 
  const router = useRouter(); 
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success, singleProduct } = useSelector((state: RootState) => state.product);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductFormInputs>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const watchPhotos = watch('photos');

  //  Load product details
  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug as string));
    }
  }, [slug, dispatch]);

  // Prefill form
  useEffect(() => {
    if (singleProduct) {
      reset({
        name: singleProduct.name,
        description: singleProduct.description,
        price: singleProduct.price,
        discount: singleProduct.discount,
        inStock: singleProduct.inStock,
        status: singleProduct.status,
        categories: singleProduct.categories?.join(','),
      });
      setImagePreviews(singleProduct.photos || []);
    }
  }, [singleProduct, reset]);

  //  Preview new images

  useEffect(() => {
    if (watchPhotos && watchPhotos.length > 0) {
      const previews: string[] = [];
      Array.from(watchPhotos).forEach((file) => {
        previews.push(URL.createObjectURL(file));
      });
      setImagePreviews(previews);
    }
  }, [watchPhotos]);

  //  Handle error/success

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
    if (success) {
      toast.success(success);
      dispatch(clearProductSuccess());
      router.push('/admin/all-products'); 
    }
  }, [error, success, dispatch, router]);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    if (data.discount !== undefined) formData.append('discount', data.discount.toString());
    if (data.inStock !== undefined) formData.append('inStock', String(data.inStock));
    if (data.status) formData.append('status', data.status);
    formData.append('categories', data.categories);

    if (data.photos && data.photos.length > 0) {
      Array.from(data.photos).forEach((file) => {
        formData.append('photos', file);
      });
    }

    dispatch(updateProduct({ slug: slug as string, formData }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
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
            onChange={(e) => setValue('inStock', e.target.checked)}
          />
          <label>Available</label>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1">Status</label>
          <select {...register('status')} className="w-full border rounded px-3 py-2 outline-none ">
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
          <input type="file" multiple {...register('photos')} className="w-full border p-2 rounded" />
          <div className="flex mt-2 gap-2 flex-wrap">
            {imagePreviews.map((src, idx) => (
              <Image key={idx} src={src} alt="preview" className="h-20 w-20 object-cover rounded" width={80} height={80} />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#e94560] text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
