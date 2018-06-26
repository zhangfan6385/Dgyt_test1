import { param2Obj } from '@/frame_src/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
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
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
