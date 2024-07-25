<script setup>
import {ref,onMounted,onUnmounted} from 'vue'
import dayjs from "dayjs";

const day = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

let intervalId = null

onMounted(()=>{
  intervalId = setInterval(()=>{
    day.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  },1000)
})

onUnmounted(()=>{
  clearInterval(intervalId)
})
</script>

<template>
   <div>
       <div>北京时间:{{day}}</div>
   </div>

</template>