<template>
<dv-full-screen-container>
   <div class="screen-container">
        <div class="container_hearder">
              <div class="left">
               <dv-decoration-8 style="width:400px;height:50px;" />
              </div>
              <div class="center">
               <div class="title">地方美食特产</div>
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
           <div class="center">
            <dv-border-box-2 style="height: 600px;">
            <div id="container" style="padding: 30px; "></div>
            </dv-border-box-2>
           </div>


           <div class="right">
            <dv-border-box-1 style="height:330px;">
               <dv-capsule-chart :config="config2" style="width:600px;height:300px;padding-top:40px;padding-left: 80px;" />
            </dv-border-box-1>
            <dv-border-box-1 style="height:330px;margin-top: 50px;">
               <dv-active-ring-chart :config="config3" style="width:600px;height:300px" />
            </dv-border-box-1>
      
           </div>
        </div>
   </div>
</dv-full-screen-container>

</template>
<script setup>
import {ref} from 'vue'
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
const config = ref({
  header: ['邯郸市', '沧州市', '石家庄市'],
  data: [
    ['驴肉香肠', '沧州火锅鸡', '金凤扒鸡'],
    ['圣旨骨酥鱼', '金丝小枣', '赵县雪花梨'],
    ['邯郸洺关熏肠', '黄骅冬枣', '行3列3'],
    ['涉县核桃', '羊肠汤', '新乐花生'],
    ['魏县鸭梨', '河间驴肉火烧', '正定八大碗'],
    ['五百居香肠', '沧州狮子头', '藁城宫面'],
    ['永不分梨酒', '泊头老豆腐', '晋州鸭梨'],
    ['丛台酒', '泊头鸭梨', '正定崩梨'],
    ['永年大蒜', '青县羊角脆', '金毛狮子鱼'],
    ['鸡泽辣椒', '献王酒', '辛集枸杞'],
    ['馆陶黑小麦', '泊头焖饼', '缸炉烧饼'],
 
  ],
  index: true,
  columnWidth: [50],
  align: ['center'],
  carousel:'page'
  })
const config2 = ref({
   data: [
    {
      name: '邯郸',
      value: 167
    },
    {
      name: '沧州',
      value: 123
    },
    {
      name: '石家庄',
      value: 98
    },

  ],
  colors: ['#e062ae', '#fb7293', '#e690d1',],
  unit: '单位'
})
const config3 =ref({
   radius: '70%',
  activeRadius: '75%',
  data: [
    {
      name: '邯郸',
      value: 55
    },
    {
      name: '沧州',
      value: 120
    },
    {
      name: '石家庄',
      value: 78
    },

  ],
  digitalFlopStyle: {
    fontSize: 20
  },
  showOriginValue: true
})

window._AMapSecurityConfig = {
    securityJsCode: "8b4d42a6dc38c5669662c8a60d0d98af",
};
let map = null;


