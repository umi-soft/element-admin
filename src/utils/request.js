import axios from 'axios'
import Qs from 'Qs'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'

// 本工程中axios使用，均通过其API构建请求，可参考https://www.kancloud.cn/yunye/axios/234845
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})
service.defaults.withCredentials = true

// request interceptor
service.interceptors.request.use(
  request => {
    // 后端服务jwt token信息
    if (store.getters.token) {
      request.headers.common['Authorization'] = `${store.getters.token}`
    }
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
    if ('' + res.code !== '1') {
      if (('' + res.code).indexOf('3') === 0) { // 规则码3开头的均为回话问题，token过期等
        MessageBox.confirm('你已登出，可以取消继续留在该页面，或者重新登录', '提示', {
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

export default function ({ url, method = 'get', data = null }) {
  // 解决axios post请求Request Payload问题
  if (data && method.toLowerCase() === 'post') {
    // 对 data 进行任意转换处理
    const isDeep = Object.keys(data).findIndex(prop => {
      const type = Object.prototype.toString.call(data[prop])
      return type === '[object Object]' || type === '[object Array]' || type === '[object JSON]'
    }) !== -1

    if (isDeep) {
      // 嵌套data,对层JSON对象,提交时采用 Request Payload 方案
      // data 原样输出
    } else {
      // 非嵌套data，提交时采用Request FormData方案
      // data需要进行转换
      data = Qs.stringify(data)
    }
  }
  if (method.toLowerCase() === 'post') {
    return service({
      url,
      method,
      data
    })
  } else if(method.toLowerCase() === 'get') {
    return service({
      url,
      method,
      params: data
    })
  } else {
    throw "目前仅仅支持get/post方法"
  }
}
