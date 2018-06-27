import request from '@/frame_src/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token, departCode) {
  const data = {
    token,
    departCode
  }
  return request({
    url: '/user/info',
    method: 'post',
    data
    // params: { data }
  })
}

