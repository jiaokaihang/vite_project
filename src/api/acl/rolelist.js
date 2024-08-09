// 权限管理-角色管理列表

import request from "@/utils/request";
// 统一管理接口
const API ={
    USERINFO_API : '/api/roleList'
}

// 暴露请求函数
// 登录的接口方法

export const reqGetRoleList = (params) =>{
    return request({
        url:'/api/roleList',
        method:'post',
    })
}