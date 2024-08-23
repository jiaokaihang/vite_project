<!-- <script setup>
import { onMounted, ref } from 'vue'
import RelationGraph from 'relation-graph-vue3'
const graphRef$ = ref()
const options = {
  defaultExpandHolderPosition: 'right'
}
onMounted(() => {
  const jsonData = {
    rootId: 'admin',
    nodes: [
      { id: 'admin', text: 'admin', },
      { id: '财务部', text: '财务部', },
      { id: '人事部', text: '人事部', },
      { id: '技术部', text: '技术部', },
      { id: '运营部', text: '运营部', },
      { id: '生产部', text: '生产部', },
    ],
    lines: [
      { from: 'admin', to: '财务部', },
      { from: 'admin', to: '人事部', },
      { from: 'admin', to: '技术部', },
      { from: 'admin', to: '运营部', },
      { from: 'admin', to: '生产部', },
    ],
  }

  graphRef$.value.setJsonData(jsonData)

})
</script>

<template>
  <div class="app-container">
   <el-card>
    <div style="border: #efefef solid 1px; height: calc(100vh - 100px);width: 100%;">
      <relation-graph ref="graphRef$" :options="options" />
    </div>
   </el-card>
  </div>
</template>

<style scoped>

</style> -->


<template>
  <div>
    <div v-loading="g_loading" style="height:calc(100vh - 60px);">
      <RelationGraph ref="graphRef" :options="graphOptions">
      </RelationGraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import RelationGraph from 'relation-graph-vue3';

const graphRef = ref();
const g_loading = ref(true);
const demoname = ref('---');
const activeTabName = ref('case1');
const range_horizontal = ref([100, 300]);
const range_vertical = ref([20, 100]);
const levelDistance = ref('200, 300, 400, 500, 500, 500, 500');
const graphOptions = {
    debug: false,
    layout: {
        label: 'Tree',
        layoutName: 'tree',
        layoutClassName: 'seeks-layout-center',
        from: 'left',
        min_per_width: 0,
        // min_per_width: undefined,
        max_per_width: 300,
        min_per_height: 40,
        max_per_height: 0,
        // max_per_height: undefined,
        levelDistance: ''
    },
    defaultExpandHolderPosition: 'right',
    defaultNodeShape: 2,
    defaultNodeWidth: 90,
    defaultNodeHeight: 40,
    defaultLineShape: 4,
    defaultNodeBorderWidth: 0,
    defaultPolyLineRadius: 15,
    defaultLineColor: 'rgba(0, 186, 189, 1)',
    defaultNodeColor: 'rgba(0, 206, 209, 1)'
};
const graphOptions2222 = {
    debug: false,
    layout: {
        label: 'Tree',
        layoutName: 'tree',
        layoutClassName: 'seeks-layout-center',
        from: 'left',
        min_per_width: undefined,
        max_per_width: 300,
        min_per_height: 40,
        max_per_height: undefined,
        levelDistance: ''
    },
    defaultExpandHolderPosition: 'right',
    defaultNodeShape: 1,
    defaultNodeWidth: 40,
    defaultNodeHeight: 40,
    defaultPolyLineRadius: 15,
    defaultLineShape: 8,
    defaultNodeBorderWidth: 0,
    defaultLineColor: '#f00',
    defaultNodeColor: '#f00'
};


