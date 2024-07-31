<template>
  <div>

    <el-row :gutter="20">
      <el-col :span="5">
        <div>
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
                  <div class="list_icon"><el-icon>
                      <SuccessFilled />
                    </el-icon></div>
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
                  <div class="list_iconOrigin"><el-icon>
                      <StarFilled />
                    </el-icon></div>
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
                  <div class="list_iconBlue"><el-icon>
                      <Handbag />
                    </el-icon></div>
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
                  <div class="list_iconPiank"><el-icon>
                      <Van />
                    </el-icon></div>
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
                  <div class="list_icon"><el-icon>
                      <SuccessFilled />
                    </el-icon></div>
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
                  <div class="list_iconOrigin"><el-icon>
                      <StarFilled />
                    </el-icon></div>
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
                  <div class="list_iconBlue"><el-icon>
                      <Handbag />
                    </el-icon></div>
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
                  <div class="list_iconPiank"><el-icon>
                      <Van />
                    </el-icon></div>
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
      <el-col :span="5">
        <div>
          <el-card style="height: 550px;">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="课程" />
              <el-table-column prop="name" label="进度" />
              <el-table-column prop="address" label="人数" />
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content ep-bg-purple" style="margin-top: -80px;">
          <!-- 数据折线图 -->
          <el-card>
            <div id="myChart" :style="{ width: '100%', height: '300px' }">
            </div>
          </el-card>
        </div>
        <div class="echarts_list" style="margin-top: 20px;">

          <div class="list_zhu">
            <!-- 数据柱状图 -->
            <el-card>
              <div id="zhuzhuangtu" :style="{ width: '100%', height: '255px' }">

              </div>
            </el-card>
          </div>
          <div class="list_bing">
            <!-- 饼状图 -->
            <el-card>
              <div id="bingtuChart" :style="{ width: '90%', height: '255px' }">
              </div>
            </el-card>
          </div>

        </div>
      </el-col>


    </el-row>


  </div>
</template>

<script setup lang="ts">

import { getCurrentInstance, onMounted } from 'vue';
let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;
// 折线图
onMounted(() => {
  const dom = document.getElementById('myChart');
  const myChart = echarts.init(dom); // 初始化echarts实例
  const option = {
    legend: {},
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '课程',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        // smooth: true,
        itemStyle: {
          normal: { color: '#090' }
        }
      },
      {
        name: '进度',
        data: [720, 1000, 890, 702, 1000, 579, 653],
        type: 'line',
        // smooth: true,
        itemStyle: {
          normal: { color: '#09f' }
        }
      },
      {
        name: '人员',
        data: [800, 900, 650, 785, 1150, 1233, 420],
        type: 'line',
        // smooth: true,
        itemStyle: {
          normal: { color: '#f00' }
        }
      }
    ]
  };
  // 设置实例参数
  myChart.setOption(option);
  window.onresize = function () {
    myChart.resize();
    //myChart1.resize();    //若有多个图表变动，可多写

  }
})
// 饼状图
// 饼状图
onMounted(() => {
  const bingtuDom = document.getElementById('bingtuChart');
  const bingChart = echarts.init(bingtuDom); // 初始化echarts实例
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '前端学习',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'JavaScript' },
          { value: 735, name: 'Vue' },
          { value: 580, name: 'React' },
          { value: 484, name: 'Css' },
          { value: 300, name: 'Html' },
          { value: 250, name: 'Node' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  bingChart.setOption(option)
})
// 柱状图
// 柱状图
onMounted(() => {
  const zhuzhuang = document.getElementById('zhuzhuangtu')
  const ZhuChart = echarts.init(zhuzhuang); // 初始化echarts实例

  const option = {
    legend:{},
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name:"进度",
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      },
      {
        name:"人数",
        data: [80, 60, 40, 30, 80, 44, 66],
        type: 'bar'
      }
    ]
  };
  ZhuChart.setOption(option)
})
// 表格数据

const tableData = [
  {
    date: 'javascript',
    name: '90%',
    address: '50',
  },
  {
    date: 'css',
    name: '100%',
    address: '50',
  },
  {
    date: 'html',
    name: '100%',
    address: '50',
  },
  {
    date: 'Vue',
    name: '90%',
    address: '50',
  },
  {
    date: 'React',
    name: '90%',
    address: '50',
  },
  {
    date: 'node',
    name: '90%',
    address: '50',
  },

]


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

.list {
  display: flex;

  .list_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;
    background: rgb(47, 198, 201);
  }

  .list_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;
    background: rgb(47, 198, 201);
  }

  .list_iconOrigin {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;
    background: rgb(255, 186, 130);
  }

  .list_iconBlue {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;

    background: rgb(89, 177, 239);
  }

  .list_iconPiank {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    width: 100px;
    height: 75px;

    background: rgb(148, 79, 139);
  }

  .list_info {

    width: 100%;
    height: 75px;
    background: #fff;

    .list_info_title {
      padding: 15px;
      font-size: 20px;
      font-weight: normal;
    }

    .list_info_text {
      font-size: 14px;
      padding-left: 20px;
      color: #9c9a9a;
    }

  }
}

.echarts_list {
  display: flex;

  .list_zhu {
    width: 100%;

    height: 255px;
    margin-right: 10px;
  }

  .list_bing {

    width: 90%;

    height: 300px;
  }
}
</style>