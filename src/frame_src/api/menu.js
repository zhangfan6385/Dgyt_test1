import request from '@/frame_src/utils/request'

export function fetchMenuList(query) {
  return request({
    url: '/menu/fetchMenuList',
    method: 'get',
    params: query
  })
}

export function fetchMenuDetail() {
  return request({
    url: '/menu/fetchMenuDetail',
    method: 'get'
  })
}

export function fetchRoleMenuList(query) {
  return request({
    url: '/menu/fetchRoleMenuList',
    method: 'get',
    params: query
  })
}

export function createMenu(data) {
  return request({
    url: '/menu/createMenu',
    method: 'post',
    params: data
  })
}

export function updateMenu(data) {
  return request({
    url: '/menu/updateMenu',
    method: 'post',
    params: data
  })
}

export function deleteMenu(data) {
  return request({
    url: '/menu/deleteMenu',
    method: 'post',
    params: data
  })
}

export function setRoleMenus(data) {
  return request({
    url: '/menu/setRoleMenus',
    method: 'post',
    params: data
  })
}
