import { ProductType } from './productStage'
import { StuffType } from './stuffStage'

export interface ShippingInfo {
   first_name: string
   last_name: string
   address: string
   city: string
   state: string
   other?: string
   country: string
   pin_code: number | string
}

export interface OrderItem {
   productId: ProductType | string | any
   color: StuffType | string | any
   quantity: number
   price: number
}

export interface PaymentInfo {
   orderCreationId?: string
   razor_pay_order_id: string
   razor_pay_payment_id: string
}

export interface OrderDataStage {
   total_price: number
   total_price_after_discount: number
   shippingInfo: ShippingInfo
   orderItems: OrderItem[]
   paymentInfo: PaymentInfo
   createdAt?: Date
   paid_at?: Date
   order_status?: string
}
