import request from '@/frame_src/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
export function fetchUserList(query) { // 查询用户
  return request({
    url: '/article/fetchUserList',
    method: 'get',
    params: query
  })
}
export function updateUserArticle(data) { // 修改用户信息-删除或者激活用户
  return request({
    url: '/article/updateUserArticle',
    method: 'get',
    params: data
  })
}
export function createUserArticle(data) { // 创建用户
  return request({
    url: '/article/createUserArticle',
    method: 'post',
    data
  })
}
export function updateUserData(data) { // 修改用户信息-
  return request({
    url: '/article/updateUserData',
    method: 'post',
    data
  })
}
export function updateRoleData(data) { // 修改角色
  return request({
    url: '/article/updateRoleData',
    method: 'post',
    data
  })
}
export function fetchRoleList(query) { // 查询角色信息
  return request({
    url: '/article/fetchRoleList',
    method: 'get',
    params: query
  })
}
export function createRoleArticle(data) { // 创建角色
  return request({
    url: '/article/createRoleArticle',
    method: 'post',
    data
  })
}
export function updateRoleArticle(data) { // 修改角色信息-删除
  return request({
    url: '/article/updateRoleArticle',
    method: 'get',
    params: data
  })
}
export function fetchUserRoleList(query) { // 根据查询带rolename的 用户信息
  return request({
    url: '/article/fetchUserRoleList',
    method: 'get',
    params: query
  })
}
export function updateUserRoleArticle(data) { // 关联用户与角色
  return request({
    url: '/article/updateUserRoleArticle',
    method: 'get',
    params: data
  })
}
export function updatePasswordData(data) { // 修改密码
  return request({
    url: '/article/updatePasswordData',
    method: 'get',
    params: data
  })
}
export function fetchConfigList(query) { // 基础信息配置查询
  return request({
    url: '/article/fetchConfigList',
    method: 'get',
    params: query
  })
}
export function createConfigArticle(data) { // 创建基础信息
  return request({
    url: '/article/createConfigArticle',
    method: 'post',
    data
  })
}
export function updateConfigData(data) { // 修改基础信息配置-
  return request({
    url: '/article/updateConfigData',
    method: 'post',
    data
  })
}
export function updateConfigArticle(data) { // 修改基础信息-删除
  return request({
    url: '/article/updateConfigArticle',
    method: 'get',
    params: data
  })
}
export function fetchOrgList(query) { // 查询组织结构信息
  return request({
    url: '/article/fetchOrgList',
    method: 'get',
    params: query
  })
}
export function createOrgArticle(data) { // 创建组织结构
  return request({
    url: '/article/createOrgArticle',
    method: 'post',
    data
  })
}
export function updateOrgArticle(data) { // 修改组织结构信息-删除
  return request({
    url: '/article/updateOrgArticle',
    method: 'get',
    params: data
  })
}
export function updateOrgData(data) { // 修改组织结构
  return request({
    url: '/article/updateOrgData',
    method: 'post',
    data
  })
}
export function fetchUserOrgList(query) { // 根据查询带orgid的 用户信息
  return request({
    url: '/article/fetchUserOrgList',
    method: 'get',
    params: query
  })
}
export function updateUserOrgArticle(data) { // 关联用户与组织结构
  return request({
    url: '/article/updateUserOrgArticle',
    method: 'get',
    params: data
  })
}
