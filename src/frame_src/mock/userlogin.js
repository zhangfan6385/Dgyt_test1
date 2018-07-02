import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const UserList = []
const count = 10

for (let i = 0; i < count; i++) {
  UserList.push(Mock.mock({
    LOGIN_ID: '@increment',
    LOGIN_CODE: '@integer(1000000,60000000)',
    LOGIN_REMARK: '@cname',
    LOGIN_PASS: '111111',
    USER_NAME: '@cname'
  }))
}

export default {

  getFetchUserLoginList: config => {
    const { LOGIN_REMARK, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = UserList.filter(item => {
      if (LOGIN_REMARK && item.LOGIN_REMARK.indexOf(LOGIN_REMARK) < 0) return false
      return true
    })

    if (sort === '-LOGIN_ID') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  }, getUpdateUserLoginArticle: config => {
    const { field, FLAG, LOGIN_ID } = JSON.parse(config.body)
    if (field === 'deletaStatus') {
      return {
        aa: FLAG,
        bb: LOGIN_ID,
        message: '删除成功',
        code: 2000
      }
    }
  }, getUpdatePasswordLoginData: config => {
    const { password, newpassword, userid } = JSON.parse(config.body)
    return {
      message: '修改成功',
      code: 2000,
      aa: password,
      bb: newpassword,
      cc: userid
    }
  }, getUpdateUserForLoginArticle: config => {
    const { multipleSelection, roleId } = JSON.parse(config.body)
    return {
      code: 2000,
      message: '修改成功',
      aa: multipleSelection,
      bb: roleId
    }
  },
  getDeleteUserForLoginArticle: config => {
    const { multipleSelection, roleId } = JSON.parse(config.body)
    return {
      code: 2000,
      message: '修改成功',
      aa: multipleSelection,
      bb: roleId
    }
  },
  createUserLoginArticle: () => ({
    message: '创建成功',
    code: 2000
  }),
  getUpdateUserLoginData: () => ({
    message: '创建成功',
    code: 2000
  })
}
