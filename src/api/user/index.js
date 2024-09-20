// 统一管理user接口

import request from "@/utils/request";
// 统一管理接口
const API = {
  LOGIN_API: "/api/user/login",
  USERINFO_API: "/api/user/info",
};

// 暴露请求函数
// 登录的接口方法
// export const reqLogin = (data) => request.post(API.LOGIN_API, data)

export const reqLogin = (params) => {
  console.log("数据", params);
  return request({
    url: "/api/user/login",
    // url: "/login",
    method: "POST",
    data: params,
  });
};
