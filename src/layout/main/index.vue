<template>
       <div >

            <router-view v-slot="{Component}">
                <keep-alive>
                 <transition name="fade">
                      <component :is="Component"></component>
                 </transition>
                </keep-alive>
            </router-view>
       
       </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.fade-enter-from{
    opacity: 0;
}

.fade-enter-active{
    transition: all 0.3s;
}


.fade-enter-to{
    opacity: 1;
}
</style>