<script setup>
import { onMounted, ref } from 'vue'
import { artGetChannelsService, artDelChannelService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/component/ChannelEdit.vue'
import { ElMessageBox } from 'element-plus'
const channelList = ref([])
const isLoading = ref('false')
const setFormData = async () => {
  isLoading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data
  isLoading.value = false
  console.log(res.data)
}
onMounted(async () => {
  setFormData()
})
const channelEdit = ref(null)
// 按键操作回调
const onAddChannel = () => {
  channelEdit.value.open({})
}
const onEditChannel = (row) => {
  console.log('onEdit')
  channelEdit.value.open(row)
}
const onDelChannel = async (id) => {
  await ElMessageBox.confirm('你确定删除该分类吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  const res = await artDelChannelService(id)
  console.log(res.data)
  setFormData()
}
</script>
<template>
  <page-containner title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <div>
      <el-table :data="channelList" style="width: 100%" v-loading="isLoading">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template #default="{ row, $index }">
            <div class="op-cell">
              <el-button
                :icon="Edit"
                circle
                plain
                type="primary"
                @click="onEditChannel(row, $index)"
              ></el-button>
              <el-button
                :icon="Delete"
                circle
                plain
                type="danger"
                @click="onDelChannel(row.id)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ChannelEdit ref="channelEdit" @changeSuccess="setFormData"></ChannelEdit>
  </page-containner>
</template>
<style scoped>
.op-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  white-space: nowrap;
}
.op-cell :deep(.el-button) {
  flex: 0 0 auto;
}
</style>
