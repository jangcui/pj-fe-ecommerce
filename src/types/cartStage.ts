import { ImgType } from './imageStage'
import { ProductType } from './productStage'
import { ItemType } from './itemStage'

export type CartType = {
   _id?: string
   quantity: number
   price: number
   productId: ProductType
   color: ItemType
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
