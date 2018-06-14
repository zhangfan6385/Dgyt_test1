import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const ConfigList = []
const count = 100

for (let i = 0; i < count; i++) {
  ConfigList.push(Mock.mock({
    confValue: '@integer(0, 10)',
    confCode: '@first',
    confName: '@csentence(3, 5)',
    pageviews: '@integer(300, 5000)'
  }))
}

export default {
  getFetchConfigList: config => {
    const { confName, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = ConfigList.filter(item => {
      if (confName && item.confName.indexOf(confName) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }, getUpdateConfigArticle: config => {
    const { field, confCode } = param2Obj(config.url)
    if (field === 'deletaStatus') {
      return {
        bb: confCode,
        message: '删除成功',
        result: true
      }
    }
  },
  getCreateConfigArticle: () => ({
    message: '创建成功',
    result: true
  }),
  getUpdateConfigData: () => ({
    message: '修改成功',
    result: true
  })
}
