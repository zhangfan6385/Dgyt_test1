// import { param2Obj } from '@/frame_src/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    sysCode: '1',
    code: 2000,
    userCode: 'admin',
    sysName: '大港软件开发平台',
    departCode: '1401',
    departName: '大港一部',
    userId: '98743',
    userSex: '1',
    roleLevel: 'admin',
    orgList: [{
      'orgName': '大港油田1部',
      'orgCode': '1401',
      'orgId': '1401'
    }, {
      'orgName': '大港油田2部',
      'orgCode': '1402',
      'orgId': '1401'
    }, {
      'orgName': '大港油田3部',
      'orgCode': '1403',
      'orgId': '1401'
    }, {
      'orgName': '大港油田4部',
      'orgCode': '1404',
      'orgId': '1401'
    }],
    userList: [{
      'USER_ID': '10101011',
      'USER_CODE': '14011',
      'USER_NAME': '李四',
      'USER_DOMAIN': 'yq10101'
    }, {
      'USER_ID': '10101012',
      'USER_CODE': '14012',
      'USER_NAME': '李四2',
      'USER_DOMAIN': 'yq10102'
    }, {
      'USER_ID': '10101013',
      'USER_CODE': '14013',
      'USER_NAME': '李四3',
      'USER_DOMAIN': 'yq10103'
    }, {
      'USER_ID': '10101014',
      'USER_CODE': '14014',
      'USER_NAME': '李四4',
      'USER_DOMAIN': 'yq10104'
    }]
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = JSON.parse(config.body)// param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
