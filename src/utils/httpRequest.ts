import axios from 'axios'

// const base_url = process.env.REACT_APP_API_KEY
const base_url = 'http://localhost:4000/api/'

export const getToken = () => {
   const token = localStorage.getItem('TOKEN')
   if (token) {
      const tokenParse = JSON.parse(token)
      return tokenParse
   }
   return null
}

export const instance = axios.create({
   withCredentials: true,
   baseURL: base_url,
   headers: {
      'Content-Type': 'application/json',
   },
})
// const refreshToken = async () => {
//    try {
//       const response: Response = await get(`user/refresh`)
//       const result = await response.json()
//       return result
//    } catch (error: any) {
//       return error
//    }
// }
instance.interceptors.request.use(
   async (request) => {
      request.headers.Authorization = `Bearer ${getToken()}`
      return request
   },
   (error) => {
      console.log(error)
      return Promise.reject(error)
   },
)

export const get = async (path: string, config?: any) => {
   const response = await instance.get(path, config)
   return response.data
}

export const post = async (path: string, data?: any, config?: any) => {
   const response = await instance.post(path, data, config)
   return response.data
}

export const Delete = async (path: string, config?: any) => {
   const response = await instance.delete(path, config)
   return response.data
}
export const put = async (path: string, data?: any, config?: any) => {
   const response = await instance.put(path, data, config)
   return response.data
}
export default instance
