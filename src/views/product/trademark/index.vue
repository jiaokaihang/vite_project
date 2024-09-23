<template>
    <el-upload class="upload-demo" drag action="" accept=".jpg,.png,.xlsx" :show-file-list="showFile" multiple
        @change="changfile">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            在此处 <em>点击即可上传</em>
        </div>
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
const showFile = ref(true)
function changfile(file) {

}
</script>
<style></style>