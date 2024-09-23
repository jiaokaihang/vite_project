// 进行axios的二次的封装：使用请求和响应拦截器

import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { GET_TOKEN } from "./token";
// 配置新建一个 axios 实例
const request = axios.create({
  // baseURL:
  // "https://www.fastmock.site/mock/eb1446348d2adadbf25368aba4e89e31/api",
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "/api",
  timeout: 50000,
});
// console.log(import.meta.env.VITE_API_URL);

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = GET_TOKEN("token");
    // 在发送请求之前做些什么 token
    if (token) {
      console.log("token", token);
      // config.headers.common["token"] = `${GET_TOKEN("token")}`;
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code && res.code !== "2000") {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === "4001") {
        Session.clear(); // 清除浏览器全部临时缓存
        window.location.href = "/"; // 去登录页
        ElMessageBox.alert("你已被登出，请重新登录", "提示", {})
          .then(() => {})
          .catch(() => {});
      }
      return response.data;
      // return Promise.reject(request.interceptors.response);
    } else {
      return response.data;
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      console.log(error);
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error("接口路径找不到");
    }
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default request;
