import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ command }) => {
  console.log("command", command);
  return {
    // vue3 解决使用datav在页面中无法使用问题 --start
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    optimizeDeps: {
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
    server: {
      // 配置代理
      proxy: {
        "/api": {
          // port: "5173",
          target:
            "https://www.fastmock.site/mock/eb1446348d2adadbf25368aba4e89e31/api", // 替换为你的后端服务地址
          changeOrigin: true, // 允许跨域
          ws: true,
          // rewrite: (path) => path.replace(/^\/api/, ""), // 重写路径，根据需要配置
          pathRewrite: {
            "^/api": "", // 将/api替换为空字符串
          },
        },
      },
    },

    //vue3  解决使用datav在页面中无法使用问题 --end
    plugins: [
      vue(),
      //mock配置项
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve", //保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: {
        //配置相对路径别名，使用@代替src
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/variable.scss";`,
        },
      },
    },
  };
});
