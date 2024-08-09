<script setup>
import {onMounted, ref,defineAsyncComponent} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BasicForm from "@/components/basicForm/BasicForm.vue";
import {reqGetUserList} from '@/api/acl/userlist'
// import BasicTable from "@/componts/basicTable/BasicTable.vue";
const list = ref([
  {
    type: "input",
    title: "登录名称",
    value: "",
    // width: 300,
  },
  {
    type: "input",
    title: "手机号码",
    value: "",
    // width: 300,
  },
  {
    type: "select",
    title: "用户状态",
    value: "",
    options: [{ value: "所有" },{ value: "开启" }, { value: "关闭" }],
    width: 200,
  },
  {
    type: "datePicker",
    title: "创建时间",
    value: "",
    width: 200,
  },
])

// const BasicTable = defineAsyncComponent(()=>import('@/componts/basicTable/BasicTable.vue'))

const BasicTable = defineAsyncComponent(()=>{
  return import('@/components/basicTable/BasicTable.vue')
})

function query(value){
  console.log('查询数据',value)
  
  tableData.value = tableData.value.filter(item => item.phone.includes(value));
  return tableData;
}



/**
 * @param '下面是表格的数据'
 */
const tableDatas =ref(
    [
    


    ]
)

const colunm = ref([

  { prop: "id", label: "用户ID" },
  { prop: "loginName", label: "登录名称" },
  { prop: "userName", label: "用户名称" },
  { prop: "bumen", label: "部门" },
  { prop: "phone", label: "手机" },
  { prop: "chuangjianRiqi", label: "创建时间" },
 
])
const tableData = ref([])
const currpage = ref(1)
const pagesize = ref(10)
const totalRows = ref(10)
const totalPage = ref(2)
const selection = ref(true) //多选
const controls = ref("editProcessCenter") //操作:编辑
const MultipleSelectChoisce = ref([])

const loading = ref(true)
onMounted( async()=>{
  
   try {

 
    const res = await reqGetUserList()
     tableData.value = res.data
     loading.value = false
   }catch (e) {
     console.log(e)
   }
    totalRows.value = tableData.value.length


})
function MultipleChoice(value) {
  MultipleSelectChoisce.value = value
  if(MultipleSelectChoisce.value.length !== 1){
    disableEdit.value = true
  }else {
    disableEdit.value = false
  }

  if(MultipleSelectChoisce.value.length){
    disableDelete.value = false
  }else {
    disableDelete.value = true
  }



}
function RadioChoice(value) {
  console.log(value)
}
// 修改
function handelChuliEdit(index, row) {
  console.log('修改+', index)
  console.log('修改+', row)
}
//详情
function handelViewDetails(index, row) {
  console.log('详情+', index)
  console.log('详情+', row)
}

//删除
function selectTalkDelete(index, row) {
  console.log('删除+', index)
  console.log('删除+', row)
  ElMessageBox.confirm(
      '你确定要删除这条数据吗?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '关闭',
        type: 'warning',
      }
  )
      .then(() => {

          tableData.value = tableData.value.filter((d)=>d.id !== row.id)

        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })


}


/*
*  @params 修改和删除按钮的禁用状态
* */

const disableEdit = ref(true)
const disableDelete = ref(true)

// 批量删除
function  handelPiliangDelete (){
  ElMessageBox.confirm(
      '你确定要删除这条消息吗?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '关闭',
        type: 'warning',
      }
  )
      .then(() => {
        MultipleSelectChoisce.value.forEach(item=>{
          tableData.value = tableData.value.filter((d)=>d.id !== item.id)
        })
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })

}


</script>

<template>
  <div>
    <el-card class="box-card">
      <BasicForm :list='list' @query="query" @queryTableData="query"></BasicForm>
    </el-card>

    <el-card class="box-card" style="margin-top: 15px;height: 68vh" >
      <div style="margin-bottom: 10px">
        <el-button type="primary" icon="Plus">新增</el-button>
        <el-button type="success" icon="Edit" :disabled="disableEdit">修改</el-button>
        <el-button type="danger" icon="CloseBold" :disabled="disableDelete" @click="handelPiliangDelete">批量删除</el-button>
        <el-button  type="info" icon="Upload">导入</el-button>
        <el-button type="warning" icon="Download">导出</el-button>
      </div>
      <div>
        <suspense>
          <template v-slot:default>
            <BasicTable v-loading="loading" element-loading-text="数据正在加载中..."  element-loading-background="rgba(122, 122, 122, 0.8)" :colum="colunm" :tableData="tableData" :pagesize="pagesize" :currpage="currpage" :selections="selection"
                        :totalRows="totalRows" :totalPage="totalPage" @MultipleChoice="MultipleChoice" @RadioChoice="RadioChoice" :controls="controls"
                        @updateTalk="handelChuliEdit" @handelViewDetails="handelViewDetails" @selectTalkDelete="selectTalkDelete" :xuhao="true">
            </BasicTable>
          </template>
        </suspense>
      </div>
    </el-card>
  </div>
</template>

<style>
.el-loading-spinner{
  margin-top: calc((60vh - var(--el-loading-spinner-size)) /2);
}
</style>