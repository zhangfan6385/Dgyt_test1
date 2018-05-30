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
export function fetchUserList(query) {
  return request({
    url: '/article/fetchUserList',
    method: 'get',
    params: query
  })
}
export function updateUserList(query) {
  return request({
    url: '/article/userList',
    method: 'get',
    params: query
  })
}
export function updateUserArticle(data) {
  return request({
    url: '/article/updateUserArticle',
    method: 'get',
    params: data
  })
}
export function createUserArticle(data) {
  return request({
    url: '/article/createUserArticle',
    method: 'post',
    data
  })
}
export function updateUserData(data) {
  return request({
    url: '/article/updateUserData',
    method: 'post',
    data
  })
}
export function updateRoleData(data) {
  return request({
    url: '/article/updateRoleData',
    method: 'post',
    data
  })
}
export function fetchRoleList(query) {
  return request({
    url: '/article/fetchRoleList',
    method: 'get',
    params: query
  })
}
export function createRoleArticle(data) {
  return request({
    url: '/article/createRoleArticle',
    method: 'post',
    data
  })
}
export function updateRoleArticle(data) {
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
export function updateUserRoleArticle(data) {
  return request({
    url: '/article/updateUserRoleArticle',
    method: 'get',
    params: data
  })
}
export function updatePasswordData(data) {
  return request({
    url: '/article/updatePasswordData',
    method: 'get',
    params: data
  })
}
