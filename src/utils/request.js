import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 本工程中axios使用，均通过其API构建请求，可参考https://www.kancloud.cn/yunye/axios/234845
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  request => {
    // 后端服务jwt token信息
    request.headers['Authorization'] = getToken().token
    return request
  },
  error => {
    // 请求发生错误
    console.log('request interceptor error') // for debug
    Promise.reject(error)
  }
)
// {
//   code: 1, //1：正确结果，2：回话过期，3：非法回话，4：权限不足，5：未知错误
//   message: 后端错误信息
//   data: 后端正常处理结果封装
// }
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 1) {
      if (res.code === 2 || res.code === 3) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      console.log('response interceptor: error') // for debug
      if (res.message) {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject('error')
    } else {
      console.log(res.data)
      return res.data
    }
  },
  error => {
    console.log('response interceptor error') // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
