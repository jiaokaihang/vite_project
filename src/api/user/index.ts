// 统一管理user接口

import request from "@/utils/request";
import type { loginFrom, loginResponseData, userResponseData } from "./type";
// 统一管理接口
enum API {
    LOGIN_API = "/user/login",
    USERINFO_API = '/user/info'
}

// 暴露请求函数
// 登录的接口方法
export const reqLogin = (data: loginFrom) => request.post<any, loginResponseData>(API.LOGIN_API, data)
// 用户信息
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_API)