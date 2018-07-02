import request from '@/frame_src/utils/request'
export function fetchUserLoginList(query) { // 查询用户
  return request({
    url: '/userlogin/fetchUserLoginList',
    method: 'get',
    params: query
  })
}
export function updateUserLoginArticle(data) { // 修改用户信息-删除
  return request({
    url: '/userlogin/updateUserLoginArticle',
    method: 'post',
    data
  })
}
export function createUserLoginArticle(data) { // 创建用户
  return request({
    url: '/userlogin/createUserLoginArticle',
    method: 'post',
    data
  })
}
export function updateUserLoginData(data) { // 修改用户信息-
  return request({
    url: '/userlogin/updateUserLoginData',
    method: 'post',
    data
  })
}
export function updatePasswordLoginData(data) { // 修改密码
  return request({
    url: '/userlogin/updatePasswordLoginData',
    method: 'post',
    data
  })
}
export function updateUserForLoginArticle(data) { // 挂载登陆账号对应的用户
  return request({
    url: '/userlogin/updateUserForLoginArticle',
    method: 'post',
    data
  })
}

export function deleteUserForLoginArticle(data) { // 取消用户分配的登陆账号
  return request({
    url: '/userlogin/deleteUserForLoginArticle',
    method: 'post',
    data
  })
}
