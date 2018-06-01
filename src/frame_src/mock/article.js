import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const List = []
const UserList = []
const UserRoleList = []
const ConfigList = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }))
  UserList.push(Mock.mock({
    userId: '@increment',
    userCode: '@integer(1000000,60000000)',
    userName: '@cname',
    userAlias: '@first',
    userPass: '111111',
    'phoneMobile|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
    'phoneOffice|1': ['024-2574598', '024-2574508', '024-2574510', '024-2574534'],
    phoneOrg: '@integer(1000,9000)',
    userEmail: '@EMAIL',
    emailOffice: '@EMAIL',
    userIp: '@ip',
    'flag|1': ['0', '1'],
    userDomain: '@first',
    'remark|1': ['自开发人员', '业务人员', '办公室人员', '企业领导'],
    title: '@title(1,9)',
    forecast: '@float(0, 100, 2, 2)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    pageviews: '@integer(300, 5000)'
  }))
  UserRoleList.push(Mock.mock({
    userId: '@increment',
    userCode: '@integer(1000000,60000000)',
    userName: '@cname',
    'remark|1': ['自开发人员', '业务人员', '办公室人员', '企业领导'],
    'flag|1': ['0', '1'],
    'groupName|1': ['超级管理员', '', '客服主管'],
    'roleId|1': [27, 28],
    pageviews: '@integer(300, 5000)'
  }))

  ConfigList.push(Mock.mock({
    confValue: '@integer(0, 10)',
    confCode: '@first',
    confName: '@csentence(3, 5)',
    pageviews: '@integer(300, 5000)'
  }))
}

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/zhangfan6385/Dgyt_test1',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  }),
  getFetchUserList: config => {
    const { flag, userName, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = UserList.filter(item => {
      if (flag && item.flag !== flag) return false
      if (userName && item.userName.indexOf(userName) < 0) return false
      return true
    })

    if (sort === '-userId') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }, getFetchUserRoleList: config => {
    const { flag, userName, page = 1, limit = 20, sort, roleId } = param2Obj(config.url)

    let mockList = UserRoleList.filter(item => {
      if (flag && item.flag !== flag) return false
      if (userName && item.userName.indexOf(userName) < 0) return false
      if (roleId === 26) {
        if (item.groupName !== '超级管理员') return false
      }
      return true
    })

    if (sort === '-userId') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }, getFetchConfigList: config => {
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
  }, getUpdateUserArticle: config => {
    const { field, flag, userId } = param2Obj(config.url)
    if (field === 'deletaStatus') {
      return {
        aa: flag,
        bb: userId,
        message: '删除成功',
        result: true
      }
    } else if (field === 'flag') {
      return {
        message: '修改成功',
        result: true
      }
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
  }, getUpdateRoleArticle: config => {
    const { field, id } = param2Obj(config.url)
    if (field === 'deletaStatus') {
      return {
        aa: id,
        message: '删除成功',
        result: true
      }
    }
  }, getUpdateUserRoleArticle: config => {
    const { multipleSelection, roleId } = param2Obj(config.url)
    return {
      message: '分配成功',
      result: true,
      aa: multipleSelection,
      bb: roleId
    }
  }, getUpdatePasswordData: config => {
    const { password, newpassword } = param2Obj(config.url)
    return {
      message: '修改成功',
      result: true,
      aa: password,
      bb: newpassword
    }
  }, getFetchRoleList: config => {
    const { sysCode } = param2Obj(config.url)

    if (sysCode === '2') {
      return { items: [{
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
      return { items: [{
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
  createUserArticle: () => ({
    data: 'success'
  }),
  getCreateConfigArticle: () => ({
    data: 'success'
  }),
  getUpdateUserData: () => ({
    data: 'success'
  }),
  getUpdateConfigData: () => ({
    data: 'success'
  }),
  createRoleArticle: () => ({
    data: 'success'
  }),
  getUpdateRoleData: () => ({
    data: 'success'
  })
}
