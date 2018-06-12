import request from '@/frame_src/utils/request'
export function fetchConfigList(query) { // 基础信息配置查询
  return request({
    url: '/config/fetchConfigList',
    method: 'get',
    params: query
  })
}
export function createConfigArticle(data) { // 创建基础信息
  return request({
    url: '/config/createConfigArticle',
    method: 'post',
    data
  })
}
export function updateConfigData(data) { // 修改基础信息配置-
  return request({
    url: '/config/updateConfigData',
    method: 'post',
    data
  })
}
export function updateConfigArticle(data) { // 修改基础信息-删除
  return request({
    url: '/config/updateConfigArticle',
    method: 'get',
    params: data
  })
}
