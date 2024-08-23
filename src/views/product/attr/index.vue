<template>
    <div>
        属性管理
        <!-- 模拟并发请求 -->
    </div>
</template>
<script setup>
import {handeQuene} from '@/api/product/demo.js'
import { onMounted } from 'vue'

onMounted(()=>{
    handeQuene(6)
})


</script>
<style></style>