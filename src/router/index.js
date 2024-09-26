//  通过vue-router插件实现路由模板配置

import { createRouter, createWebHashHistory } from "vue-router";
import { constantRouter } from "./routers";
import { GET_TOKEN } from "@/utils/token.js";
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0, //水平方向
      top: 0, //垂直方向
    };
  },
});

// 全局守卫，登录拦截，本地没有存token，则跳转到登录页
router.beforeEach((to, from, next) => {
  const token = GET_TOKEN();
  // console.log('获取的token', token);

  // 如果目标路由是登录页并且用户已经拥有token
  if (to.path === "/login") {
    if (token) {
      // 如果已经登录，重定向到首页或前一个页面
      next(from.fullPath && from.fullPath !== "/login" ? from.fullPath : "/");
    } else {
      // 如果没有token，允许访问登录页
      next();
    }
  } else {
    // 对于非登录页的路由
    if (to.meta.needLogin) {
      // 如果路由需要登录但没有token
      if (!token) {
        next({ path: "/login" });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
