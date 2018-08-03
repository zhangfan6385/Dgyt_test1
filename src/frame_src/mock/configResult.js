import Mock from 'mockjs'
import { param2Obj } from '@/frame_src/utils'

const SyncConfigResultList = []
const count = 20

for (let i = 0; i < count; i++) {
    SyncConfigResultList.push(Mock.mock({
        RESULT_ID: Mock.Random.guid(),
        SEND_URL: 'https//' + '@increment',
        RECEIVE_URL: 'https//' + '@increment' + '@increment',
        SYNC_CONTENT: Mock.Random.cname(),
        SYNC_RESULT: '发送结果' + '@increment',
        ERROR_INFO: '错误信息' + '@increment',
        REMARK: '123'
    }))
}

export default {
    GetConfigResult: config => {
        const { RESULT_ID, SEND_URL, RECEIVE_URL, SYNC_CONTENT, SYNC_RESULT, ERROR_INFO, REMARK,page = 1, limit = 20} = param2Obj(config.url)

        const mockList = SyncConfigResultList.filter(item => {
            if (RESULT_ID && item.RESULT_ID.indexOf(RESULT_ID) < 0) return false
            if (SEND_URL && item.SEND_URL.indexOf(SEND_URL) < 0) return false
            if (RECEIVE_URL && item.RECEIVE_URL.indexOf(RECEIVE_URL) < 0) return false
            if (SYNC_CONTENT && item.SYNC_CONTENT.indexOf(SYNC_CONTENT) < 0) return false
            if (SYNC_RESULT && item.SYNC_RESULT.indexOf(SYNC_RESULT) < 0) return false
            if (SEND_ERROR_INFO && item.ERROR_INFO.indexOf(ERROR_INFO) < 0) return false
            if (REMARK && REMARK.indexOf(REMARK) < 0) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        
        return {
            total: mockList.length,
            items: pageList,
            code: 2000,
            message: '查询成功'
          }
    }
}