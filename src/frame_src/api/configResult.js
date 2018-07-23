import request from '@/frame_src/utils/request'
export function GetConfigResult(query) { // 基础信息配置查询
  return request({
    url: 'SyncResult/fetchSyncResultList',
    method: 'get',
    params: query
  })
}