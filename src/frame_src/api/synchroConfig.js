import request from '@/frame_src/utils/request'
export function fetchSynchroConfigList(query) { // 查询云配置信息
  return request({
    url: 'SyncConf/fetchSyncConfList',
    method: 'get',
    params: query
  })
}
export function createSynchroConfigArticle(data) { // 新增云配置信息
  return request({
    url: 'SyncConf/createSyncConf',
    method: 'post',
    data
  })
}
export function updateSynchroConfigData(data) { // 修改云配置信息配置-
  return request({
    url: 'SyncConf/updateSyncConf',
    method: 'post',
    data
  })
}
export function DeleteSynchroConfigArticle(data) { //删除配置信息
  return request({
    url: 'SyncConf/deleteSyncConf',
    method: 'post',
    params: data
  })
}

export function pushOrgList(data) { // 同步结果查询
  return request({
    url: '/Org/pushOrgList',
    method: 'post',
    data
  })
}

