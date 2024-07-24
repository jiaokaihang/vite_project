// 进行axios的二次的封装：使用请求和响应拦截器

import axios from 'axios'
import { ElMessage } from 'element-plus'
// 第一步：利用axios对象的create方法，去创建axios实例（可以进行一些配置）
let request = axios.create({
    // 基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时时间
    timeout: 5000,
})
// 第二部：request实例天剑请求和响应拦截器

request.interceptors.request.use((config) => {
    // config对象，headears属性请求头，经常给服务器端携带公共参数

    // 返回配置对象
    return config
})

// 第三部：响应拦截器
request.interceptors.response.use((response) => {
    // 成功回调
    // 简化数据
    return response.data
}, (e) => {
    // 失败回调，处理http网络失败错误
    console.log(e);
    // 定义一个变量存储网络错误信息
    let message = ''
    let status = e.response.status

    switch (status) {
        case 201:
            message = '账号密码错误'
            break;
        case 401:
            message = 'TOKEN过期'
            break;
        case 403:
            message = '无权访问'
            break;
        case 404:
            message = '请求地址错误'
            break;
        case 500:
            message = '服务器出现问题'
            break;
        default:
            message = '网络出现问题'
            break;
    }
    // 提示错误信息
    ElMessage({
        type: "error",
        message
    })
    return Promise.reject(e)
})

export default request