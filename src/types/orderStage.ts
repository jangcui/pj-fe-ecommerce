import { ProductType } from './productStage'
import { UserType } from './userStage'
export interface PaymentType {
   id?: string
   method?: string
   amount?: number
   status?: string
   createdAt?: string | Date
   currency?: string
}

export interface OrderType {
   _id?: string
   products?: {
      product?: ProductType
      count?: number
      color?: string[]
      _id?: string
   }[]
   paymentIntent?: PaymentType
   orderStatus?: string
   orderBy?: UserType
   createdAt?: string | Date
   updatedAt?: string
   __v?: number
}

export interface OrderStageType {
   orderList: OrderType[]
   order: OrderType
   orderCreate: OrderType
   orderUpdate: OrderType
   orderDelete: OrderType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
