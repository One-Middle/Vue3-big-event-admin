<script setup>
import { ref, onMounted } from 'vue'
import { userChangeInfoService } from '@/api/user'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

const userInfo = ref({})
const formModel = ref({})
const form = ref()
// ⭐ 表单校验规则
const formRules = {
  username: [
    { required: true, message: '登录名称不能为空', trigger: 'blur' },
    { min: 3, max: 16, message: '长度需在 3-16 个字符之间', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 2, max: 16, message: '长度需在 2-16 个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
  ]
}
const userStore = useUserStore()
onMounted(async () => {
  try {
    const { id, username, nickname, email } = userStore.user || {}
    userInfo.value = { id, username, nickname, email }
    formModel.value = { ...userInfo.value } // 回显
    console.log(formModel.value)
  } catch (error) {
    console.log(error.message)
  }
})
const onSubmit = async () => {
  if (await form.value.validate()) {
    try {
      const payload = {
        id: userStore.user?.id,
        nickname: formModel.value.nickname,
        email: formModel.value.email
      }
      const res = await userChangeInfoService(payload)
      console.log(res.code)
      if (res?.code === 0) {
        console.log('修改成功')
        await userStore.getUser()
        ElMessage.success('修改成功')
      } else {
        ElMessage.error(res?.message || '修改失败')
      }
    } catch (err) {
      ElMessage.error(
        err?.response?.data?.message || err?.message || '服务异常'
      )
    }
  }
}
</script>

<template>
  <page-containner title="基本资料">
    <el-main>
      <el-form
        :model="formModel"
        :rules="formRules"
        style="max-width: 300px"
        ref="form"
      >
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formModel.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formModel.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </page-containner>
</template>
