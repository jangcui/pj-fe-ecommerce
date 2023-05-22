import { ImgType } from './imageStage'
import { StuffType } from './stuffStage'

export interface ProductType {
   _id?: string
   tags?: string
   title?: string
   images?: ImgType[]
   slug?: string
   description?: string
   price?: number
   quantity?: number
   category?: string
   brand?: string
   sold?: number
   color?: string[] | StuffType[]
   isDelete?: boolean
   deleteDate?: Date | any
   totalRating?: number
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
