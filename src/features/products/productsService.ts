import { createAsyncThunk } from '@reduxjs/toolkit'
import { ParamsType } from '~/types/paramsStage'
import { ProductType } from '~/types/productStage'
import * as httpRequest from '~/untils/httpRequest'
import * as adminRequest from '~/untils/adminRequest'

interface RatingType {
   star: number
   comment: string
   prodId?: string
}

export const getAProduct = createAsyncThunk('product/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`product/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const toggleProductToTrashBin = createAsyncThunk('product/add-to-trash-bin', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.put(`product/trash/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const getProducts = createAsyncThunk('product/get-all', async (data: ParamsType, thunkAPI) => {
   try {
      const response = await httpRequest.get(
         `product?${data?.brand ? `brand=${data?.brand}&&` : ''}${data?.tags ? `tags=${data?.tags}&&` : ''}${
            data?.category ? `category=${data?.category}&&` : ''
         }${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ''}${
            data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ''
         }${data?.sort ? `sort=${data?.sort}&&` : ''}`,
         {
            signal: thunkAPI.signal,
         },
      )
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const createProduct = createAsyncThunk('product/create', async (data: ProductType, thunkAPI) => {
   try {
      const response = await adminRequest.post('product', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateAProduct = createAsyncThunk(
   'product/update',
   async ({ id, body }: { id: string; body: ProductType }, thunkAPI) => {
      try {
         const response = await adminRequest.put(`product/${id}`, body, {
            signal: thunkAPI.signal,
         })
         return response
      } catch (error: any) {
         if (error.name === 'AxiosError' && error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
         }
         throw error
      }
   },
)

export const deleteProduct = createAsyncThunk('product/delete', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.Delete(`product/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const rateProduct = createAsyncThunk('product/rating', async (data: RatingType, thunkAPI) => {
   try {
      const response = await httpRequest.put('product/rating', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
