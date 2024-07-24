<script setup>

const props = defineProps(['menuList'])

</script>


<template>
  <div>
    <template v-for="(item ) in props.menuList" :key="item.path+''">
      <!-- {{ item }} -->
      <!--      没有子菜单-->
      <template v-if="!item.children">
        <!--             {{ item.children.title }}-->
        <el-menu-item :index="item.path" v-if="!item.meta.hidden">
          <el-icon>
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>

      <template v-if="item.children && item.children.length == 1">
        <!-- &lt;!&ndash;有路由但是路由的长度只有1&ndash;&gt; -->
        <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
          <template #title>
            <span>
              <el-icon>
                <component :is="item.children[0].meta.icon"></component>
              </el-icon>
              {{ item.children[0].meta.title }}
            </span>
          </template>
        </el-menu-item>
      </template>

      <!--有路由但是子路由的长度大于1-->
      <!-- <template v-if="item.children"> -->

        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">

          <template #title>
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!--        有子菜单的继续遍历（递归）-->
          <MenuTree :menuList="item.children"></MenuTree>
        </el-sub-menu>
      <!-- </template> -->

    </template>
  </div>
</template>


<style></style>