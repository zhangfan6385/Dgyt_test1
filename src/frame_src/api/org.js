import request from '@/frame_src/utils/request'
export function fetchOrgList(query) { // 查询组织结构信息
  return request({
    url: '/org/fetchOrgList',
    method: 'get',
    params: query
  })
}
export function createOrgArticle(data) { // 创建组织结构
  return request({
    url: '/org/createOrgArticle',
    method: 'post',
    data
  })
}
export function updateOrgArticle(data) { // 修改组织结构信息-删除
  return request({
    url: '/org/updateOrgArticle',
    method: 'post',
    data
  })
}
export function updateOrgData(data) { // 修改组织结构
  return request({
    url: '/org/updateOrgData',
    method: 'post',
    data
  })
}
export function updateUserOrgArticle(data) { // 关联用户与组织结构
  return request({
    url: '/org/updateUserOrgArticle',
    method: 'post',
    data
  })
}
export function deleteUserOrgArticle(data) { // 关联用户与组织结构
  return request({
    url: '/org/deleteUserOrgArticle',
    method: 'post',
    data
  })
}
