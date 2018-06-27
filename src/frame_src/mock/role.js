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
  }, getUpdateRoleArticle: config => {
    const { field, id } = JSON.parse(config.body)
    if (field === 'deletaStatus') {
      return {
        aa: id,
        code: 2000,
        message: '创建成功'
      }
    }
  }, getUpdateUserRoleArticle: config => {
    const { multipleSelection, roleId } = JSON.parse(config.body)
    return {
      code: 2000,
      message: '修改成功',
      aa: multipleSelection,
      bb: roleId
    }
  }, getDeleteUserRoleArticle: config => {
    const { multipleSelection, roleId } = JSON.parse(config.body)
    return {
      code: 2000,
      message: '修改成功',
      aa: multipleSelection,
      bb: roleId
    }
  }, getFetchRoleList: config => {
    const { sysCode } = param2Obj(config.url)

    if (sysCode === '2') {
      return {
        code: 2000,
        message: '创建成功',
        items: [{
          'id': 26,
          'parentId': null,
          'groupName': '超级管理员',
          'groupCode': 'super_manager',
          'sysCode': '1',
          'remark': '',
          'children': [{
            'id': 30,
            'parentId': 26,
            'groupName': '测试新增',
            'groupCode': 'super_manager',
            'sysCode': '1',
            'remark': '',
            'children': []
          }]
        }, {
          'id': 27,
          'parentId': null,
          'groupName': '客服主管',
          'groupCode': 'server_manager',
          'sysCode': '1',
          'remark': '',
          'children': [{
            'id': 28,
            'parentId': 27,
            'groupName': '售后客服',
            'groupCode': 'server1',
            'sysCode': '1',
            'remark': '',
            'children': []
          }, {
            'id': 29,
            'parentId': 27,
            'groupName': '售前客服',
            'groupCode': 'server2',
            'sysCode': '1',
            'remark': '',
            'children': []
          }]
        }] }
    } else {
      return {
        code: 2000,
        message: '创建成功',
        items: [{
          'id': 26,
          'parentId': null,
          'groupName': '超级管理员',
          'groupCode': 'super_manager',
          'sysCode': '1',
          'remark': '',
          'children': []
        }, {
          'id': 27,
          'parentId': null,
          'groupName': '客服主管',
          'groupCode': 'server_manager',
          'sysCode': '1',
          'remark': '',
          'children': [{
            'id': 28,
            'parentId': 27,
            'groupName': '售后客服',
            'groupCode': 'server1',
            'sysCode': '1',
            'remark': '',
            'children': []
          }, {
            'id': 29,
            'parentId': 27,
            'groupName': '售前客服',
            'groupCode': 'server2',
            'sysCode': '1',
            'remark': '',
            'children': []
          }]
        }] }
    }
  },
  createRoleArticle: () => ({
    code: 2000,
    message: '创建成功'
  }),
  getUpdateRoleData: () => ({
    code: 2000,
    message: '修改成功'
  })
}
