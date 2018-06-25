import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const ConfigList = []
const ConfigList2 = [{
  'CONF_VALUE': 'UIDPAdmin',
  'CONF_CODE': 'Admin_Code',
  'CONF_NAME': '系统超级管理员账号'
}, {
  'CONF_VALUE': 'UIDPAdmin',
  'CONF_CODE': 'Admin_Password',
  'CONF_NAME': '系统超级管理员密码'
}, {
  'CONF_VALUE': 'UIDPAdmin',
  'CONF_CODE': 'Admin_Code',
  'CONF_NAME': '系统超级管理员账号'
}, {
  'CONF_VALUE': 'UIDP',
  'CONF_CODE': 'Plat_Code',
  'CONF_NAME': '平台代号'
}, {
  'CONF_VALUE': '大港油田信息中心',
  'CONF_CODE': 'CopyRight',
  'CONF_NAME': '版权'
}, {
  'CONF_VALUE': 'UIDPAdmin',
  'CONF_CODE': 'Admin_Code',
  'CONF_NAME': '系统超级管理员账号'
}, {
  'CONF_VALUE': '1.0',
  'CONF_CODE': 'Version',
  'CONF_NAME': '平台版本'
}, {
  'CONF_VALUE': 'http://localhost:9527/',
  'CONF_CODE': 'UIDP_URL',
  'CONF_NAME': '平台URL地址'
}, {
  'CONF_VALUE': '1',
  'CONF_CODE': 'AD_FLAG',
  'CONF_NAME': '是否需要AD认证0：不需要认证1：需要认证'
}]
const count = 100

for (let i = 0; i < count; i++) {
  ConfigList.push(Mock.mock({
    CONF_VALUE: '@integer(0, 10)',
    CONF_CODE: '@first',
    CONF_NAME: '@csentence(3, 5)'
  }))
}

export default {
  getFetchConfigList: config => {
    const { CONF_NAME, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = ConfigList2.filter(item => {
      if (CONF_NAME && item.CONF_NAME.indexOf(CONF_NAME) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  }, getUpdateConfigArticle: config => {
    const { field, CONF_CODE } = param2Obj(config.url)
    if (field === 'deletaStatus') {
      return {
        bb: CONF_CODE,
        code: 2000,
        message: '刪除成功'
      }
    }
  },
  getCreateConfigArticle: () => ({
    code: 2000,
    message: '创建成功'
  }),
  getUpdateConfigData: () => ({
    code: 2000,
    message: '修改成功'
  })
}
