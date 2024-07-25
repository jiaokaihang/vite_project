import { createApp } from 'vue'
import App from './App.vue'
// 引入elementplush
import ElementPlus from 'element-plus'
//引入样式
import 'element-plus/dist/index.css'
import './styles/index.scss'

//引入语言
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 将elementplus图标注册为全局组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 切换暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入路由
import router from './router'

// 引入pinnia
import pinia from './store'

//获取应用实例对象

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

//配置国际化
app.use(ElementPlus,{
    locale:zhCn
})
app.use(pinia)
// 注册路由模板
app.use(router)


//讲应用挂载到挂载点
app.mount('#app')
