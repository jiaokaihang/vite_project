<template>
    <div>
        <!-- {{ menuList }} -->
        <!-- router="item.path" -->
        <template v-for="(item) in menuList" :key="item.path">
            <el-menu background-color="#001529" text-color="#fff" :router="true" >
                <!-- 没有子路由 -->
                <template v-if="!item.children">
                    <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRouter">
                        <template #title>
                            <el-icon>
                                <component :is="item.meta.icon"></component>
                            </el-icon>
                            <span>{{ item.meta.title }}</span>
                        </template>
                    </el-menu-item>
                </template>
                <!-- 有路由但是子路由的长度只有1 -->
                <template v-if="item.children && item.children.length == 1">
                    <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRouter">
                        <template #title>
                            <el-icon>
                                <component :is="item.children[0].meta.icon"></component>
                            </el-icon>
                            <span>{{ item.children[0].meta.title }}</span>
                        </template>
                    </el-menu-item>
                </template>
                <!-- 有路由但是子路由的长度大于1 -->
                <el-sub-menu :index="item.children.path" v-if="item.children && item.children.length > 1">
                    <template #title>
                        <el-icon>
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <Menu :menuList="item.children"></Menu>
                </el-sub-menu>
            </el-menu>
        </template>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
// 获取父组件传递过来的全部数据
defineProps(['menuList'])

let $router = useRouter()
function goRouter(vc) {
    console.log(vc);
    // 路由跳转
    $router.push(vc.index)


}
</script>

<script lang="ts">
export default {
    name: "Menu"
}



</script>


<style></style>