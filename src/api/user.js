import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Vue_Web_Template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/Vue_Web_Template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/Vue_Web_Template/user/logout',
    method: 'post'
  })
}
