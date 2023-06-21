import axios from 'axios'

// import { base_url } from './base_url'

export const requests = axios.create({
   baseURL: 'http://localhost:4000/api/',
   // baseURL: base_url,
   headers: {
      'Content-Type': 'application/json',
   },
})

requests.interceptors.request.use(
   function (config) {
      const token: string | null = localStorage.getItem('USER_TOKEN')
      if (token) {
         const tokenParse: string = JSON.parse(token)
         config.headers.Authorization = `Bearer ${tokenParse}`
      }
      return config
   },
   function (error) {
      return Promise.reject(error)
   },
)
export const get = async (path: string, config?: any) => {
   const response = await requests.get(path, config)
   return response.data
}

export const post = async (path: string, data?: any, config?: any) => {
   const response = await requests.post(path, data, config)
   return response.data
}
export const Delete = async (path: string, config?: any) => {
   const response = await requests.delete(path, config)
   return response.data
}
export const put = async (path: string, data?: any, config?: any) => {
   const response = await requests.put(path, data, config)
   return response.data
}
export default requests
