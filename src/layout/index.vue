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
                <el-menu :collapse="isCollapse" active-text-color="#ffd04b" background-color="#242424"
                    class="el-menu-vertical-demo" :default-active="onRoutes" text-color="#fff" :router="true"
                    :unique-opened="true" :collapse-transition="true" >
                    <MenuTree :menuList="userStore.menuRouters"></MenuTree>
                </el-menu>

            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <TopHeader />

        </div>
        <!-- 内容展示区 -->
        <div class="layout_main">

            <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab"
                @tab-click="clickBtn">
                <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                    <Main></Main>
                </el-tab-pane>
            </el-tabs>
            <!-- <Main></Main> -->
        </div>
    </div>
</template>

<script setup>
import { ref, computed, inject, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute()

import useUserStore from '../store/modules/user'
import Logo from './logo/index.vue'
// 引入菜单组件
import MenuTree from './menu/MenuTree.vue'
// 引入内容区
import Main from './main/index.vue'
// 引入头部组件
import TopHeader from './topHeader/TopHeader.vue';

// 获取用户相关的小仓库
let userStore = useUserStore()
// 设置菜单栏可折叠
const isCollapse = inject('isCollapse', ref(false))

const onRoutes = computed(() => {
    const { meta, path } = route;

    if (meta.activeMenu) {
        return meta.activeMenu;
    }
    return path
})

// 面包屑导航动态删减
const editableTabs = ref([
    {
        title: '首页',
        name: 'Home',
        path: '/home'
    }
])
const editableTabsValue = ref('Home')
const removeTab = (targetName) => {
    const tabs = editableTabs.value;
    let activeName = editableTabsValue.value;

    if (tabs.length === 2) { // 检查是否只剩一个标签页
        activeName = 'Home'; // 设置为首页
        router.push({ name: 'Home' }); // 跳转到首页
    } else if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                }
            }
        });
    }

    editableTabsValue.value = activeName;
    editableTabs.value = tabs.filter(tab => tab.name !== targetName);
    router.push({ name: activeName });
}

const clickBtn = (tab) => {
    router.push({ name: tab.props.name })
}
function handelChange(value){
    console.log(value);
}

// onMounted(() => { // 每次刷新之后，默认显示首页
//     router.push({ name: 'Home' });
// }); 

watch(route, (newVal) => {
    const exists = editableTabs.value.some(tab => tab.name === newVal.name)
    if (!exists && newVal.name !== 'home') {
        editableTabs.value.push({
            title: newVal.meta.title,
            name: newVal.name,
            path: newVal.path
        })
    }
    editableTabsValue.value = newVal.name
})


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
        background: #f5f5f5;
        // background: #fff;
        position: absolute;
        left: $base-menu-width ;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
    }
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.3s;
}


.fade-enter-to {
    opacity: 1;
}
</style>