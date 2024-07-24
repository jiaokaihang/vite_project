import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig((command)=>{
  return {
    plugins: [vue()],
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
