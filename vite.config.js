import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {viteMockServe} from 'vite-plugin-mock'


export default defineConfig(({command})=>{
 console.log('command',command)
  return {
    // vue3 解决使用datav在页面中无法使用问题 --start
    build:{
      commonjsOptions:{
        include: [/node_modules/,]
      }
    },
    optimizeDeps:{
       //开发时，解决这些commonjs包转化为esm包
       include: [
        "@jiaminghi/c-render",
        "@jiaminghi/c-render/lib/plugin/util",
        "@jiaminghi/charts/lib/util/index",
        "@jiaminghi/charts/lib/util",
        "@jiaminghi/charts/lib/extend/index",
        "@jiaminghi/charts",
        "@jiaminghi/color",
      ],
    },

    //vue3  解决使用datav在页面中无法使用问题 --end
    plugins: [
      vue(),
      //mock配置项
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
      })
    ],
    resolve:{
      alias:{  //配置相对路径别名，使用@代替src
        '@':path.resolve('./src')
      }
    },
    css:{
      preprocessorOptions:{
        scss:{
           javascriptEnabled: true,
           additionalData: `@import "@/styles/variable.scss";`
        }
      }
    }
  }
})
