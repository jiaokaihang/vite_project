// 权限管理-用户管理列表

import request from "@/utils/request";
import { Header } from "ant-design-vue/es/layout/layout";
// 统一管理接口
const API = {
  USERINFO_API: "/api/userList",
};

// 暴露请求函数
// 登录的接口方法

export const reqCreeateUserList = (data) => {
  return request({
    url: "/createUserList",
    method: "POST",
    data: data,
  });
};

// 查询
export const reqGetUserList = () => {
  return request({
    url: "/createUserList",
    method: "get",
  });
};

// 删除
export const reqDeleteUserList = ({ id }) => {
  return request({
    url: `/createUserList/${id}`,
    method: "delete",
  });
};

export const reqUpdateUserList = ({ id }, params) => {
  console.log("iddd", id);
  return request({
    url: `/createUserList/${id}`,
    method: "put",
    data: params,
  });
};
