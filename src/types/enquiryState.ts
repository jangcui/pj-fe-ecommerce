export interface EnquiryType {
   _id?: string | any
   name?: string
   email?: string
   status?: string
   mobile?: string
   comment?: string
   role?: string
   __v?: number
}

export interface EnquiryStageType {
   enquiries: EnquiryType[]
   enquiry: EnquiryType
   enqCreate: EnquiryType
   enqUpdate: EnquiryType
   enqDelete: EnquiryType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
