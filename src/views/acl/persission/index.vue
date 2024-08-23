<template>
    <div>
        <div class="container">
             <div class="item"></div>
             <div class="item"></div>
             <div class="item"></div>
             <div class="item"></div>
             <div class="item"></div>
             <div class="item"></div>
             <div class="item"></div>
             <div class="item"></div>
             <div class="item"></div>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped lang="scss">
  .container{
    width: 400px;
    height: 400px;
    margin: 0 auto;
    margin-top: 50px;
    /*网格布局*/
    display: grid;
    /*三行三列*/
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px;
    transition: 0.5s;
  }
   /*使用scss的预编译方法进行循环，设置每一个格子的背景色*/

   @for $i from 1 through 9 {
    .item:nth-child(#{$i}) {
         /*使用色相环 参数1 旋转的角度  参数2 饱和度  参数3  亮度*/
         background: hsl($i * 40%, 100%, 74%);
        }
           /*鼠标移入效果 选择某个格子被移入的父元素*/
   .container:has(.item:nth-child(#{$i}):hover){
    /*当前是第几行*/
    $r:floor(($i - 1) / 3 + 1);
    $c:($i - 1) % 3 + 1;
    $arr:1fr 1fr 1fr;
    $rows:set-nth($arr, $r, 2fr);
    $cols:set-nth($arr, $c, 2fr);
    /*当前是第几列*/
    grid-template-columns:$cols;
    grid-template-rows: $rows;
    }
   } 

 
</style>