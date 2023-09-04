import { createSlice } from '@reduxjs/toolkit'
import { toggleWWishListProduct, getUserWishList } from './wishListService'
import type { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

interface ProductType {
   prodId: string
   slug: string
   price: number
   discountCode: string
   price_after_discount: number
   title: string
   image: string
   brand: string
}

interface UserStageType {
   wishList: ProductType[]
   product: ProductType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}

const initialState: UserStageType = {
   wishList: [],
   product: {
      prodId: '',
      slug: '',
      price: 0,
      discountCode: '',
      price_after_discount: 0,
      title: '',
      image: '',
      brand: '',
   },
   isError: false,
   isLoading: false,
   isSuccess: false,
}

export const authSlice = createSlice({
   name: 'wishList',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(toggleWWishListProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(toggleWWishListProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.info(action.payload.message)
         })
         .addCase(toggleWWishListProduct.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            toast.error('Some Thing Went Wrong')
         })
         .addCase(getUserWishList.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getUserWishList.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
               state.isError = false
               state.isLoading = false
               state.isSuccess = true
               const result = action?.payload?.map((data: any) => {
                  const filterData = {
                     prodId: data?._id,
                     slug: data?.slug,
                     price: data?.price,
                     discountCode: data?.discountCode,
                     price_after_discount: data?.price_after_discount,
                     title: data?.title,
                     image: data?.images[0]?.url,
                     brand: data?.brand,
                  }
                  return filterData
               })

               state.wishList = [...result]
            }
         })
         .addCase(getUserWishList.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
   },
})

export default authSlice.reducer