function initAMap() {
    AMapLoader.load({
        key: "7f9b7ef24d625033e3e7b6a1fe9c918e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        Loca: {
            version: '2.0',
        }
    }).then((AMap) => {
        map = new AMap.Map('container');
        var map = new AMap.Map('container', {
            // center: [116.397428, 39.90923],
            zoom: 3.8,
            viewMode: '3D',  // 地图设置成 3D 模式，否则图层会失去高度信息
            mapStyle: 'amap://styles/light', // 使用高德地图的浅色模式
        });
        // 创建 Loca 实例
        var loca = new Loca.Container({
            map: map
        });
        console.log('Loca', loca)
        


        // 将图层添加到 Loca 实例中
        // loca.add(pointLayer);
        // 呼吸点
        // ScatterLayer: 带有动画效果的图层类型，用于展示散点数据，支持动画效果，如呼吸点、闪烁点等。大地面上的点，可展示三种类型：颜色圆、图标、动画图标
        var scatter = new Loca.ScatterLayer({ // 创建一个散点图层
            loca, // 传入容器实例 (相当于把散点图层添加到地图上)
            zIndex: 10, // 图层层级
            opacity: 0.6, // 图层透明度
            visible: true, // 图层是否可见
            zooms: [3, 32], // 图层显示的缩放级别范围
        });
        var pointGeo = new Loca.GeoJSONSource({ // 创建一个 GeoJSON 对象
            url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/pulselink-china-city-point.json', // 数据源的链接地址，一般是接口地址，返回的数据必须是 geojson 格式
        });
        scatter.setSource(pointGeo); // 给上面创建的散点图层设置数据源
        scatter.setStyle({ // 设置样式
            unit: 'meter', // 设置单位为米
            size: [100000, 100000], // 设置大小范围
            borderWidth: 0, // 设置边框宽度
            texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png', // 设置纹理
            duration: 2000, // 设置动画时长
            animate: true, // 设置动画
        });
        loca.add(scatter); // 将散点图层(scatter)添加到容器中

        //弧线
        // PulseLinkLayer: 连接飞线图层，可以支持弧度，宽度，过渡色等能力。 并且还支持脉冲动画，可以表达数据的朝向
        var pulseLink = new Loca.PulseLinkLayer({
            zIndex: 10,//设置图层的层级
            opacity: 1,//设置图层的透明度
            visible: true,//设置图层是否可见
            zooms: [2, 22],//设置图层可见的缩放范围
            depth: true //设置是否开启深度检测
        })
        // GeoJSONSource: 图层的数据源，可以是本地数据，也可以是远程数据，数据格式必须是 geojson 格式
        var geo = new Loca.GeoJSONSource({ // 创建一个 GeoJSON 对象
            url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-out.json', // 数据源的链接地址，一般是接口地址，返回的数据必须是 geojson 格式
        })
       pulseLink.setSource(geo) //给上面的弧线图层设置数据源

       pulseLink.setStyle({
         unit:'meter',//设置单位为米
         dash:[40000,0,40000,0],//设置虚线样式
         lineWidth:function(){ //设置线宽
            return [20000,1000] //设置线宽范围
         },
         height:function(index,feat){ //设置高度
             return feat.distance / 3 + 10; //设置高度范围
         },
         altitude:1000,//设置高度
         smoothSteps:30,//设置平滑度
         speed:function (index,prop){ // 设置速度
            return 1000+Math.random() * 200000 //设置速度范围
         },
         flowLength:100000,//设置流动长度
         lineColors:function(index,feat){ //设置线条颜色
             return ['rgb(255,228,105)','rgb(255,164,105)','rgba(1,34,249,1)'] //设置颜色范围
         },
         maxHeightScale:0.3,//弧顶位置比例
         headColor:'rgba(225,225,0,1)',//头部颜色
         trailColor:'rgba(225,225,0,0)',//尾部颜色
       })
       loca.add(pulseLink) //将图层添加到容器中
       loca.animate.start()

    //   点击事件处理
    var clickInfo = new AMap.Marker({ //点标记
     anchor:'bottom-center', //设置点标记锚点
     position:[116.396293,39.918203,0] //点标记在地图上显示的位置
    });
    clickInfo.setMap(map); //将点标记添加到地图上
    clickInfo.hide(); //隐藏点标记

    map.on('click',function(e){
        var feat = pulseLink.queryFeature(e.pixel.toArray())
        if(feat){
            clickInfo.show() //显示点标记
            var props = feat.properties
            clickInfo.setPosition(feat.coordinates[1])

        }else{

            

            clickInfo.hide() //隐藏点标记
        }
    })
    })
        .catch((e) => {
            console.log(e);
        });
}
onMounted(() => {
    initAMap()

});

onUnmounted(() => {
    map?.destroy();
});

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
      letter-spacing: 0.6em;
      }
   }
   .right{
      flex: 1;
   }
  
  }
  .main{
       color: #fff;
  
 display: flex ;
   .left{
      flex: 1;
  
      height: 700px;
      display: flex;
      justify-content: center;
      align-items: center;
     
   
   }
   .center{
      flex: 1;
       
      #container {
    width: 90%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    
   
}
   }
   .right{
      flex: 1;

   }
}
}
</style>