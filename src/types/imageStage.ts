export interface ImgType {
   url: string
   asset_id?: string
   public_id?: string
}

export interface ImgStageType {
   img: ImgType[]
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: any
}
