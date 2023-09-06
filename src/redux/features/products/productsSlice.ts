import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ProductStageType } from '~/redux/features/products/productType'
import { getAProduct, getAllProducts, rateProduct } from './productsService'
import { toast } from 'react-toastify'

const initialProduct = {
   _id: '',
   title: '',
   totalRating: 0,
   slug: '',
   ratings: [],
   sold: 0,
   price_after_discount: 0,
   tags: '',
   images: [],
   description: '',
   price: 0,
   quantity: 0,
   category: '',
   brand: '',
   color: [],
}

const initialState: ProductStageType = {
   productList: [],
   product: initialProduct,
   isError: false,
   isLoading: false,
   isSuccess: false,
}

export const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.productList = action.payload
            if (action.payload) {
               const result = action.payload.map((data: any) => {
                  const filterData = {
                     _id: data?._id,
                     title: data?.title,
                     totalRating: data?.totalRating,
                     slug: data?.slug,
                     ratings: data?.ratings,
                     sold: data?.sold,
                     discountCode: data?.discountCode,
                     price_after_discount: data?.price_after_discount,
                     tags: data?.tags,
                     images: data?.images.map((img: any) => {
                        const fItem = {
                           url: img?.url,
                        }
                        return fItem
                     }),
                     description: data?.description,
                     price: data?.price,
                     quantity: data?.quantity,
                     category: data?.category,
                     brand: data?.brand,
                  }
                  return filterData
               })
               state.productList = [...result]
            }
         })
         .addCase(getAllProducts.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })

         .addCase(getAProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAProduct.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            if (action.payload) {
               const result = action.payload
               const data = {
                  _id: result?._id,
                  title: result?.title,
                  totalRating: result?.totalRating,
                  slug: result?.slug,
                  ratings: [],
                  sold: result?.sold,
                  discountCode: result?.discountCode
                     ? {
                          _id: result?.discountCode?._id,
                          name: result?.discountCode?.name,
                          expiry: result?.discountCode?.expiry,
                          percentage: result?.discountCode?.percentage,
                       }
                     : undefined,
                  price_after_discount: result?.price_after_discount,
                  tags: result?.tags,
                  images: result?.images?.map((item: any) => {
                     const fItem = {
                        url: item?.url,
                     }
                     return fItem
                  }),
                  description: result?.description,
                  price: result?.price,
                  quantity: result?.quantity,
                  category: result?.category,
                  brand: result?.brand,
                  color: result?.color?.map((item: any) => {
                     const fItem = {
                        _id: item?._id,
                        title: item?.title,
                     }
                     return fItem
                  }),
               }
               state.product = data
            }
         })
         .addCase(getAProduct.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Product get failed!')
         })
         .addCase(rateProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(rateProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Sent.')
            state.product = action.payload
         })
         .addCase(rateProduct.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Something went wrong')
         })
   },
})

export default productSlice.reducer
