<template>
  <div>
    <el-card>
      <BasicForm :list="list" @query="query" @queryTableData="query" />
    </el-card>
    <el-card class="box-card" style="margin-top: 15px;height: 68vh">
      <div style="margin-bottom: 10px">
        <el-button type="primary" icon="Plus" @click="handelClick">新增</el-button>
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
              @updateTalk="handelChuliEdit" @handelViewDetails="handelViewDetails" @selectTalkDelete="selectTalkDelete">
            </BasicTable>
          </template>
        </suspense>
      </div>
      <el-empty v-if="!tableData.length" description="暂无数据"></el-empty>
    </el-card>
    <RoleList :dialogFormVisible="dialogFormVisible" :dialogTitle="dialogTitle" @handelXinzeng="handelXinzeng"
      :editForm="editForm" @handelCloseDialog="handelClose" @handelEditSuccess="handelEdit"></RoleList>
  </div>
</template>
<script setup>
import { onMounted, ref, defineAsyncComponent } from 'vue'
import RoleList from './RoleList.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BasicForm from '@/components/basicForm/BasicForm.vue'
import { reqGetRoleList, reqCreateRoleList, reqDeleteRoleList, reqUpdateRoleList } from '@/api/acl/rolelist'
const list = ref([
  {
    type: 'input',
    title: '角色名称',
    value: ''
  },



])

const BasicTable = defineAsyncComponent(() => {
  return import('@/components/basicTable/BasicTable.vue')
})

async function query(value) {
  // console.log('查询数据', value)
  // const res = await reqQueryAccountList(list.value[0].value)
  if (list.value[0].value) {
    tableData.value = tableData.value.filter(item => item.userName.includes(list.value[0].value));
    totalRows.value = tableData.value.length

    return tableData.value;
  } else {
    getRoleList()
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

  { prop: "id", label: "角色编号" },
  { prop: "userName", label: "角色名称" },
  { prop: "permission", label: "权限字符" },
  { prop: "dataPermission", label: "数据权限" },
  { prop: "shunxu", label: "显示顺序" },
  { prop: "status", label: "角色状态" },
  { prop: "chuangjianRiqi", label: "创建时间" }
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
async function getRoleList() {
  try {
    const res = await reqGetRoleList()
    tableData.value = res
    loading.value = false
  } catch (e) {
    console.log(e)
  }
  totalRows.value = tableData.value.length
}
onMounted(() => {

  getRoleList()


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

      tableData.value = tableData.value.filter((d) => d.id !== row.id)
      reqDeleteRoleList({ id: row.id }).then(res => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        getRoleList()
      }
      )

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
        reqDeleteRoleList({ id: item.id }).then(res => {

        })
      })
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getRoleList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}

/**
 * @params 新增
 *
 */

const dialogFormVisible = ref(false)
const dialogTitle = ref('')
const editForm = ref(null)
function handelClick() {
  dialogFormVisible.value = true
  dialogTitle.value = '新增'
}

async function handelXinzeng(data) {
  const res = await reqCreateRoleList(data)

  try {
    ElMessage({
      message: '添加成功',
      type: 'success',
    })

    dialogFormVisible.value = false
    getRoleList()
  } catch (error) {

  }
}
// 修改
function handelChuliEdit(index, row) {
  console.log('修改+', index)
  console.log('修改+', row)
  dialogFormVisible.value = true
  dialogTitle.value = '修改'
  editForm.value = row
}

// 点击关闭
function handelClose() {
  dialogFormVisible.value = false
  ElMessage({
    type: 'info',
    message: '已取消',
  })
}

// 确认修改
function handelEdit(ids, data) {
  // console.log('修改', editForm.value)
  reqUpdateRoleList(ids, data).then(res => {
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
    dialogFormVisible.value = false
    getRoleList()
  })
}
</script>
<style>
.el-loading-spinner {
  margin-top: calc((60vh - var(--el-loading-spinner-size)) /2);
}
</style>