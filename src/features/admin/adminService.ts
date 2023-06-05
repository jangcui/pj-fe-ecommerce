import * as httpRequest from '~/untils/httpRequest'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface LoginType {
   email: string
   password: string
}

export const loginAdmin = createAsyncThunk('admin/login', async (user: LoginType, thunkAPI) => {
   try {
      const response = await httpRequest.post('user/admin-login', user, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const toggleCustomerToTrashBin = createAsyncThunk('admin/add-to-trash-bin', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.put(`user/trash/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const getUsers = createAsyncThunk('admin/get-user', async (__, thunkAPI) => {
   try {
      return await httpRequest.get('user', {
         signal: thunkAPI.signal,
      })
   } catch (err) {
      return console.log(thunkAPI)
   }
})
export const toggleBlockAUser = createAsyncThunk('admin/toggle-block-user', async (id: string, thunkAPI) => {
   try {
      return await httpRequest.put(`user/toggle-block/${id}`, {
         signal: thunkAPI.signal,
      })
   } catch (err) {
      return console.log(thunkAPI)
   }
})

export const deleteAUser = createAsyncThunk('admin/delete-user', async (id: string, thunkAPI) => {
   try {
      return await httpRequest.Delete(`user/${id}`, {
         signal: thunkAPI.signal,
      })
   } catch (err) {
      return console.log(thunkAPI)
   }
})

export const getAOrder = createAsyncThunk('enquiry/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`user/order-user/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getAllOrders = createAsyncThunk('orders', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('user/all-orders', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
