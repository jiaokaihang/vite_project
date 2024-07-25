<template>
    <div class="layout_container">
        <!--做侧菜单  -->
        <div class="layout_slider">
            <Logo />
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 根据动态路由生成的菜单 -->
                 <!-- <Menu :menuList="userStore.menuRouters"></Menu> -->
                <el-menu
            :collapse="isCollapse"
            active-text-color="#ffd04b"
            background-color="#242424"
            class="el-menu-vertical-demo"
            :default-active="onRoutes"
            text-color="#fff"
            :router="true"
            @open="handleOpen"
            @close="handleClose"
            :unique-opened="true"
            :collapse-transition="true">
            <MenuTree :menuList="userStore.menuRouters"></MenuTree>
        </el-menu>

            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <TopHeader/>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed,inject } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
import useUserStore from '../store/modules/user'
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
import MenuTree from './menu/MenuTree.vue'
// 引入内容区
import Main from './main/index.vue'
// 引入头部组件
import TopHeader from './topHeader/TopHeader.vue';

// 获取用户相关的小仓库
let userStore = useUserStore()

console.log(userStore.menuRouters)



const onRoutes = computed(() => {
    const { meta, path } = route;
  
    if (meta.activeMenu) {
        return meta.activeMenu;
    }
    return path
})
// 设置菜单栏可折叠
const isCollapse = inject('isCollapse', ref(false))
// function handleOpen(){
//   isCollapse.value = false;
// }

const handleOpen = (key, keyPath) => {
 
}
const handleClose = (key, keyPath) => {

}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-topHeader-height;
        background: $base-tabbar-background;
    }

    .layout_main {
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background: #ccc;
        position: absolute;
        left: $base-menu-width ;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
    }
}
</style>