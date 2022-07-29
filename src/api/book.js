import request from '@/utils/request'

// 发送验证码
export function sendSmsCode(data) {
    console.log(data)
    return request({
        url: "user/sendSms",
        method: 'post',
        data
    })
}

// 查询验证码
export function checkSmsCode(data) {
    console.log(data)
    return request({
        url: "user/checkSmsCode",
        method: 'post',
        data
    })
}