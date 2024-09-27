<template>
  <div>
    <el-card class="box-card">
      <BasicForm :list='list' @query="query"></BasicForm>
    </el-card>

    <el-card class="box-card" style="margin-top: 15px;height: 68vh">
      <div style="margin-bottom: 10px">
        <el-button type="primary" icon="Plus" @click="handelXinzeng">新增</el-button>
        <el-button type="success" icon="Edit" :disabled="disableEdit">修改</el-button>
        <el-button type="danger" icon="CloseBold" :disabled="disableDelete" @click="handelPiliangDelete">批量删除</el-button>
        <el-button type="info" icon="Upload">导入</el-button>
        <el-button type="warning" icon="Download">导出</el-button>
      </div>
      <div>
        <suspense>
          <template v-slot:default>
            <BasicTable v-loading="loading" element-loading-text="数据正在加载中..."
              element-loading-background="rgba(122, 122, 122, 0.8)" :colum="colunm" :tableData="tableData"
              :pagesize="pagesize" :currpage="currpage" :selections="selection" :totalRows="totalRows"
              :totalPage="totalPage" @MultipleChoice="MultipleChoice" @RadioChoice="RadioChoice" :controls="controls"
              @updateTalk="handelChuliEdit" @handelViewDetails="handelViewDetails" @selectTalkDelete="selectTalkDelete"
              :xuhao="true">
            </BasicTable>
          </template>
        </suspense>
      </div>
      <el-empty v-if="!tableData.length" description="暂无数据"></el-empty>
    </el-card>
    <ImportXinzeng :dialogFormVisible="dialogFormVisible" @handelCloseDialog="handelCloseDialog"
      @handelXinzeng="handelAddUser" :dialogTitle="dialogTitle" :editForm="editForm" @handelEditSuccess="handelEdit">
    </ImportXinzeng>
  </div>
</template>
<script setup>
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BasicForm from "@/components/basicForm/BasicForm.vue";
import ImportXinzeng from './ImportXinzeng.vue'
import { reqCreeateUserList, reqGetUserList, reqDeleteUserList, reqUpdateUserList } from '@/api/acl/userlist'
// import BasicTable from "@/componts/basicTable/BasicTable.vue";
const list = ref([
  {
    type: "input",
    title: "登录名称",
    value: "",
    // width: 300,
  },

])

// const BasicTable = defineAsyncComponent(()=>import('@/componts/basicTable/BasicTable.vue'))

const BasicTable = defineAsyncComponent(() => {
  return import('@/components/basicTable/BasicTable.vue')
})

async function query(value) {
  // console.log('查询数据', value)
  // const res = await reqQueryAccountList(list.value[0].value)
  if (list.value[0].value) {
    tableData.value = tableData.value.filter(item => item.username.includes(list.value[0].value));
    totalRows.value = tableData.value.length

    return tableData.value;
  } else {
    getUserList()
  }

}



/**
 * @param '下面是表格的数据'
 */
const tableDatas = ref(
  [



  ]
)

const colunm = ref([

  { prop: "id", label: "用户ID" },
  { prop: "username", label: "登录名称" },
  { prop: "name", label: "用户名称" },

  { prop: "phone", label: "手机" },
  { prop: "address", label: "邮箱" },

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
async function getUserList() {
  try {


    const res = await reqGetUserList()
    // console.log(res)
    tableData.value = res
    loading.value = false
  } catch (e) {
    console.log(e)
  }
  totalRows.value = tableData.value.length
}
onMounted(async () => {
  getUserList()



})
function MultipleChoice(value) {
  MultipleSelectChoisce.value = value
  if (MultipleSelectChoisce.value.length !== 1) {
    disableEdit.value = true
  } else {
    disableEdit.value = false
  }

  if (MultipleSelectChoisce.value.length) {
    disableDelete.value = false
  } else {
    disableDelete.value = true
  }



}
function RadioChoice(value) {
  console.log(value)
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
      const data = { id: row.id }
      tableData.value = tableData.value.filter((d) => d.id !== row.id)
      reqDeleteUserList({ id: row.id }).then(res => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        getUserList()
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
function handelPiliangDelete() {
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
      MultipleSelectChoisce.value.forEach(item => {
        tableData.value = tableData.value.filter((d) => d.id !== item.id)
        reqDeleteUserList({ id: item.id }).then(res => {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          getUserList()
        })
      })

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}

/**
 * @public 新增
 *
 */

const dialogFormVisible = ref(false)
const dialogTitle = ref('') //标题
const editForm = ref(null)
function handelXinzeng() {
  dialogFormVisible.value = true
  dialogTitle.value = '新增'
}
// 新增
async function handelAddUser(data) {


  const res = await reqCreeateUserList(data)
  try {

    // if (res.code === 200) {
    ElMessage({
      message: '添加成功',
      type: 'success',
    })
    dialogFormVisible.value = false
    getUserList()
    // } else {
    //   ElMessage({
    //     message: '添加失败',
    //     type: 'error',
    //   })
    // }
    // dialogFormVisible.value = false
  } catch (e) {
    consoel.log(e)
  }
}
function handelCloseDialog() {
  dialogFormVisible.value = false
  ElMessage({
    message: '已取消',
    type: 'info',
  })
}

/**
 * @public 编辑
 */
// 修改
function handelChuliEdit(index, row) {
  // console.log('修改+', index)
  // console.log('修改+', row)
  dialogFormVisible.value = true
  dialogTitle.value = '修改'
  editForm.value = row
}

function handelEdit(ids, data) {
  // console.log('修改', editForm.value)
  reqUpdateUserList(ids, data).then(res => {
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
    dialogFormVisible.value = false
    getUserList()
  })
}



</script>
<style>
.el-loading-spinner {
  margin-top: calc((60vh - var(--el-loading-spinner-size)) /2);
}
</style>