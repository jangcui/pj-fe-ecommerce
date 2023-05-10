import { EnquiryType } from '~/types/enquiryState'
import httpRequest from '~/untils/httpRequest'

export const getEnquiries = async () => {
   const res = await httpRequest.get<EnquiryType[]>('enquiry')
   if (res) {
      return res.data
   } else {
      console.log('error')
   }
}
const enquiryService = {
   getEnquiries,
}
export default enquiryService
