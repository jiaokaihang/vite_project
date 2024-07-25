<template>
        <div style="display: flex;justify-content: space-between;">
   <div @click="handelClick" style="display: flex">
     <div style="margin-top: 20px;font-size: 18px;cursor: pointer" v-if="isCollapse == true">
       <el-icon>
         <Fold />
       </el-icon>
     </div>
     
     <div style="margin-top: 20px;font-size: 18px;cursor:pointer" v-else>
       <el-icon>
         <Expand />
       </el-icon>
     </div>
     <div style="margin-top: 20px;margin-left: 15px;">每日一言：{{text}}</div>
   </div>
   
        <div class="toolbar">


            <div style="margin-top: -8px;margin-right: 20px">

               <div style="color: #242424;font-size: 14px;text-align:right;width: 150px;padding-right: 10px;"> {{ userName }}</div>
              <div style="font-size: 10px;margin-top: 10px;"><Date></Date></div>

            </div>

            <div style="margin-top: -10px;vertical-align: middle;margin-right:15px;">
                <el-dropdown>
                    <el-badge value="10">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </el-badge>


                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="loginOut">{{ useStore.loginOut }}</el-dropdown-item>
                           <el-dropdown-item>暗黑模式：<Dark/></el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>


        </div>

    </div>
</template>

<script setup>
import { ref,inject } from 'vue'
import {useRouter} from 'vue-router'
import {DELETE_TOKEN} from '@/utils/token'
//使用store
import { useUser } from '@/store/modules/user/user.js'
import { storeToRefs } from 'pinia'
import Date from '@/components/date/date.vue'
import Drak from '@/components/dark/Dark.vue'
const useStore = useUser()
const url = ref('../../assets/user.png')
//如果直接解构出数据，这个数据不是响应式的，如果想要变成响应式的，需要调用storeToRefs方法
const { userName } = storeToRefs(useStore)

//这种回调函数的形式适合修改集合类的数据，比如数组
useStore.$patch((state) => {
    state.userName = '哈哈哈哈哈'
})

//重置state
useStore.$reset()

const isCollapse = inject('isCollapse', ref(false))
function handelClick (){
  isCollapse.value = !isCollapse.value;
}


//退出登录

const router = useRouter()
function loginOut(){
   // 清楚token及用户信息  --以下为示例
      DELETE_TOKEN()
   // 跳转到登录页面
      router.push('/login')

}
const text = ref('书山有路勤为径，学海无涯苦作舟')

</script>


<style lang="scss" scoped>
.toolbar {
    /* border: 1px solid #f00; */
    margin-top: 15px;
    display: flex;
}

</style>