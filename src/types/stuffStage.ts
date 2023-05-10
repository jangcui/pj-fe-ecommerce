export interface StuffType {
   _id?: string
   id?: string | number
   title?: string
   color?: string[]
   __v?: number
}

export interface StuffStageType {
   stuff: StuffType[]
   item: object
   itemCreate: object
   itemDelete: object
   itemUpdate: object
   name: string
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
export interface BrandStage {
   title: string
}
