import request from '@/frame_src/utils/request'
export function updateRoleData(data) { // 修改角色
  return request({
    url: '/role/updateRoleData',
    method: 'post',
    data
  })
}
export function fetchRoleList(query) { // 查询角色信息
  return request({
    url: '/role/fetchRoleList',
    method: 'get',
    params: query
  })
}
export function createRoleArticle(data) { // 创建角色
  return request({
    url: '/role/createRoleArticle',
    method: 'post',
    data
  })
}
export function updateRoleArticle(data) { // 修改角色信息-删除
  return request({
    url: '/role/updateRoleArticle',
    method: 'post',
    data
  })
}
export function updateUserRoleArticle(data) { // 关联用户与角色
  return request({
    url: '/role/updateUserRoleArticle',
    method: 'post',
    data
  })
}
export function deleteUserRoleArticle(data) { // 清空用户与角色
  return request({
    url: '/role/deleteUserRoleArticle',
    method: 'post',
    data
  })
}
