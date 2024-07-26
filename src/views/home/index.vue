<template>
  <div>

    <el-row :gutter="20">
      <el-col :span="5">
        <div >
          <el-card style="height: 260px;">
            <div class="avater">
              <div>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="120" />
              </div>
              <div class="avatar-info">
                <div class="admin">Admin</div>
                <div class="qx">超级管理员</div>
              </div>
            </div>
            <el-divider />
            <div class="container_login">
              <div class="login_time">上次登录时间:</div>
              <div class="login_diqu">2024-7-26</div>
            </div>
            <div class="container_login container_login2">
              <div class="login_time">上次登录地点:</div>
              <div class="login_diqu">石家庄市</div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 列表 -->
      <el-col :span="19">
        <div style="height: 173px;">
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                  <div class="list">
                       <div class="list_icon"><el-icon><SuccessFilled /></el-icon></div>
                       <div class="list_info">
                           <div class="list_info_title">
                             <span>￥</span><span style="margin-left: 20px">1234</span>
                           </div>
                           <div class="list_info_text">
                             今日支付订单
                           </div>
                       </div>
                  </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <div class="list">
                       <div class="list_iconOrigin" ><el-icon><StarFilled /></el-icon></div>
                       <div class="list_info">
                           <div class="list_info_title">
                             <span>￥</span><span style="margin-left: 20px">1234</span>
                           </div>
                           <div class="list_info_text">
                             今日收藏订单
                           </div>
                       </div>
                  </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <div class="list">
                       <div class="list_iconBlue"><el-icon><Handbag /></el-icon></div>
                       <div class="list_info">
                           <div class="list_info_title">
                             <span>￥</span><span style="margin-left: 20px">1234</span>
                           </div>
                           <div class="list_info_text">
                             今日未支付订单
                           </div>
                       </div>
                  </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <div class="list">
                       <div class="list_iconPiank"><el-icon><Van /></el-icon></div>
                       <div class="list_info">
                           <div class="list_info_title">
                             <span>￥</span><span style="margin-left: 20px">1234</span>
                           </div>
                           <div class="list_info_text">
                             今日物流订单
                           </div>
                       </div>
                  </div>
              </div>
            </el-col>
          
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                  <div class="list">
                       <div class="list_icon"><el-icon><SuccessFilled /></el-icon></div>
                       <div class="list_info">
                           <div class="list_info_title">
                             <span>￥</span><span style="margin-left: 20px">1234</span>
                           </div>
                           <div class="list_info_text">
                             今日支付订单
                           </div>
                       </div>
                  </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <div class="list">
                       <div class="list_iconOrigin" ><el-icon><StarFilled /></el-icon></div>
                       <div class="list_info">
                           <div class="list_info_title">
                             <span>￥</span><span style="margin-left: 20px">1234</span>
                           </div>
                           <div class="list_info_text">
                             今日收藏订单
                           </div>
                       </div>
                  </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <div class="list">
                       <div class="list_iconBlue"><el-icon><Handbag /></el-icon></div>
                       <div class="list_info">
                           <div class="list_info_title">
                             <span>￥</span><span style="margin-left: 20px">1234</span>
                           </div>
                           <div class="list_info_text">
                             今日未支付订单
                           </div>
                       </div>
                  </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <div class="list">
                       <div class="list_iconPiank"><el-icon><Van /></el-icon></div>
                       <div class="list_info">
                           <div class="list_info_title">
                             <span>￥</span><span style="margin-left: 20px">1234</span>
                           </div>
                           <div class="list_info_text">
                             今日物流订单
                           </div>
                       </div>
                  </div>
              </div>
            </el-col>
          
          </el-row>
       
        </div>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">1</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">2</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">3</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">4</div>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">



</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  border: 1px solid #f00;
}

.avater {
  display: flex;

  .avatar-info {

    // padding: 45px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 45px;
    padding-bottom: 30px;

    .admin {
      font-size: 26px;
      color: #797575;
    }

    .qx {
      font-size: 12px;
      margin-top: 10px;
      color: #9c9a9a;
    }

  }
}

.container_login {
  display: flex;
  color: #9c9a9a;
  font-size: 12px;

  .login_time {}

  .login_diqu {
    margin-left: 60px;

  }
}

.container_login2 {
  margin-top: 10px;
}
.list{
  display: flex;

  .list_icon{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;
    background: rgb(47, 198, 201);
  }
    .list_icon{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;
    background: rgb(47, 198, 201);
  }
  .list_iconOrigin{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;
    background: rgb(255, 186, 130);
  }
  .list_iconBlue{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;
  
    background: rgb(89, 177, 239);
  }
  .list_iconPiank{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;
  
    background: rgb(148, 79, 139);
  }

  .list_info{
 
    width: 100%;
    height: 75px;
    background: #fff;
    .list_info_title{
       padding: 15px;
       font-size: 20px;
       font-weight: normal;
    }
    .list_info_text{
        font-size: 14px;
        padding-left: 20px;
        color: #9c9a9a;
    }
  
  }
}
</style>