import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const ConfigList = []
const count = 100

for (let i = 0; i < count; i++) {
  ConfigList.push(Mock.mock({
    userId: '@increment',
    accessTime: '@datetime',
    userName: '@cname',
    ipAddr: '@ip',
    'logType|1': ['用户管理', '业务操作', '角色配置', '增加用户'],
    logContent: '@title(1,9)',
    remark: '@title(1,9)',
    pageviews: '@integer(300, 5000)'
  }))
}

export default {
  getFetchLogInfoList: config => {
    const { userName, logType, accessTime, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = ConfigList.filter(item => {
      if (userName && item.userName.indexOf(userName) < 0) return false
      if (logType && item.logType.indexOf(logType) < 0) return false
      if (accessTime && item.accessTime.indexOf(accessTime) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
