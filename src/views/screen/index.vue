<template>
<dv-full-screen-container>
   <div class="screen-container">
        <div class="container_hearder">
              <div class="left">
               <dv-decoration-8 style="width:400px;height:50px;" />
              </div>
              <div class="center">
               <div class="title">馆陶黑小麦</div>
               <dv-decoration-5 style="width:400px;height:50px;" />
              </div>
              <div class="right">
               <dv-decoration-8 :reverse="true" style="width:400px;height:50px;" />
              </div>
        </div>
        <div class="main">
           <div class="left">
            <dv-border-box-10 class="dv">
               <dv-scroll-board :config="config" style="width:600px;height:650px;margin-left: 20px;margin-top: 10px;" />
             </dv-border-box-10>
            
         </div>
           <div class="center">2</div>
           <div class="right">3</div>
        </div>
   </div>
</dv-full-screen-container>

</template>
<script setup>
import {ref} from 'vue'
const config = ref({
  header: ['列1', '列2', '列3'],
  data: [
    ['行1列1', '行1列2', '行1列3'],
    ['行2列1', '行2列2', '行2列3'],
    ['行3列1', '行3列2', '行3列3'],
    ['行4列1', '行4列2', '行4列3'],
    ['行5列1', '行5列2', '行5列3'],
    ['行6列1', '行6列2', '行6列3'],
    ['行7列1', '行7列2', '行7列3'],
    ['行8列1', '行8列2', '行8列3'],
    ['行9列1', '行9列2', '行9列3'],
    ['行10列1', '行10列2', '行10列3'],
    ['行1列1', '行1列2', '行1列3'],
    ['行2列1', '行2列2', '行2列3'],
    ['行3列1', '行3列2', '行3列3'],
    ['行4列1', '行4列2', '行4列3'],
    ['行5列1', '行5列2', '行5列3'],
    ['行6列1', '行6列2', '行6列3'],
    ['行7列1', '行7列2', '行7列3'],
    ['行8列1', '行8列2', '行8列3'],
    ['行9列1', '行9列2', '行9列3'],
    ['行10列1', '行10列2', '行10列3'],
    ['行1列1', '行1列2', '行1列3'],
    ['行2列1', '行2列2', '行2列3'],
    ['行3列1', '行3列2', '行3列3'],
    ['行4列1', '行4列2', '行4列3'],
    ['行5列1', '行5列2', '行5列3'],
    ['行6列1', '行6列2', '行6列3'],
    ['行7列1', '行7列2', '行7列3'],
    ['行8列1', '行8列2', '行8列3'],
    ['行9列1', '行9列2', '行9列3'],
    ['行10列1', '行10列2', '行10列3']
  ],
  index: true,
  columnWidth: [50],
  align: ['center'],
  carousel:'page'
  })
</script>
<style scoped lang="scss">
.screen-container{
  width: 100%;
  height: 100%;
  background: url('@/assets/images/daping/daping.png') no-repeat;
  background-size: 100% 100%;
  .container_hearder{
   display: flex;
   justify-content: center;
   align-items: center;
   .left{
      flex: 2;
   }
   .center{
      position: relative;
      color: #fff;
      flex: 2;
      margin-top:20px ;
      .title{
      position: absolute;
      left: 120px;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 1em;
      }
   }
   .right{
      flex: 1;
   }
  
  }
  .main{
       color: #fff;
   border: 1px solid #f00;
 display: flex;
   .left{
      flex: 1;
  
      height: 700px;
      display: flex;
      justify-content: center;
      align-items: center;
     
   
   }
   .center{
      flex: 1;
      border: 1px solid rgb(0, 255, 13);
   }
   .right{
      flex: 1;
      border: 1px solid rgb(255, 0, 170);
   }
}
}
</style>