import { defineStore } from "pinia";



//useStore 可以是useUser useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id

export const useUser = defineStore("user", {
  //添加state

  state: () => {
    //数据
    return {
      userName: "段红运",
      list: "退出",
      isCollapse:false,
      token:sessionStorage.getItem('TOKEN'),

    };
  },
  getters: {
    //类似计算属性，推荐里面传递衣蛾形参的写法，不同意出错
    loginOut: (state) => {
      return state.list == "退出" ? "退出登录" : "退出";
    },
    isCollapseBoolean:(state)=>{
      return state.isCollapse = !state.isCollapse
    },
    //....如果有其他的模块可以继续在下面使用


  },
  actions: {
    // 这里的方法要写成普通函数，因为里面需要通过this去访问state里面的内容
    changeName(newName) {
      setTimeout(() => {
        this.userName = newName;
      }, 1000);
    },
    loginUser(data){
      console.log(data)
    if(data.username === 'admin' && data.password === '123456'){
      sessionStorage.setItem('TOKEN',result.data.token)
      return Promise.resolve(true)
       // this.token= result.data.token
    //   数据持久化
     
    }else{
      return Promise.reject(new Error('用户名或密码错误'))
    }
    }
  },
});
