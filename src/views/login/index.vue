<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" :prefix-icon="Lock" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import {getTime} from '../../utils/time'
//获取路由器
let $router = useRouter()
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
let loading = ref(false)
let loginForm = reactive({ username: "admin", password: "123456" })

// 获取el-form组件
let loginForms = ref()

const rules = {
    username: [
        { required: true, min: 5, max: 10, message: "账号长度至少六位", trigger: "change" }
    ],
    password: [
        { required: true, min: 5, max: 10, message: "密码长度不能超过10位", trigger: "change" }
    ]
}

async function login() {
    await loginForms.value.validate()
    loading.value = true
    const data = {
        username: loginForm.username,
        password: loginForm.password
    }
    console.log('data', data);
    // 点击登录按钮之后干什么
    // 通知仓库发登录请求
    // 请求成功
    // 请求失败

    try {
        await userStore.userLogin(loginForm)
        $router.push('/')
        ElNotification({
            type: "success",
            message: "欢迎回来",
            title: `Hi,${getTime()}好`
        })
        loading.value = false

    } catch (error) {
        ElNotification({
            type: "error",
            message: (error as Error).message
        })
        loading.value = false
    }

}
</script>
  
<style lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('../../assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>