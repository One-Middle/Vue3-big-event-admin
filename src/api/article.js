import request from '@/utils/request'

// 文章分类
// 获得文章分类
export const artGetChannelsService = () => request.get('my/cate/list')
// 添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
// 编辑文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
// 提交文章分类删除
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章列表
// 获得文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })
// 删除文章
export const artDelListServie = (id) =>
  request.delete('/my/article/info', {
    params: { id }
  })
// 上传文章
export const artPublishService = (data) => request.post('/my/article/add', data)
// 获取详细信息
export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })
