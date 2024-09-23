<template>
    <div>

        <el-dialog v-model="isVisible" :title="dialogTitle" width="800" @open="opendialog" :show-close="false">
            <el-form :model="form">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="权限字符" :label-width="formLabelWidth">
                    <el-input v-model="form.permission" autocomplete="off" />
                </el-form-item>
                <el-form-item label="数据权限" :label-width="formLabelWidth">
                    <el-select v-model="form.dataPermission" placeholder="请选择数据权限">
                        <el-option label="全部数据权限" value="全部数据权限" />
                        <el-option label="部分数据权限" value="部分数据权限" />
                    </el-select>
                </el-form-item>
                <el-form-item label="顺序" :label-width="formLabelWidth">
                    <el-select v-model="form.shunxu" placeholder="请选择顺序">
                        <el-option label="1" value="1" />
                        <el-option label="2" value="2" />
                        <el-option label="3" value="3" />
                        <el-option label="4" value="4" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="form.status" />

                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handelOut">
                        关闭
                    </el-button>
                    <el-button type="primary" @click="handelSucess" v-if="title == '新增'">确定</el-button>
                    <el-button type="primary" @click="handelEdit" v-else>修改</el-button>

                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref, defineProps, watch, defineEmits, onMounted } from 'vue'

// 接收传递的props
const props = defineProps(['dialogFormVisible', 'dialogTitle', 'editForm'])
const emit = defineEmits([
    'handelCloseDialog',
    'handelXinzeng',
    'handelEditSuccess'
])
const isVisible = ref(props.dialogFormVisible)
console.log(props.dialogFormVisible)
const formLabelWidth = '180px'
watch(() => props.dialogFormVisible, (newVal) => {
    console.log(newVal)
    isVisible.value = newVal
})
// 关闭弹窗
const handelOut = () => {
    // 通知父组件关闭弹窗
    emit("handelCloseDialog");

    form.username = ''
    form.dataPermission = ''
    form.shunxu = ''
    form.status = false
    form.permission = ''
}
const form = reactive({

    username: '',
    dataPermission: "",
    shunxu: '',
    status: false,
    permission: ''

})
const id = ref(null)
const title = ref('')
// 点击登录
function handelSucess() {
    if (form.name == "" || form.username == "" || form.phone == "" || form.address == "") {
        ElMessage.warning('请输入完整信息')
    } else {
        const data = {
            userName: form.username,
            dataPermission: form.dataPermission,
            shunxu: form.shunxu,
            status: form.status,
            permission: form.permission
        }
        console.log('data', data)
        // 通知父组件关闭弹窗
        emit("handelXinzeng", data);
        // 清空表单

        form.username = ''
        form.dataPermission = ''
        form.shunxu = ''
        form.status = false
        form.permission = ''
    }
}
function opendialog() {
    title.value = props.dialogTitle
    if (props.dialogTitle == '修改') {

        if (props.editForm) {
            id.value = props.editForm.id
            form.username = props.editForm.userName
            form.dataPermission = props.editForm.dataPermission
            form.shunxu = props.editForm.shunxu
            form.status = props.editForm.status
            form.permission = props.editForm.permission

        }
    }
}

// 修改
function handelEdit() {
    const ids = {
        id: id.value,
    }
    const data = {
        id: id.value,
        userName: form.username,
        dataPermission: form.dataPermission,
        shunxu: form.shunxu,
        status: form.status,
        permission: form.permission
    }
    emit("handelEditSuccess", ids, data);
    // 清空表单
    form.username = ''
    form.dataPermission = ''
    form.shunxu = ''
    form.status = false
    form.permission = ''
}




</script>