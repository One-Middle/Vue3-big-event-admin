import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    // token
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    //用户信息
    const user = ref({})
    const setUser = (newUser) => {
      user.value = newUser
    }
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      console.log(res)
      user.value = res.data
    }
    return {
      token,
      setToken,
      removeToken,
      // ------ //
      user,
      setUser,
      getUser
    }
  },
  {
    persist: true
  }
)
