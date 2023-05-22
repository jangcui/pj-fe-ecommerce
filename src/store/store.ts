import { configureStore } from '@reduxjs/toolkit'

import authReducer from '~/features/admin/adminSlice'
import customerReducer from '~/features/customers/customerSlice'
import productsReducer from '~/features/products/productsSlice'
import brandsReducer from '~/features/brands/brandsSlice'
import prodCateReducer from '~/features/prodCategories/prodCateSlice'
import colorReducer from '~/features/colors/colorSlice'
import blogReducer from '~/features/blogs/blogsSlice'
import blogCateReducer from '~/features/blogCategories/blogCateSlice'
import enquiryReducer from '~/features/enquiry/enquirySlice'
import couponReducer from '~/features/coupon/couponSlice'
import orderReducer from '~/features/orders/ordersSlice'
import uploadReducer from '~/features/upload/uploadSlice'
import trashReducer from '~/features/trashBin/trashBinSlice'

export const store = configureStore({
   reducer: {
      auth: authReducer,
      customer: customerReducer,
      products: productsReducer,
      brands: brandsReducer,
      prodCates: prodCateReducer,
      colors: colorReducer,
      blogs: blogReducer,
      blogCates: blogCateReducer,
      enquiries: enquiryReducer,
      orders: orderReducer,
      uploads: uploadReducer,
      coupons: couponReducer,
      trashBin: trashReducer,
   },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
