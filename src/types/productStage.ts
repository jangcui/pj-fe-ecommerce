import { ImgType } from './imageStage'

export interface ProductType {
   _id?: string
   tags?: string
   title?: string
   slug?: string
   description?: string
   price?: number
   quantity?: number
   category?: string
   brand?: string
   role?: string
   sold?: number
   images?: ImgType[]
   color?: string[]
   totalRating?: string
   ratings?: string[]
   __v?: number
}

export interface ProductStageType {
   productList: ProductType[]
   product: ProductType
   productCreate: ProductType
   productUpdate: ProductType
   productDelete: ProductType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
