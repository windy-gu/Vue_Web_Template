import request from '@/utils/request'

// 发送验证码
export function apiExecute(data) {
    console.log(data)
    return request({
        url: "author/url/execute",
        method: 'post',
        data
    })
}

// 查询验证码
// export function checkSmsCode(data) {
//     console.log(data)
//     return request({
//         url: "user/checkSmsCode",
//         method: 'post',
//         data
//     })
// }