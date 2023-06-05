import { ImgType } from './imageStage'
import { ProductType } from './productStage'
import { StuffType } from './stuffStage'

export type CartType = {
   _id?: string
   quantity: number
   price: number
   productId: ProductType
   color: StuffType
   createdAt?: Date | string
   updatedAt?: Date | string
   userId: string
   images: ImgType[]
   __v?: number
}
export interface CartStageType {
   cart: CartType
   cartList: CartType[]
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
