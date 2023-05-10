import { ProductType } from './productStage'
import { UserType } from './userStage'
export interface PaymentType {
   id: string
   method: string
   amount: number
   status: string
   createdAt: number
   currency: string
}

export interface OrderType {
   _id: string
   products: {
      product: ProductType
      count: number
      color: string[]
      _id: string
   }[]
   paymentIntent: PaymentType
   orderStatus: string
   orderBy: UserType
   createdAt: string
   updatedAt: string
   __v: number
}

export interface OrderStageType {
   order: OrderType[]
   isError?: boolean
   isLoading?: boolean
   isSuccess?: boolean
   message?: string
}
