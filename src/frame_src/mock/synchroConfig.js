import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const SyncConfigList = []
const count = 100

for (let i = 0; i < count; i++) {
    SyncConfigList.push(Mock.mock({ 
    USER_CODE: Mock.Random.cname(),
    USER_PASS:Mock.Random.guid(),
    SYNC_TYPE:Mock.Random.integer(0, 1),
    SYNC_FLAG:Mock.Random.integer(0, 1),
    SERVER_IP: '192.168.2.'+'@increment',
    "SERVER_PORT|1-10": '5',
    SERVER_URL:'https//'+'@increment',
    REMARK:'' ,
  }))
}

export default {
  fetchSynchroConfigList: config => {
    const { USER_CODE, USER_PASS, SYNC_TYPE,SYNC_FLAG,SERVER_IP,SERVER_PORT,SERVER_URL,REMARK, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = SyncConfigList.filter(item => {
      if (USER_CODE && item.USER_CODE.indexOf(USER_CODE) < 0) return false
      if (USER_PASS && item.USER_PASS.indexOf(USER_PASS) < 0) return false
      if (SYNC_TYPE && item.SYNC_TYPE.indexOf(SYNC_TYPE) < 0) return false
      if (SYNC_FLAG && item.SYNC_FLAG.indexOf(SYNC_FLAG) < 0) return false
      if (SERVER_IP && item.SERVER_IP.indexOf(SERVER_IP) < 0) return false
      if (SERVER_IP && item.SERVER_IP.indexOf(SERVER_IP) < 0) return false
      if (SERVER_PORT && item.SERVER_PORT.indexOf(SERVER_PORT) < 0) return false
      if (SERVER_URL && item.SERVER_URL.indexOf(SERVER_URL) < 0) return false
      if (REMARK && item.REMARK.indexOf(REMARK) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      code: 2000,
      message: '查询成功'
    }
  },

  createSynchroConfigArticle:() =>({
    code: 2000,
    message: '创建成功'
  }),

  updateSynchroConfigData:() =>({
    code: 2000,
    message: '修改成功'
  }),

  DeleteSynchroConfigArticle:() =>({
    code: 2000,
    message: '删除成功'
  }),

  pushOrgList:()=>({
    code: 2000,
    message: '创建成功'
  }),
}