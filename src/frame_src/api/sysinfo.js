import request from '@/frame_src/utils/request'
export function fetchSysInfoList(query) { // 基础信息配置查询
  return request({
    url: '/sysinfo/fetchSysInfoList', // '/sysinfo/fetchSysInfoList',
    method: 'get',
    params: query
  })
}
export function createSysInfoArticle(data) { // 创建基础信息
  return request({
    url: '/sysinfo/createSysInfoArticle', // '/sysinfo/createSysInfoArticle',
    method: 'post',
    data
  })
}
export function updateSysInfoData(data) { // 修改基础信息配置-
  return request({
    url: '/sysinfo/updateSysInfoData', // '/sysinfo/updateSysInfoData',
    method: 'post',
    data
  })
}
export function updateSysInfoArticle(data) { // 修改基础信息-删除
  return request({
    url: '/sysinfo/updateSysInfoArticle', // '/api/values/Post'
    method: 'post',
    params: data
  })
}
