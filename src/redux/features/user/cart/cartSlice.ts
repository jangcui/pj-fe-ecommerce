import { createSlice } from '@reduxjs/toolkit'
import { addToCart, emptyCart, getCart, removeProductFromCart, updateQuantityProductFromCart } from './cartService'
import type { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export type CartType = {
   _id: string
   quantity: number
   price: number
   productId: {
      _id: string
      slug: string
      title: string
      price_after_discount: number
      price: number
      discountCode?: string
      image: string
   }
   color: {
      title: string
      _id: string
   }
}

interface InitialState {
   productList: CartType[]
   quantity: number
   totalPrice: number
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}

const initialState: InitialState = {
   productList: [],
   quantity: 0,
   totalPrice: 0,
   isError: false,
   isLoading: false,
   isSuccess: false,
}

export const authSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(addToCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(addToCart.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Product added to cart')
         })
         .addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload.message)
         })
         .addCase(getCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCart.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
               state.isError = false
               state.isLoading = false
               state.isSuccess = true
               const result = action?.payload?.map((data: any) => {
                  const filterData = {
                     _id: data?._id,
                     price: data?.price,
                     quantity: data?.quantity,
                     productId: {
                        _id: data?.productId?._id,
                        title: data?.productId?.title,
                        slug: data?.productId?.slug,
                        price_after_discount: data?.productId?.price_after_discount,
                        price: data?.productId?.price,
                        image: data?.productId?.images[0]?.url,
                     },
                     color: { _id: data?.color?._id, title: data?.color?.title },
                  }
                  return filterData
               })
               state.productList = [...result]
            }
            state.totalPrice = action?.payload?.reduce((accumulator: number, item: CartType) => {
               const totalOrigin = item?.productId?.price * item?.quantity
               const totalAfterDiscount = item?.productId?.price_after_discount * item?.quantity
               return accumulator + (item?.productId?.discountCode ? totalAfterDiscount : totalOrigin)
            }, 0)
         })
         .addCase(getCart.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Cart get failed')
         })

         .addCase(removeProductFromCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(removeProductFromCart.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Product removed from cart')
         })
         .addCase(removeProductFromCart.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Something went wrong')
         })
         .addCase(emptyCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(emptyCart.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.info('Cart Empty Now')
         })
         .addCase(emptyCart.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Something went wrong')
         })
         .addCase(updateQuantityProductFromCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateQuantityProductFromCart.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(updateQuantityProductFromCart.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
   },
})

export default authSlice.reducer
