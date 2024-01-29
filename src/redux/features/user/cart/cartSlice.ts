import { addToCart, emptyCart, getCart, removeProductFromCart, updateQuantityProduct } from './cartService'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export type CartType = {
   _id: string
   quantity: number
   inCart: boolean
   total: number
   product: {
      _id: string
      slug: string
      title: string
      price_after_discount: number
      price: number
      discountCode?: string
      thumb: string
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

const convertInteger = (num1: number, num2: number) => {
   let total = num1 * num2

   if (!Number.isInteger(total)) {
      total = parseFloat(total.toFixed(2)) // convert integer to decimal
   }
   return total
}

export const cartSlice = createSlice({
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
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            const payload = action?.payload?.metadata
            if (payload) {
               const results = payload?.cart_products?.map((data: CartType) => {
                  const filterData = {
                     _id: data?._id ? data?._id : 'GUEST',
                     quantity: data?.quantity,
                     total: data?.product?.discountCode
                        ? convertInteger(data?.quantity, data?.product?.price_after_discount)
                        : convertInteger(data?.quantity, data?.product?.price),
                     product: {
                        _id: data?.product?._id,
                        title: data?.product?.title,
                        discountCode: data?.product?.discountCode,
                        slug: data?.product?.slug,
                        price_after_discount: data?.product?.price_after_discount,
                        price: data?.product?.price,
                        thumb: data?.product?.thumb,
                     },
                     color: {
                        _id: data?.color?._id,
                        title: data?.color?.title,
                     },
                  }
                  return filterData
               })
               state.productList = [...results]
               state.totalPrice = convertInteger(1, payload?.total_price)
               state.quantity = payload?.total_quantity || payload?.cart_products.length
            } else {
               return state
            }
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
         .addCase(updateQuantityProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateQuantityProduct.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(updateQuantityProduct.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
   },
})

export default cartSlice.reducer
