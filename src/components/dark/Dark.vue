<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

const theme = ref(false)

const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'useDarkKEY',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})
const toggle = useToggle(isDark);
</script>

<template>
  <el-switch
      inline-prompt
      v-model="theme"
      @click="toggle()"
  ></el-switch>
</template>

<style>

</style>