//  通过vue-router插件实现路由模板配置

import {createRouter,createWebHashHistory} from 'vue-router'
import {constantRouter} from './routers'

let router = createRouter({
    history:createWebHashHistory(),
    routes:constantRouter,
    //滚动行为
    scrollBehavior(){
        return {
            left:0,//水平方向
            top:0,//垂直方向
        }
    }
})

export default router