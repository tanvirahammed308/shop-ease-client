import { createSlice } from '@reduxjs/toolkit'
import { ProductState } from './productTypes'
import { createProduct, deleteProduct, fetchProducts, fetchSingleProduct, updateProduct } from './productTunks'

const initialState:ProductState = { 
    products:[],
    loading:false,
    error:null,
    success:null,
    singleProduct:undefined,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductError(state) {
      state.error=null
    },
    clearProductSuccess(state) {
      state.success=null
    },
    clearSingleProduct(state) {
      state.singleProduct=undefined
    },
  },
   extraReducers: (builder) => {
    //----create product---------------
    builder.addCase(createProduct.pending,(state)=>{
        state.loading=true;
        state.error= null;
        state.success= null;

    });
    builder.addCase(createProduct.fulfilled,(state,action)=>{
        state.loading=false;
        state.products.unshift(action.payload);
        state.success='Product created successfully'

    });
    builder.addCase(createProduct.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload || 'Failed to create product'

    });

    //------fetch all products-----------------

    builder.addCase(fetchProducts.pending,(state)=>{
      state.loading=true;
    });

    builder.addCase(fetchProducts.fulfilled,(state,action)=>{
      state.loading=false;
      state.products=action.payload;
    });

    builder.addCase(fetchProducts.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload || 'Failed to fetch  products'
    });

    //-------------fetch single product-----------------

    builder.addCase(fetchSingleProduct.pending,(state)=>{
      state.loading=true;
      state.singleProduct=undefined;
    });

    builder.addCase(fetchSingleProduct.fulfilled,(state,action)=>{
      state.loading=false;
      state.singleProduct=action.payload;
    });

    builder.addCase(fetchSingleProduct.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload || 'Failed to fetch product';
    });

    //----------delete product----------------

    builder.addCase(deleteProduct.pending,(state)=>{
      state.error= null;
      state.success= null;
    })

    builder.addCase(deleteProduct.fulfilled,(state,action)=>{

      state.products=state.products.filter((p)=>p.slug !==action.payload);
      state.success='Product delete successfully';
    });

    builder.addCase(deleteProduct.rejected,(state,action)=>{
      state.error=action.payload || 'Failed to delete product'
    });

    //---------------update product------------------

    builder.addCase(updateProduct.pending,(state)=>{

      state.loading= true;
      state.error= null;
      state.success= null;
    });


    builder.addCase(updateProduct.fulfilled,(state,action)=>{

      state.products=state.products.map((p)=>p.slug === action.payload.slug ? action.payload : p);

      state.success='Product updated successfully';
    });

    builder.addCase(updateProduct.rejected,(state,action)=>{

      state.error=action.payload || "Failed to update product"
    });

  },
})

export const { clearProductError, clearProductSuccess, clearSingleProduct } = productSlice.actions
export default productSlice.reducer