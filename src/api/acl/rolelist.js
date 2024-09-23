// 权限管理-角色管理列表

import request from "@/utils/request";
// 统一管理接口
const API = {
  USERINFO_API: "/api/roleList",
};

// 暴露请求函数
// 登录的接口方法

export const reqGetRoleList = (params) => {
  return request({
    url: "/RoleLists",
    method: "get",
  });
};

export const reqCreateRoleList = (data) => {
  return request({
    url: "/RoleLists",
    method: "POST",
    data: data,
  });
};
export const reqDeleteRoleList = ({ id }) => {
  return request({
    url: `/RoleLists/${id}`,
    method: "DELETE",
  });
};

export const reqUpdateRoleList = ({ id }, params) => {
  return request({
    url: `/RoleLists/${id}`,
    method: "put",
    data: params,
  });
};
