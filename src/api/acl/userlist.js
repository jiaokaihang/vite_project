// 权限管理-用户管理列表

import request from "@/utils/request";
// 统一管理接口
const API ={
    USERINFO_API : '/api/userList'
}

// 暴露请求函数
// 登录的接口方法

export const reqGetUserList = (params) =>{
    return request({
        url:'/api/userList',
        method:'post',
    })
}