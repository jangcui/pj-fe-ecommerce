export interface ItemType {
   _id?: string
   id?: string | number
   title?: string
   color?: string[]
   __v?: number
}

export interface ItemStageType {
   itemList: ItemType[]
   item: ItemType
   itemCreate: ItemType
   itemUpdate: ItemType
   name: string
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
