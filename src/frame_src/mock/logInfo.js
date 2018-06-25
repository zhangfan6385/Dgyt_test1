import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const ConfigList = []
const count = 100

for (let i = 0; i < count; i++) {
  ConfigList.push(Mock.mock({
    USER_ID: '@increment',
    ACCESS_TIME: '@datetime',
    USER_NAME: '@cname',
    IP_ADDR: '@ip',
    'LOG_TYPE|1': ['用户管理', '业务操作', '角色配置', '增加用户'],
    LOG_CONTENT: '@title(1,9)',
    REMARK: '@title(1,9)',
    pageviews: '@integer(300, 5000)'
  }))
}

export default {
  getFetchLogInfoList: config => {
    const { USER_NAME, LOG_TYPE, ACCESS_TIME, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = ConfigList.filter(item => {
      if (USER_NAME && item.USER_NAME.indexOf(USER_NAME) < 0) return false
      if (LOG_TYPE && item.LOG_TYPE.indexOf(LOG_TYPE) < 0) return false
      if (ACCESS_TIME && item.ACCESS_TIME.indexOf(ACCESS_TIME) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  }
}
