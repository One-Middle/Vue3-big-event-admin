<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './component/ChannelSelect.vue'
import { ref, onMounted } from 'vue'
import { artGetListService } from '@/api/article'
import { formateTime } from '@/utils/format'
import { ElMessageBox, ElMessage } from 'element-plus'
import { artDelChannelService } from '@/api/article'
import ArticleEdit from './component/ArticleEdit.vue'

//  子组件的参数
const params = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  cate_id: '',
  state: ''
})
const total = ref(0)
// 文章列表
const articleList = ref([])

const onDelete = async (row) => {
  await ElMessageBox.confirm('你确定删除该文章吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    consoleButtonTest: '取消'
  })
  await artDelChannelService(row.id)
  console.log(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}
const loading = ref(false)
// 获得文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  total.value = res.total
  articleList.value = res.data
  // articleList.value = Array.isArray(res.data)
  //   ? res.data
  //   : res.data?.records || res.data?.list || []
  // total.value =
  //   typeof res.data?.total === 'number'
  //     ? res.data.total
  //     : Array.isArray(res.data)
  //       ? res.data.length
  //       : 0
  loading.value = false
}
onMounted(() => {
  getArticleList()
})

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
const onSearch = () => {
  getArticleList()
}
const onReset = () => {
  params.value.cate_id = ''
  getArticleList()
}
// 抽屉
const drawer = ref({})
const onEdit = (row) => {
  drawer.value.open(row)
}
const onPublish = () => {
  drawer.value.open({})
}
// 修改添加成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加 则需要跳转到最后一页 编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-containner title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onPublish"> 发布文章 </el-button>
    </template>
    <el-main>
      <!-- 表单区域 -->
      <el-form inline>
        <!-- 文章分类选择 -->
        <el-form-item label="文章分类">
          <channel-select v-model="params.cate_id" width="100%">
          </channel-select>
        </el-form-item>
        <!-- 发布状态选择 -->
        <el-form-item label="发布状态：">
          <el-select class="select" placeholder="请选择" v-model="params.state">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格区域 -->
      <el-table :data="articleList" v-loading="loading">
        <el-table-column label="文章标题">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" label="分类"> </el-table-column>
        <el-table-column prop="pub_date" label="发表时间">
          <template #default="{ row }">
            {{ formateTime(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template #default="{ row }">
            <div class="op-cell">
              <el-button
                :icon="Edit"
                type="primary"
                circle
                plain
                @click="onEdit(row)"
              ></el-button>
              <el-button
                :icon="Delete"
                type="danger"
                circle
                plain
                @click="onDelete(row)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页部分 -->
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 3, 4, 5, 10]"
        layout="jumper, total, sizes, prev, pager, next"
        background
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
      />
      <article-edit ref="drawer" @success="onSuccess"></article-edit>
    </el-main>
  </page-containner>
</template>

<style scoped>
el-table-column {
  overflow: scroll;
}

.select {
  min-width: 20vh;
}

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
