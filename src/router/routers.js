// 对外暴露路由

// 对外暴露路由(常量路由)

export const constantRouter = [
  // 登录组件
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login", //命名路由
    meta: {
      title: "登录",
      hidden: true, //代表标题在菜单中是否隐藏  ，true：隐藏，false：不隐藏
      icon: "Promotion",
      needLogin: false,
    },
  },
  // 首页组件
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "layout", //命名路由，
    meta: {
      title: "layout",
      hidden: false, //代表标题在菜单中是否隐藏  ，false：隐藏，false：不隐藏
      icon: "HomeFilled",
      needLogin: true,
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页",
          hidden: false, //代表标题在菜单中是否隐藏  ，false：隐藏，false：不隐藏
          icon: "HomeFilled",
          needLogin: true,
        },
      },
    ],
  },
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Tools",
      needLogin: true,
    },
  },
  // 权限管理
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
      needLogin: true,
    },
    children: [
      {
        path: "/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
          needLogin: true,
        },
      },
      {
        path: "/account",
        component: () => import("@/views/acl/zhanghao/account.vue"),
        name: "Account",
        meta: {
          title: "账号管理",
          hidden: false,
          icon: "User",
          needLogin: true,
        },
      },
      {
        path: "/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
          needLogin: true,
        },
      },
      {
        path: "/persission",
        component: () => import("@/views/acl/persission/index.vue"),
        name: "Persission",
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "Grid",
          needLogin: true,
        },
      },

      {
        path: "/structure",
        component: () => import("@/views/acl/structure/index.vue"),
        name: "Structure",
        meta: {
          title: "组织架构",
          hidden: false,
          icon: "Share",
          needLogin: true,
        },
      },
    ],
  },
  // 商品路由
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "CollectionTag",
      needLogin: true,
    },
    children: [
      {
        path: "/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          hidden: false,
          icon: "ShoppingCart",
          needLogin: true,
        },
      },
      {
        path: "/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          hidden: false,
          icon: "StarFilled",
          needLogin: true,
        },
      },
      {
        path: "/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "SPU管理",
          hidden: false,
          icon: "Share",
          needLogin: true,
        },
      },
      {
        path: "/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "SKU管理",
          hidden: false,
          icon: "TrendCharts",
          needLogin: true,
        },
      },
    ],
  },
  // 404组件
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404", //命名路由
    meta: {
      title: "404",
      hidden: true, //代表标题在菜单中是否隐藏  ，false：隐藏，false：不隐藏
      icon: "ChromeFilled",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any", //命名路由
    meta: {
      title: "任意路由",
      hidden: true, //代表标题在菜单中是否隐藏  ，false：隐藏，false：不隐藏
      icon: "Lightning",
    },
  },
];
