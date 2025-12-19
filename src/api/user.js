import request from '@/utils/request'

export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const userGetInfoService = () => request.get('/my/userinfo')

export const userChangeInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

// 上传头像
export const userUploadAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })
