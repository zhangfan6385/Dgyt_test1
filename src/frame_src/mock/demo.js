
import { param2Obj } from '@/frame_src/utils'

const DemoList = [{
  'ID': '1',
  'NAME': '张三',
  'AGE': 28,
  'CREATEDATE': '1990-12-11'
}, {
  'ID': '2',
  'NAME': '李四',
  'AGE': 30,
  'CREATEDATE': '1988-01-11'
}, {
  'ID': '3',
  'NAME': '王五',
  'AGE': 40,
  'CREATEDATE': '1978-02-11'
}]

export default {
  getFetchDemoList: config => {
    const { NAME, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = DemoList.filter(item => {
      if (NAME && item.NAME.indexOf(NAME) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  },
  getUpdateDemoArticle: config => {
    const { field, ID } = param2Obj(config.url)
    if (field === 'deletaStatus') {
      return {
        bb: ID,
        code: 2000,
        message: '刪除成功'
      }
    }
  },
  getCreateDemoArticle: () => ({
    code: 2000,
    message: '创建成功'
  }),
  getUpdateDemoData: () => ({
    code: 2000,
    message: '修改成功'
  })
}
