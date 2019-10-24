import request from "../util/request"

//登陆
export function code2session (params){
    return request.post('/user/code2session',params)
}

//生物认证
export function fingerVerify(params){
    return request.post('/user/fingerPrint',params)
}

//解密数据
export function decryptPhone(params){
    return request.post('/user/decrypt',params)
}
//添加面试

export function requestAddInterview(params){
    return request.post('/sign',params)
}

//获取面试列表

export function requestInterviews(params){
    //console.log(params,"ppppppp")
    return request.get("/sign",params)
}

//获取面试详情

export function requestInterviewDetail(params){
    //console.log(params,"params")
    return request.get(`/sign/${params}`)
}

//更新面试信息

export function requestUpdateInterview(params){
    console.log(params,"params")
    let {id,data}=params
    return request.put(`/sign/${id}`,data)
}