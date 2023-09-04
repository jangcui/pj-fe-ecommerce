import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/user/auth/authSlice'
import cartReducer from '../features/user/cart/cartSlice'
import orderReducer from '../features/user/order/orderSlice'
import wishListReducer from '../features/user/wishList/wishListSlice'
import productsReducer from '../features/products/productsSlice'
import brandsReducer from '../features/brands/brandsSlice'
import prodCateReducer from '../features/prodCategories/prodCateSlice'
import blogReducer from '../features/blogs/blogsSlice'
import enquiryReducer from '../features/enquiry/enquirySlice'
import modalLoginReducer from '../features/modalLogin/modalLoginSlice'

export const store = configureStore({
   reducer: {
      auth: authReducer,
      cartData: cartReducer,
      orderData: orderReducer,
      wishListData: wishListReducer,
      products: productsReducer,
      brands: brandsReducer,
      prodCates: prodCateReducer,
      blogs: blogReducer,
      enquiries: enquiryReducer,
      modalLogin: modalLoginReducer,
   },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
