<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref, onMounted } from 'vue'
const modelValue = defineModel()
const channelList = ref([])
const loading = ref(false)
const props = defineProps({
  width: {
    type: String
  }
})
onMounted(async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data
})
console.log(props.width)
</script>
<template>
  <el-select
    class="select"
    placeholder="请选择"
    :loading="loading"
    v-model="modelValue"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>

<style scoped>
.select {
  min-width: 20vh;
}
</style>
