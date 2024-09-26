// 账号管理
import request from "@/utils/request";

// 暴露请求函数
// 登录的接口方法

export const reqcreateAccountList = (params) => {
  return request({
    url: "/accountList",
    method: "post",
    data: params,
  });
};
export const reqGetAccountList = (params) => {
  return request({
    url: "/accountList",
    method: "get",
    data: params,
  });
};

export const reqQueryAccountList = (zhanghaoName) => {
  return request({
    url: `/accountList?zhanghaoName=${zhanghaoName}`,
    method: "get",
  });
};
export const reqEditAccountList = ({ id }, params) => {
  return request({
    url: `/accountList/${id}`,
    method: "put",
    data: params,
  });
};

export const reqDeleteAccountList = ({ id }) => {
  return request({
    url: `/accountList/${id}`,
    method: "DELETE",
  });
};
