// 创建用户相关的小仓库

import { defineStore } from "pinia";
// 创建小仓库
// 引入接口
import { reqLogin } from "@/api/user";
import { SET_TOKEN, GET_TOKEN } from "../../utils/token";
// 引入路由，（常量路由）
import { constantRouter } from "@/router/routers";
import { ElMessage } from "element-plus";

let useUserStore = defineStore("User", {
  // 数据
  state: () => {
    return {
      token: GET_TOKEN(), //用户的唯一标识
      menuRouters: constantRouter, //仓库存储生成菜单的数组

      tabsList: [],
      tabsActive: "/home",
    };
  },
  // 异步||逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data) {
      console.log(data);
      let result = await reqLogin();
      // let result = await reqLogin(data);
      console.log("获取的数据", result);
      // if (result.code == 200) {
      // ElMessage.success("登录成功");
      // this.token = result.data.user.token;
      if (result.info.username == "admin" && result.info.password == "123456") {
        ElMessage.success("登录成功");
        this.token = result.info.token;
        // 本地存储持久化存储
        SET_TOKEN(result.info.token);
        return "ok";
      } else {
        ElMessage.error("用户名或密码错误");
        return;
      }

      // 能保证当前async函数返回一个成功的promise
      // } else {
      //   return Promise.reject(new Error(result.data.message));
      // }
    },

    // 根据侧边栏冬天生成tabs
  },
  getters: {},
});

// 对外暴露小仓库的方法
export default useUserStore;
