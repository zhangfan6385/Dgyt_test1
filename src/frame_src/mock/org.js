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
    'ISINVALID|1': ['0', '1'],
    remark: '@title(1,9)',
    pageviews: '@integer(300, 5000)'
  }))
}

export default {
  getUpdateUserOrgArticle: config => {
    const { multipleSelection, roleId } = JSON.parse(config.body)
    return {
      message: '分配成功',
      code: 2000,
      aa: multipleSelection,
      bb: roleId
    }
  }, getDeleteUserOrgArticle: config => {
    const { multipleSelection } = JSON.parse(config.body)
    return {
      message: '分配成功',
      code: 2000,
      aa: multipleSelection
    }
  }, getUpdateOrgArticle: config => {
    const { field, id } = JSON.parse(config.body)
    if (field === 'deletaStatus') {
      return {
        aa: id,
        message: '删除成功',
        code: 2000
      }
    }
  },
  getFetchOrgList: config => {
    const { sysCode = '2' } = param2Obj(config.url)

    if (sysCode === '2') {
      return {
        message: '查询成功',
        code: 2000,
        items: [{
          'id': 26,
          'parentId': null,
          'orgName': '大港油田一部',
          'orgCode': '1401',
          'remark': '1级单位',
          'phone': '1361088982',
          'phoneS': '15432222123',
          'phoneFax': '024-2349874',
          'orgAddr': '天津大港油田石油大街',
          'ISINVALID': '1',
          'children': [{
            'id': 2601,
            'parentId': 26,
            'orgName': '大港油田财务',
            'orgCode': '140101',
            'ISINVALID': '0',
            'remark': '',
            'children': []
          }]
        }, {
          'id': 27,
          'parentId': null,
          'orgName': '大港油田二部',
          'orgCode': '1501',
          'remark': '2级单位',
          'phone': '1361088982',
          'phoneS': '15432222123',
          'phoneFax': '024-2349874',
          'orgAddr': '天津大港油田石油大街',
          'ISINVALID': '1',
          'children': [{
            'id': 2701,
            'parentId': 27,
            'orgName': '大港油田财务',
            'orgCode': '150101',
            'remark': '',
            'ISINVALID': '1',
            'children': []
          }, {
            'id': 2702,
            'parentId': 27,
            'orgName': '大港油田信息科',
            'orgCode': '150102',
            'remark': '一级单位',
            'phone': '1361088982',
            'phoneS': '15432222123',
            'phoneFax': '024-2349874',
            'orgAddr': '天津大港油田石油大街',
            'children': []
          }]
        }] }
    } else {
      return {
        message: '查询成功',
        code: 2000,
        items: [{
          'id': 26,
          'parentId': null,
          'orgName': '大港油田三部',
          'orgCode': '1403',
          'remark': '一级单位',
          'phone': '1361088982',
          'phoneS': '15432222123',
          'phoneFax': '024-2349874',
          'orgAddr': '天津大港油田石油大街',
          'children': []
        }, {
          'id': 27,
          'parentId': null,
          'orgName': '大港油田四部',
          'orgCode': '1404',
          'remark': '一级单位',
          'phone': '1361088982',
          'phoneS': '15432222123',
          'phoneFax': '024-2349874',
          'orgAddr': '天津大港油田石油大街',
          'children': [{
            'id': 2701,
            'parentId': 27,
            'orgName': '大港油田财务部',
            'orgCode': '140401',
            'remark': '一级单位',
            'phone': '1361088982',
            'phoneS': '15432222123',
            'phoneFax': '024-2349874',
            'orgAddr': '天津大港油田石油大街',
            'children': []
          }, {
            'id': 2702,
            'parentId': 27,
            'orgName': '大港油田信息科',
            'orgCode': '140402',
            'remark': '一级单位',
            'phone': '1361088982',
            'phoneS': '15432222123',
            'phoneFax': '024-2349874',
            'orgAddr': '天津大港油田石油大街',
            'children': []
          }]
        }] }
    }
  },
  createOrgArticle: () => ({

    message: '创建成功',
    code: 2000

  }),
  uploadOrgArticle: config => {
    const { listupload } = JSON.parse(config.body)
    alert('dfgdg')
    console.log(listupload)
    return {
      message: '分配成功',
      code: 2000,
      aa: listupload
    }
  },
  getUpdateOrgData: () => ({
    message: '修改成功',
    code: 2000
  })
}
