import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const ConfigList = []
const ConfigList2 = [{
  'confValue': 'UIDPAdmin',
  'confCode': 'Admin_Code',
  'confName': '系统超级管理员账号'
}, {
  'confValue': 'UIDPAdmin',
  'confCode': 'Admin_Password',
  'confName': '系统超级管理员密码'
}, {
  'confValue': 'UIDPAdmin',
  'confCode': 'Admin_Code',
  'confName': '系统超级管理员账号'
}, {
  'confValue': 'UIDP',
  'confCode': 'Plat_Code',
  'confName': '平台代号'
}, {
  'confValue': '大港油田信息中心',
  'confCode': 'CopyRight',
  'confName': '版权'
}, {
  'confValue': 'UIDPAdmin',
  'confCode': 'Admin_Code',
  'confName': '系统超级管理员账号'
}, {
  'confValue': '1.0',
  'confCode': 'Version',
  'confName': '平台版本'
}, {
  'confValue': 'http://localhost:9527/',
  'confCode': 'UIDP_URL',
  'confName': '平台URL地址'
}, {
  'confValue': '1',
  'confCode': 'AD_FLAG',
  'confName': '是否需要AD认证0：不需要认证1：需要认证'
}]
const count = 100

for (let i = 0; i < count; i++) {
  ConfigList.push(Mock.mock({
    confValue: '@integer(0, 10)',
    confCode: '@first',
    confName: '@csentence(3, 5)'
  }))
}

export default {
  getFetchConfigList: config => {
    const { confName, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = ConfigList2.filter(item => {
      if (confName && item.confName.indexOf(confName) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: '2000',
      message: '查询成功'
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
