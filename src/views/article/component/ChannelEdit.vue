<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article'
const dialogFormVisible = ref(false)
const title = ref('')
const ruleForm = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})

const emit = defineEmits(['changeSuccess'])

const formRef = ref(null)

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}

const open = (row) => {
  title.value = row.id ? '编辑分类' : '添加分类'
  ruleForm.value.id = row.id
  ruleForm.value.cate_name = row.cate_name
  ruleForm.value.cate_alias = row.cate_alias
  console.log(row)
  dialogFormVisible.value = true
}
// 点击确认 进行修改
const onComfirm = async () => {
  console.log(ruleForm.value)
  await formRef.value.validate()
  ruleForm.value.id
    ? await artEditChannelService(ruleForm.value)
    : await artAddChannelService(ruleForm.value)
  ElMessage({
    type: 'success',
    message: ruleForm.value.id ? '编辑成功' : '添加成功'
  })
  emit('changeSuccess')
  dialogFormVisible.value = false
}
defineExpose({
  open
})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="300">
    <el-form :model="ruleForm" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="ruleForm.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="ruleForm.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="onComfirm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
