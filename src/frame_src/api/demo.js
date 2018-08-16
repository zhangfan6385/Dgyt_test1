import request from '@/frame_src/utils/request'
export function fetchDemoList(query) { // Demo信息配置查询
  return request({
    url: '/demo/fetchDemoList',
    method: 'get',
    params: query
  })
}
export function createDemoArticle(data) { // 创建Demo信息
  return request({
    url: '/demo/createDemoArticle',
    method: 'post',
    data
  })
}
export function updateDemoData(data) { // 修改Demo信息配置-
  return request({
    url: '/demo/updateDemoData',
    method: 'post',
    data
  })
}
export function updateDemoArticle(data) { // 修改Demo信息-删除
  return request({
    url: '/demo/updateDemoArticle',
    method: 'post',
    data
  })
}
