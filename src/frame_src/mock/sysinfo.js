import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const ConfigList = []
const count = 100

for (let i = 0; i < count; i++) {
  ConfigList.push(Mock.mock({
    sysCode: '@first', // 系统代码
    sysName: '@csentence(2)' + '系统', // 系统名称
    'sysStyle|1': ['蓝色', '紫色', '炫酷', '淡雅'], // 系统主题风格
    sysLogo: '@url()', // logo图标URL
    sysUrl: '@url()', // 系统URL
    'sysOrder|1': ['1', '2', '3', '4'], // 顺序
    sysAdmin: '@increment' // 管理员ID
  }))
}

export default {
  getFetchSysInfoList: config => {
    const { sysName, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = ConfigList.filter(item => {
      if (sysName && item.sysName.indexOf(sysName) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }, getUpdateSysInfoArticle: config => {
    const { field, sysCode } = param2Obj(config.url)
    if (field === 'deletaStatus') {
      return {
        bb: sysCode,
        message: '删除成功',
        result: true
      }
    }
  },
  getCreateSysInfoArticle: () => ({
    message: '创建成功',
    result: true
  }),
  getUpdateSysInfoData: () => ({
    message: '修改成功',
    result: true
  })
}
