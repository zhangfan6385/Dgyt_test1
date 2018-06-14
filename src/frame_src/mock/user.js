import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const UserList = []
const count = 100
const UserRoleList = []
const UserOrgList = []

for (let i = 0; i < count; i++) {
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
    'roleId|1': [26, 28],
    pageviews: '@integer(300, 5000)'
  }))
  UserOrgList.push(Mock.mock({
    userId: '@increment',
    userCode: '@integer(1000000,60000000)',
    userName: '@cname',
    'remark|1': ['自开发人员', '业务人员', '办公室人员', '企业领导'],
    'flag|1': ['0', '1'],
    'orgName|1': ['大港油田一部', '', '大港油田财务'],
    'orgId|1': [26, 28],
    pageviews: '@integer(300, 5000)'
  }))
}

export default {

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
      if (roleId === '26') {
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
  }, getFetchUserOrgList: config => {
    const { flag, userName, page = 1, limit = 20, sort, orgId } = param2Obj(config.url)

    let mockList = UserOrgList.filter(item => {
      if (flag && item.flag !== flag) return false
      if (userName && item.userName.indexOf(userName) < 0) return false
      if (orgId === '26') {
        if (item.orgName !== '大港油田一部') return false
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
  }, getUpdatePasswordData: config => {
    const { password, newpassword } = param2Obj(config.url)
    return {
      message: '修改成功',
      result: true,
      aa: password,
      bb: newpassword
    }
  },
  createUserArticle: () => ({
    message: '创建成功',
    result: true
  }),
  getUpdateUserData: () => ({
    message: '创建成功',
    result: true
  })
}
