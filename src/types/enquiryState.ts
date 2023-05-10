export interface EnquiryType {
   _id?: string
   name?: string
   email?: string
   status?: JSX.Element
   mobile?: string
   comment?: string
   role?: string
   __v?: number
}

export interface EnquiryStageType {
   enquiries: EnquiryType[]
   enquiry: EnquiryType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