const setGraphData = async() => {
    const __graph_json_data = {
        rootId: 'admin',
        nodes: [
            { id: 'admin', text: 'admin' },
            { id: '财务部', text: '财务部' },
            { id: '财务总监', text: '财务总监' },
            { id: '财务经理', text: '财务经理' },
            { id: '现金', text: '现金' },
            { id: '会计主管', text: '会计主管' },
            { id: '税务', text: '税务' },
            { id: '稽核', text: '稽核' },
            { id: '资产管理', text: '资产管理' },
          
            { id: '人事部', text: '人事部' },
            { id: '人事经理', text: '人事经理' },
            { id: '助理', text: '助理' },
            { id: '人力资源开发', text: '人力资源开发' },
            { id: '招聘', text: '招聘' },
            { id: '培训', text: '培训' },
            { id: '薪酬', text: '薪酬' },
            { id: '考核', text: '考核' },
            { id: '员工管理', text: '员工管理' },
            { id: '企业文化管理', text: '企业文化管理' },

            { id: '技术部', text: '技术部' },
            { id: '技术经理', text: '技术经理' },
            { id: '前端工程师', text: '前端工程师' },
            { id: '后端工程师', text: '后端工程师' },
            { id: '测试工程师', text: '测试工程师' },
            { id: 'UI设计师', text: 'UI设计师' },
            { id: '运维工程师', text: '运维工程师' },
            { id: '产品经理', text: '产品经理' },

          
        ],
        lines: [
            { from: 'admin', to: '财务部' },
            { from: '财务部', to: '财务总监' },
            { from: '财务总监', to: '财务经理' },
            { from: '财务经理', to: '现金' },
            { from: '财务经理', to: '会计主管' },
            { from: '财务经理', to: '税务' },
            { from: '财务经理', to: '稽核' },
            { from: '财务经理', to: '资产管理' },

            { from: 'admin', to: '人事部' },
            { from: '人事部', to: '人事经理' },
            { from: '人事经理', to: '助理' },
            { from: '助理', to: '人力资源开发' },
            { from: '助理', to: '招聘' },
            { from: '助理', to: '培训' },
            { from: '助理', to: '薪酬' },
            { from: '助理', to: '考核' },
            { from: '助理', to: '员工管理' },
            { from: '助理', to: '企业文化管理' },

            { from: 'admin', to: '技术部' },
            { from: '技术部', to: '技术经理' },
            { from: '技术经理', to: '前端工程师' },
            { from: '技术经理', to: '后端工程师' },
            { from: '技术经理', to: '测试工程师' },
            { from: '技术经理', to: 'UI设计师' },
            { from: '技术经理', to: '运维工程师' },
            { from: '技术经理', to: '产品经理' },
          
     
          
        ]
    };

    console.log(JSON.stringify(__graph_json_data));
    g_loading.value = false;
    const graphInstance = graphRef.value!.getInstance();
    await graphInstance.setJsonData(__graph_json_data);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
};

// const onChangeOptionByCase1 = async() => {
//   graphOptions.layout.min_per_width = range_horizontal.value[0];
//     graphOptions.layout.max_per_width = range_horizontal.value[1];
//     graphOptions.layout.min_per_height = range_vertical.value[0];
//     graphOptions.layout.max_per_height = range_vertical.value[1];
//     const graphInstance = graphRef.value!.getInstance();
//     await graphInstance.setOptions(graphOptions);
//     await graphInstance.refresh();
// };

// const onChangeOptionByCase2 = async() => {
//     let arr: string[] = [];
//     try {
//         arr = levelDistance.value.split(',');
//     } catch (e) {
//         // this.$message({ type: 'error', message: 'Format error!' });
//         return;
//     }
//     graphOptions2222.layout.levelDistance = levelDistance.value;
//     const graphInstance = graphRef.value!.getInstance();
//     await graphInstance.setOptions(graphOptions2222);
//     await graphInstance.refresh();
// };

// const onTabAciveChange = () => {
//     console.log('activeTabName:', activeTabName.value);
//     if (activeTabName.value === 'case2') {
//         onChangeOptionByCase2();
//     } else {
//         onChangeOptionByCase1();
//     }
// };
onMounted(() => {
    setGraphData();
});
</script>

<style lang="scss" scoped>
::v-deep(.relation-graph) {
    .c-node-text {
        padding: 0px;
        place-items: center;
        justify-content: center;
    }
}
.c-my-panel {
  width: 600px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 800;
  background-color: #efefef;
  border: #eeeeee solid 1px;
  padding: 10px;
  .c-option-name {
    color: #666666;
    font-size: 14px;
    line-height: 30px;
  }
  .c-simple-configs {
    padding-left: 70px;
    padding-right: 70px;
    & > div {
      line-height: 30px;
      color: #5b05f1;
      cursor: pointer;
      border-radius: 5px;
      margin-top: 5px;
      text-align: center;
      &:hover {
        background-color: #5b05f1;
        color: #ffffff;
      }
    }
  }
}
</style>
