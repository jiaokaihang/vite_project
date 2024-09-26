<template>
    <div>
        <el-card class="box-card">
            <BasicForm :list='list' @query="query" @queryTableData="query"></BasicForm>
        </el-card>

        <el-card class="box-card" style="margin-top: 15px;height: 68vh">
            <div style="margin-bottom: 10px">
                <el-button type="primary" icon="Plus" @click="handelXinzeng">新增</el-button>
                <el-button type="danger" icon="CloseBold" :disabled="disableDelete"
                    @click="handelPiliangDelete">批量删除</el-button>
            </div>
            <div>
                <suspense>
                    <template v-slot:default>
                        <BasicTable v-loading="loading" element-loading-text="数据正在加载中..."
                            element-loading-background="rgba(122, 122, 122, 0.8)" :colum="colunm" :tableData="tableData"
                            :pagesize="pagesize" :currpage="currpage" :selections="selection" :totalRows="totalRows"
                            :totalPage="totalPage" @MultipleChoice="MultipleChoice" @RadioChoice="RadioChoice"
                            :controls="controls" @updateTalk="handelChuliEdit" @handelViewDetails="handelViewDetails"
                            @selectTalkDelete="selectTalkDelete" :xuhao="true">
                        </BasicTable>
                    </template>
                </suspense>
            </div>
            <el-empty v-if="!tableData.length" description="暂无数据"></el-empty>
        </el-card>
        <AddAccount :dialogFormVisible="dialogformvisible" @handelCloseDialog="handelEdit" :dialogTitle="dialogTitle"
            @handelXinzeng="handelClose" :editForm="editForm" @handelEditSuccess="handelEditSuccess">
        </AddAccount>
    </div>
</template>


<script setup>
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import BasicForm from "@/components/basicForm/BasicForm.vue";
import AddAccount from './AddAccount.vue'
import { reqcreateAccountList, reqGetAccountList, reqEditAccountList, reqDeleteAccountList, reqQueryAccountList } from '@/api/acl/account'
const list = ref([
    {
        type: "input",
        title: "账户名称",
        value: "",
        // width: 300,
    },

])

// const BasicTable = defineAsyncComponent(()=>import('@/componts/basicTable/BasicTable.vue'))

const BasicTable = defineAsyncComponent(() => {
    return import('@/components/basicTable/BasicTable.vue')
})

const colunm = ref([

    { prop: "id", label: "用户ID" },
    { prop: "zhanghu", label: "账户" },
    { prop: "zhanghuName", label: "账户名称" },
    { prop: "status", label: "账户状态" },
    { prop: "phone", label: "手机号" },
    { prop: "role", label: "角色" },

])
const tableData = ref([])
const currpage = ref(1)
const pagesize = ref(10)
const totalRows = ref(10)
const totalPage = ref(2)
const selection = ref(true) //多选
const controls = ref("editProcessCenter") //操作:编辑
const MultipleSelectChoisce = ref([])
const disableEdit = ref(true)
const disableDelete = ref(true)
const loading = ref(true)
const editForm = ref(null)
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
async function query(value) {
    // console.log('查询数据', value)
    // const res = await reqQueryAccountList(list.value[0].value)
    if (list.value[0].value) {
        tableData.value = tableData.value.filter(item => item.zhanghuName.includes(list.value[0].value));
        totalRows.value = tableData.value.length

        return tableData.value;
    } else {
        getAccountList()
    }

}

/**
 * @description: 新增
 */

const dialogformvisible = ref(false)
const dialogTitle = ref("")
function handelXinzeng() {
    dialogformvisible.value = true
    dialogTitle.value = "新增"
}
/**
 * @function: 查询
 */

function getAccountList() {
    reqGetAccountList().then(res => {
        tableData.value = res
        loading.value = false
        totalRows.value = tableData.value.length
    })
}
onMounted(() => {
    getAccountList()
})

/**
 * @function:   关闭弹窗并调用接口
 */

function handelClose(data) {
    // console.log('fuzujian', data)
    dialogformvisible.value = false
    const res = reqcreateAccountList(data)
    try {
        ElMessage({
            type: 'success',
            message: '增加成功',
        })
        getAccountList()
    } catch (error) {

    }
}
/**
 * @function: 详情
*/

function handelViewDetails(index, row) {

    console.log('详情', index, row)

}



/**
 * @function: 编辑
 */

function handelChuliEdit(index, row) {
    // console.log('修改+', index)
    // console.log('修改+', row)
    dialogformvisible.value = true
    dialogTitle.value = '修改'
    editForm.value = row
}


/**
 * @function: 修改 并关闭弹窗 调用接口
 */
function handelEditSuccess(ids, data) {
    reqEditAccountList(ids, data).then(res => {
        ElMessage({
            type: 'success',
            message: '修改成功',
        })
        dialogformvisible.value = false
        getAccountList()
    })
}
/**
 * @function : 关闭
 */

function handelEdit() {
    ElMessage({
        message: '已取消',
        type: 'info',
    })
    dialogformvisible.value = false
}

/**
 * @function: 批量删除
 */
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
                reqDeleteAccountList({ id: item.id }).then(res => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                    getAccountList()
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
 * @function: 删除
 *
 */
//删除
function selectTalkDelete(index, row) {

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
            reqDeleteAccountList({ id: row.id }).then(res => {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
                getAccountList()
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


<style></style>