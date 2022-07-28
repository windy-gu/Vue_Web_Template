import request from '@/utils/request'

// 添加作者信息
export function createAuthorInfo(data) {
  console.log(data)
  return request({
    url: "/author/add",
    method: 'post',
    data
  })
}

// 获取所有作者信息
export function getAuthorInfo() {
  return request({
    url: "/author/list",
    method: 'get'
  })
}

export function getAuthorInfoByPagination(data) {
  return request({
    url: "/author/list",
    method: 'post',
    data
  })
}

// 通过作者ID获取作者信息
export function getAuthorInfoById(id) {
  return request({
    url: "/author/detail/" + id,
    method: 'get'
  })
}

// 通过作者ID获取作者信息
export function getAuthorListById(data) {
  return request({
    url: "/author/list" ,
    method: 'post',
    data
  })
}

// 更新作者信息
export function UpdateAuthor(data) {
  return request({
    url: "/author/update",
    method: 'post',
    data
  })
}

// 删除作者信息接口
export function DeleteAuthor(data) {
  return request({
    url: "/author/delete",
    method: 'post',
    data
  })
}
