<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import router from '@/router'
import { useUserStore } from '@/stores'

// import { ElMessage } from 'element-plus'
// 模板引用
const form = ref()
const isLogin = ref(true)
const ruleFormRef = ref({
  username: '',
  password: '',
  repassword: ''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value === ruleFormRef.value.password) {
          callback()
        } else {
          callback(new Error('两次输入的密码不一样'))
        }
      },
      trigger: 'blur'
    }
  ]
}

// -----------------------------------------------------//
const login = async () => {
  await form.value.validate()
  console.log('开始登陆请求')
  try {
    const userStore = useUserStore()
    const res = await userLoginService(ruleFormRef.value)
    console.log(res.token)
    userStore.setToken(res.token)
    router.push('/')
    ElMessage.success('登录成功')
  } catch (error) {
    ElMessage.error(error?.message || '服务异常')
  }
}

const register = async () => {
  await form.value.validate()
  console.log('开始注册请求')
  try {
    await userRegisterService(ruleFormRef.value)
    ElMessage.success('注册成功')
    // 切换到登录页表单
    isLogin.value = true
  } catch (error) {
    ElMessage.error(error?.message || '服务异常')
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"><div></div></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form v-if="isLogin" ref="form" :model="ruleFormRef" :rules="rules">
        <el-form-item>
          <div class="title">登录</div>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            :prefix-icon="User"
            v-model="ruleFormRef.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            :prefix-icon="Lock"
            v-model="ruleFormRef.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" underline="never" @click="isLogin = false">
              忘记密码？
            </el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <el-form v-else :rules="rules" :model="ruleFormRef" ref="form">
        <el-form-item>
          <div class="title">注册</div>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            :prefix-icon="User"
            v-model="ruleFormRef.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            :prefix-icon="Lock"
            type="password"
            v-model="ruleFormRef.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            placeholder="请再次输入密码"
            :prefix-icon="Lock"
            type="password"
            v-model="ruleFormRef.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-link
            type="primary"
            underline="never"
            @click="isLogin = true"
            class="back"
          >
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      font-weight: bold;
      font-size: 20px;
    }
    .login-btn {
      width: 100%;
    }
    .flex {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .back {
      color: grey;
    }
  }
}
</style>
