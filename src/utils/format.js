import { dayjs } from 'element-plus'
export const formateTime = (time) => dayjs(time).format('YYYY年MM月DD日')
