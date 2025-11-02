import { createSlice } from "@reduxjs/toolkit"
import { CartState } from "./cartTypes"
import { addToCart, clearCart, fetchCart, removeCart } from "./cartThunks";

const initialState:CartState = { 
    cart: null,
    loading: false,
    error: null,
    success:null,

 }

const cartSlice=createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetCartState:(state)=>{
        state.error=null;
        state.success=null;
    }
  },
  extraReducers: (builder) => {
    builder

    //---------fetch cart-----------

   .addCase(fetchCart.pending, (state) => {
    state.loading = true;
    state.error = null;
       
      })

    .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.success="Cart fetched successfully";
      })
    
    .addCase(fetchCart.rejected, (state, action) => {
       state.loading=false;
       state.error=action.payload as string;
      })

    //------add to cart -----------//

    .addCase(addToCart.pending, (state) => {
       state.loading=true;
       state.error=null;
      })

    .addCase(addToCart.fulfilled, (state, action) => {
         state.loading = false;
                state.cart = action.payload;
                state.success = "Item added to cart";
      })

    .addCase(addToCart.rejected, (state, action) => {
        state.loading=false;
        state.error=action.payload as string;
      })

      //-----remove cart -----------//

      

      .addCase(removeCart.fulfilled, (state, action) => {
        
        state.cart=action.payload;
        state.success="Product removed successfully"
      })

      .addCase(removeCart.rejected, (state, action) => {
        
       
        state.error=action.payload as string;
      })

      //----------clear cart -----------//

      

      .addCase(clearCart.fulfilled, (state) => {
       state.cart=null;
       state.success="Cart cleared successfully"

      })

      .addCase(clearCart.rejected, (state, action) => {
        
        state.error=action.payload as string;
      })
      
  },
})

export const { resetCartState } = cartSlice.actions
export default cartSlice.reducer