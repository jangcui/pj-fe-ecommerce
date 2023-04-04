import axios from 'axios'
// let token = localStorage.getItem('TOKEN');
// if (token) {
//     token = token?.slice(1, token.length - 1);
// }
const request = axios.create({
   baseURL: 'https://scary-lamb-vestments.cyclic.app/api/',
   headers: {
      'Content-Type': 'application/json',
   },
})

request.interceptors.request.use(
   function (config) {
      const token = localStorage.getItem('TOKEN')
      if (token) {
         config.headers.Authorization = `Bearer ${token.slice(1, token.length - 1)}`
      }
      return config
   },
   function (error) {
      return Promise.reject(error)
   },
)
export const get = async (path: string, options: any = {}) => {
   const response = await request.get(path, options)
   return response.data
}

export const post = async (path: string, options: any = {}) => {
   const response = await request.post(path, options)
   return response.data
}
export const Delete = async (path: string, options: any = {}) => {
   const response = await request.delete(path, options)
   return response.data
}
export const patch = async (path: string, options: any = {}) => {
   const response = await request.patch(path, options)
   return response.data
}
export default request
