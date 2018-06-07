import request from '@/frame_src/utils/request'

export function fetchLogInfoList(query) { // 日志查询
  return request({
    url: '/logInfo/fetchLogInfoList',
    method: 'get',
    params: query
  })
}
