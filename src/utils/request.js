import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 定义接口的基础地址（所有请求都会拼接在这个前面）
const baseURL = 'http://big-event-vue-api-t.itheima.net'

// 创建 axios 实例（相当于定制一个“专属的 axios 请求客户端”）
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL, // 设置基础地址，所有请求都会自动加上这个前缀
  timeout: 5000 // 设置超时时间（5秒），超过则请求中断
})

/**
 * 请求拦截器
 * 在每次发送请求前自动执行
 * 可以在这里添加 token、统一处理请求头等
 */
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    console.log('发送请求')
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    // 从 localStorage 获取 token（登录后一般会存这里）
    const token = localStorage.getItem('token')

    // 如果 token 存在，则给请求头加上 Authorization 字段
    if (token) {
      config.headers.Authorization = token
    }

    // 必须返回 config，否则请求发不出去
    return config
  },
  (err) => Promise.reject(err) // 请求发送前的错误，直接拒绝 Promise
)

/**
 * 响应拦截器
 * 在服务器响应到达客户端前执行
 * 可统一处理数据格式、错误判断等
 */
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // 后端一般会返回：{ code: 0/1, message: 'xxx', data: {...} }
    // 比如 code !== 0 时表示业务错误
    console.log(res)
    if (res.data.code !== 0) {
      // 可以在这里做全局错误提示，例如：
      // ElMessage.error(res.data.message)
      console.warn('业务错误：', res.data.message)
      ElMessage.error(res.data.message || '服务异常')
    }

    // TODO 4. 摘取核心响应数据
    // 后端一般把主要数据放在 res.data.data
    return res.data
  },
  (err) => {
    // TODO 5. 处理401错误
    // 401 表示未登录/登录过期 => 拦截到登录
    if (err.response && err.response.status === 401) {
      console.warn('登录过期，请重新登录')
      // 你可以选择清除token并跳转登录页：
      // localStorage.removeItem('token')
      router.push('/login')
    }
    // 错误的默认情况 => 只给提示
    ElMessage.error(err.response.data.message || '服务异常')
    // 返回错误，让调用者处理
    return Promise.reject(err)
  }
)

// 暴露给其他模块使用
export default instance
