import * as adminRequest from '~/untils/adminRequest'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface LoginType {
   email: string
   password: string
}
interface UpdateStatusOrderType {
   id: string
   order_status: string
}

export const loginAdmin = createAsyncThunk('admin/login', async (user: LoginType, thunkAPI) => {
   try {
      const response = await adminRequest.post('user/admin-login', user, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const toggleCustomerToTrashBin = createAsyncThunk('admin/add-to-trash-bin', async (data: string, thunkAPI) => {
   try {
      const response = await adminRequest.put(`user/trash/${data}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const getUsers = createAsyncThunk('admin/get-user', async (__, thunkAPI) => {
   try {
      return await adminRequest.get('user', {
         signal: thunkAPI.signal,
      })
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const toggleBlockAUser = createAsyncThunk('admin/toggle-block-user', async (id: string, thunkAPI) => {
   try {
      return await adminRequest.put(`user/toggle-block/${id}`, {
         signal: thunkAPI.signal,
      })
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const deleteAUser = createAsyncThunk('admin/delete-user', async (id: string, thunkAPI) => {
   try {
      return await adminRequest.Delete(`user/${id}`, {
         signal: thunkAPI.signal,
      })
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const getAOrder = createAsyncThunk('admin/order/get', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.get(`user/order/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getAllOrders = createAsyncThunk('admin/orders/get-all', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('user/all-orders', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const deleteOrder = createAsyncThunk('admin/orders/delete', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.Delete(`user/order/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateOrderStatus = createAsyncThunk(
   'admin/orders/updateStatus',
   async (data: UpdateStatusOrderType, thunkAPI) => {
      try {
         const response = await adminRequest.put(
            `user/order/${data.id}`,
            { order_status: data.order_status },
            {
               signal: thunkAPI.signal,
            },
         )
         return response
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
   },
)
export const getMonthlyOrders = createAsyncThunk('admin/orders/monthly-income-data', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('user/month-wise-order-income', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getYearlyOrders = createAsyncThunk('admin/orders/yearly-income-data', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('user/year-total-orders', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
