import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const UserList = []
const count = 10
const UserRoleList = []
const UserOrgList = []
const UserLoginList = []
for (let i = 0; i < count; i++) {
  UserList.push(Mock.mock({
    USER_ID: '@integer(100000000000000000000,60000000000000000000000)',
    USER_CODE: '@integer(1000000,60000000)',
    USER_NAME: '@cname',
    USER_ALIAS: '@first',
    USER_PASS: '111111',
    'PHONE_MOBILE|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
    'PHONE_OFFICE|1': ['024-2574598', '024-2574508', '024-2574510', '024-2574534'],
    PHONE_ORG: '@integer(1000,9000)',
    USER_EMAIL: '@EMAIL',
    EMAIL_OFFICE: '@EMAIL',
    USER_IP: '@ip',
    'USER_SEX|1': ['0', '1'],
    'FLAG|1': ['0', '1'],
    'AUTHENTICATION_TYPE|1': ['0', '1'],
    USER_DOMAIN: '@first',
    'REMARK|1': ['自开发人员', '业务人员', '办公室人员', '企业领导'],
    pageviews: '@integer(300, 5000)',
    USER_ERP: '@cname'
  }))
  UserRoleList.push(Mock.mock({
    USER_DOMAIN: '@first',
    USER_ID: '@increment',
    USER_PASS: '111111',
    USER_CODE: '@integer(1000000,60000000)',
    USER_NAME: '@cname',
    'REMARK|1': ['自开发人员', '业务人员', '办公室人员', '企业领导'],
    'FLAG|1': ['0', '1'],
    'groupName|1': ['超级管理员', '', '客服主管'],
    'roleId|1': [26, 28],
    pageviews: '@integer(300, 5000)'
  }))
  UserOrgList.push(Mock.mock({
    USER_DOMAIN: '@first',
    USER_ID: '@increment',
    USER_PASS: '111111',
    USER_CODE: '@integer(1000000,60000000)',
    USER_NAME: '@cname',
    'REMARK|1': ['自开发人员', '业务人员', '办公室人员', '企业领导'],
    'FLAG|1': ['0', '1'],
    'orgName|1': ['大港油田一部', '', '大港油田财务'],
    'orgId|1': [26, 28],
    pageviews: '@integer(300, 5000)',
    PHONE_ORG: '@integer(1000,9000)',
    USER_EMAIL: '@EMAIL',
    EMAIL_OFFICE: '@EMAIL',
    USER_IP: '@ip',
    'USER_SEX|1': ['0', '1'],
    'AUTHENTICATION_TYPE|1': ['0', '1'],
    USER_ERP: '@cname'
  }))
  UserLoginList.push(Mock.mock({
    USER_DOMAIN: '@first',
    USER_ID: '@increment',
    USER_CODE: '@integer(1000000,60000000)',
    USER_NAME: '@cname',
    'REMARK|1': ['自开发人员', '业务人员', '办公室人员', '企业领导'],
    'LOGIN_REMARK|1': ['张大', '', '王二'],
    'LOGIN_ID|1': [35, 28],
    pageviews: '@integer(300, 5000)'
  }))
}

export default {

  getFetchUserList: config => {
    const { FLAG, USER_NAME, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = UserList.filter(item => {
      if (FLAG && item.FLAG !== FLAG) return false
      if (USER_NAME && item.USER_NAME.indexOf(USER_NAME) < 0) return false
      return true
    })

    if (sort === '-USER_ID') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  }, getFetchUserRoleList: config => {
    const { FLAG, USER_NAME, page = 1, limit = 20, sort, roleId } = param2Obj(config.url)

    let mockList = UserRoleList.filter(item => {
      if (FLAG && item.FLAG !== FLAG) return false
      if (USER_NAME && item.USER_NAME.indexOf(USER_NAME) < 0) return false
      if (roleId === '26') {
        if (item.groupName !== '超级管理员') return false
      }
      return true
    })

    if (sort === '-USER_ID') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  }, getFetchUserOrgList: config => {
    const { FLAG, USER_NAME, page = 1, limit = 20, sort, orgId } = param2Obj(config.url)

    let mockList = UserOrgList.filter(item => {
      if (FLAG && item.FLAG !== FLAG) return false
      if (USER_NAME && item.USER_NAME.indexOf(USER_NAME) < 0) return false
      if (orgId === '26') {
        if (item.orgName !== '大港油田一部') return false
      }
      return true
    })

    if (sort === '-USER_ID') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  }, getFetchUserForLoginList: config => {
    const { FLAG, USER_NAME, page = 1, limit = 20, sort, LOGIN_ID } = param2Obj(config.url)
    let mockList = UserLoginList.filter(item => {
      if (FLAG && item.FLAG !== FLAG) return false
      if (USER_NAME && item.USER_NAME.indexOf(USER_NAME) < 0) return false
      if (LOGIN_ID === '35') {
        if (item.LOGIN_REMARK !== '王二') return false
      }
      return true
    })

    if (sort === '-USER_ID') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  }, getUpdateUserArticle: config => {
    const { field, FLAG, USER_ID } = JSON.parse(config.body)
    if (field === 'deletaStatus') {
      return {
        aa: FLAG,
        bb: USER_ID,
        message: '删除成功',
        code: 2000
      }
    } else if (field === 'FLAG') {
      return {
        message: '修改成功',
        code: 2000
      }
    }
  }, getUpdateUserFlag: config => {
    const { field, FLAG, USER_ID } = JSON.parse(config.body)
    if (field === 'FLAG') {
      return {
        aa: FLAG,
        bb: USER_ID,
        message: '修改成功',
        code: 2000
      }
    }
  }, getUpdatePasswordData: config => {
    const { password, newpassword, userid } = JSON.parse(config.body)
    return {
      message: '修改成功',
      code: 2000,
      aa: password,
      bb: newpassword,
      cc: userid
    }
  },
  createUserArticle: () => ({
    message: '创建成功',
    code: 2000
  }),
  getUpdateUserData: () => ({
    message: '创建成功',
    code: 2000
  })
}
