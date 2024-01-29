import { configureStore } from '@reduxjs/toolkit'

import blogReducer from '../features/blogs/blogsSlice'
import brandsReducer from '../features/brands/brandsSlice'
import enquiryReducer from '../features/enquiry/enquirySlice'
import modalSlice from '../features/modals/modalSlice'
import prodCateReducer from '../features/prodCategories/prodCateSlice'
import productsReducer from '../features/products/productsSlice'
import authReducer from '../features/user/auth/authSlice'
import cartReducer from '../features/user/cart/cartSlice'
import orderReducer from '../features/user/order/orderSlice'
import wishListReducer from '../features/user/wishList/wishListSlice'

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
      modals: modalSlice,
   },

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         // fix error serializablestateinvariantmiddleware
         serializableCheck: {
            ignoredActions: ['type'],
            ignoredActionPaths: ['payload.onConfirm'],
            ignoredPaths: ['modals.confirmModal'],
         },
      }),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
