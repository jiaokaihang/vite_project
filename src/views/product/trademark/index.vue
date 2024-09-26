<template>
    <!-- 上传组件 -->
    <el-upload class="upload-demo" drag action="#" accept=".jpg,.png,.xlsx" :show-file-list="showFile" multiple
        @change="changfile">
        <!-- 上传图标 -->
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <!-- 上传提示 -->
        <div class="el-upload__text">
            在此处 <em>点击即可上传</em>
        </div>
        <!-- 上传提示 -->
        <template #tip>
            <div class="el-upload__tip">
                大小小于500kb的图片
            </div>
        </template>
    </el-upload>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
// 是否显示文件列表
const showFile = ref(true)
// 文件改变时触发
function changfile(file) {
    console.log('file', file)
}
</script>
<style></style>