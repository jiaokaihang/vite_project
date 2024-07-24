<template>
     <div class="logo" v-if="settings.logoHidden">
        <img :src="settings.logo" alt="">
        <p>{{settings.title}}</p>
    </div>
</template>

<script setup>
import settings from '@/settings'
</script>

<style lang="scss" scoped>
.logo{
    width: 100%;
    height: $logo-height;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 20px;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    p{
        margin-left: 20px;
        font-size: $base-menu-font-size;
    }
}
</style>