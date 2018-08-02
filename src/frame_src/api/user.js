import request from '@/frame_src/utils/request'
export function fetchUserList(query) { // 查询用户
  return request({
    url: '/user/fetchUserList',
    method: 'get',
    params: query
  })
}
export function fetchUserForLoginList(query) { // 查询登陆账号对应的用户
  return request({
    url: '/user/fetchUserForLoginList',
    method: 'get',
    params: query
  })
}
export function updateUserArticle(data) { // 修改用户信息-删除
  return request({
    url: '/user/updateUserArticle',
    method: 'post',
    data
  })
}
export function updateUserFlag(data) { // 修改用户信息-激活用户
  return request({
    url: '/user/updateUserFlag',
    method: 'post',
    data
  })
}
export function createUserArticle(data) { // 创建用户
  return request({
    url: '/user/createUserArticle',
    method: 'post',
    data
  })
}
export function updateUserData(data) { // 修改用户信息-
  return request({
    url: '/user/updateUserData',
    method: 'post',
    data
  })
}
export function updatePasswordData(data) { // 修改密码
  return request({
    url: '/user/updatePasswordData',
    method: 'post',
    data
  })
}
export function fetchUserRoleList(query) { // 根据查询带rolename的 用户信息
  return request({
    url: '/user/fetchUserRoleList',
    method: 'get',
    params: query
  })
}
export function fetchUserOrgList(query) { // 根据查询带orgid的 用户信息
  return request({
    url: '/user/fetchUserOrgList',
    method: 'get',
    params: query
  })
}

export function fetchUserpParentList(query) { // 查询关联账号
  return request({
    url: '/user/fetchUserForAllList',
    method: 'get',
    params: query
  })
}
