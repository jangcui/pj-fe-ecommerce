import { createAction, createSlice } from '@reduxjs/toolkit'
import {
   addToCart,
   addToWishList,
   checkout,
   createOrder,
   emptyCart,
   forgotPwdToken,
   getCarts,
   getMyOrder,
   getUserWishList,
   login,
   paymentVerify,
   register,
   removeProductFromCart,
   resetPwdToken,
   updateProfile,
   updateQuantityProductFromCart,
} from './customerService'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserStageType } from '~/types/userStage'
import { toast } from 'react-toastify'
import { CartType } from '~/types/cartStage'

const getUserFromLocalStorage: string | null = localStorage.getItem('USER')
const user = getUserFromLocalStorage ? JSON.parse(getUserFromLocalStorage) : null

const initialState: UserStageType = {
   cart: {},
   cartList: [],
   user: user,
   order: {},
   orderList: [],
   wishlist: [],
   totalPrice: 0,
   token: '',
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const logOutUser = createAction('log_out')

export const customerSlice = createSlice({
   name: 'customer',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(logOutUser, (state) => {
            localStorage.removeItem('USER')
            localStorage.removeItem('USER_TOKEN')
            state.user = null
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true
         })
         .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.message = 'fulfilled'
            localStorage.setItem('USER', JSON.stringify(action.payload))
            localStorage.setItem('USER_TOKEN', JSON.stringify(action.payload.token))
         })
         .addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
            toast.error(action.payload.message)
         })
         .addCase(updateProfile.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.message = 'fulfilled'
            const userResult = {
               _id: action.payload._id,
               fist_name: action.payload.fist_name,
               last_name: action.payload.last_name,
               email: action.payload.email,
               mobile: action.payload.mobile,
               token: action.payload.refreshToken,
            }
            localStorage.setItem('USER', JSON.stringify(userResult))
            console.log(userResult)
            toast.success('Updated')
         })
         .addCase(updateProfile.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
            toast.error(action.payload.message)
         })
         .addCase(register.pending, (state) => {
            state.isLoading = true
         })
         .addCase(register.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            toast.success('Register Successfully')
         })
         .addCase(register.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
            toast.error(action.payload.message)
         })
         .addCase(addToWishList.pending, (state) => {
            state.isLoading = true
         })
         .addCase(addToWishList.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.info(action.payload.message)
            state.message = 'fulfilled'
         })
         .addCase(addToWishList.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.message = 'rejected'
            toast.error('Some Thing Went Wrong')
         })
         .addCase(getUserWishList.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getUserWishList.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            state.wishlist = action.payload.wishlist
         })
         .addCase(getUserWishList.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
         })
         .addCase(addToCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            state.cart = action.payload
            toast.success('Product added to cart')
         })
         .addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
            toast.error(action.payload.message)
         })
         .addCase(getCarts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCarts.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.cartList = action.payload
            state.message = 'fulfilled'
            state.totalPrice = action.payload.reduce((accumulator: number, item: CartType) => {
               const totalOrigin = item?.productId.price * item?.quantity
               const totalAfterDiscount = item?.productId?.price_after_discount * item?.quantity

               return accumulator + (item?.productId?.discountCode ? totalAfterDiscount : totalOrigin)
            }, 0)
         })
         .addCase(getCarts.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
         })
         .addCase(removeProductFromCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(removeProductFromCart.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            toast.success('Product removed from cart')
         })
         .addCase(removeProductFromCart.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
            toast.error('Something went wrong')
         })
         .addCase(emptyCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(emptyCart.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            toast.info('Cart Empty Now')
         })
         .addCase(emptyCart.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
            toast.error('Something went wrong')
         })
         .addCase(updateQuantityProductFromCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateQuantityProductFromCart.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
         })
         .addCase(updateQuantityProductFromCart.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
         })
         .addCase(createOrder.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createOrder.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            state.order = action.payload
            toast.success('Ordered Successfully')
         })
         .addCase(createOrder.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.message = 'rejected'
            state.isLoading = false
            toast.error('Some thing went wrong!')
         })
         .addCase(getMyOrder.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getMyOrder.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            state.orderList = action.payload
         })
         .addCase(getMyOrder.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.message = 'rejected'
            state.isLoading = false
         })

         .addCase(checkout.pending, (state) => {
            state.isLoading = true
         })
         .addCase(checkout.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
         })
         .addCase(checkout.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
         })
         .addCase(paymentVerify.pending, (state) => {
            state.isLoading = true
         })
         .addCase(paymentVerify.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
         })
         .addCase(paymentVerify.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
         })
         .addCase(forgotPwdToken.pending, (state) => {
            state.isLoading = true
         })
         .addCase(forgotPwdToken.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            state.token = action.payload.token
            toast.success('Email Sended Successfully')
         })
         .addCase(forgotPwdToken.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.payload.message
            toast.error(action.payload.message)
         })
         .addCase(resetPwdToken.pending, (state) => {
            state.isLoading = true
         })
         .addCase(resetPwdToken.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'fulfilled'
            toast.success('PassWord reset successfully')
         })
         .addCase(resetPwdToken.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'rejected'
            toast.error('Some thing went wrong!')
         })
   },
})

export default customerSlice.reducer
