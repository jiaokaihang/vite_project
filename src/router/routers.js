// 对外暴露路由

// 对外暴露路由(常量路由)

export const constantRouter = [
    // 登录组件
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login', //命名路由
        meta: {
            title: '登录',
            hidden: true, //代表标题在菜单中是否隐藏  ，true：隐藏，false：不隐藏
            icon: 'Promotion'
        }
    },
    // 首页组件
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout', //命名路由，
        meta: {
            title: 'layout',
            hidden: false, //代表标题在菜单中是否隐藏  ，false：隐藏，false：不隐藏
            icon: 'HomeFilled',
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false, //代表标题在菜单中是否隐藏  ，false：隐藏，false：不隐藏
                    icon: 'HomeFilled',
                }
            },
        ]

    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        meta: {
            title: "数据大屏",
            hidden: false,
            icon: 'Tools'
        }
    },
    // 权限管理
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: "权限管理",
            hidden: false,
            icon: 'Lock'
        },
        children: [
            {
                path: '/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: "User",
                meta: {
                    title: "用户管理",
                    hidden: false,
                    icon: 'User'
                },
            },
            {
                path: '/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: "角色管理",
                    hidden: false,
                    icon: 'UserFilled'
                },
            },
            {
                path: '/persission',
                component: () => import('@/views/acl/persission/index.vue'),
                name: 'Persission',
                meta: {
                    title: "菜单管理",
                    hidden: false,
                    icon: 'Grid'
                },
            }
        ]
    },
    // 商品路由
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: "商品管理",
            hidden: false,
            icon: 'CollectionTag'
        },
        children: [
            {
                path: '/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: "Trademark",
                meta: {
                    title: "品牌管理",
                    hidden: false,
                    icon: 'ShoppingCart'
                },
            },
            {
                path: '/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: "属性管理",
                    hidden: false,
                    icon: 'StarFilled'
                },
            },
            {
                path: '/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: "SPU管理",
                    hidden: false,
                    icon: 'Share'
                },
            },
            {
                path: '/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: "SKU管理",
                    hidden: false,
                    icon: 'TrendCharts'
                },
            }
        ]
    },
    // 404组件
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404', //命名路由
        meta: {
            title: '404',
            hidden: true, //代表标题在菜单中是否隐藏  ，false：隐藏，false：不隐藏
            icon: 'ChromeFilled'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any', //命名路由
        meta: {
            title: '任意路由',
            hidden: true, //代表标题在菜单中是否隐藏  ，false：隐藏，false：不隐藏
            icon: 'Lightning'
        }
    }
]