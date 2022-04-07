import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/Vue_Web_Template/table/list',
    method: 'get',
    params
  })
}
