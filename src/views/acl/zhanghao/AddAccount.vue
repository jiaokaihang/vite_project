<template>
    <div>

        <el-dialog v-model="isVisible" :title="dialogTitle" width="800" @open="opendialog" :show-close="false">
            <el-form :model="form" :rules="rules" ref="forms">
                <el-form-item label="账户" :label-width="formLabelWidth" prop="zhanghu">
                    <el-input v-model="form.zhanghu" autocomplete="off" />
                </el-form-item>
                <el-form-item label="账户名称" :label-width="formLabelWidth" prop="zhanghuName">
                    <el-input v-model="form.zhanghuName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
                    <el-input v-model="form.role" autocomplete="off" />
                </el-form-item>
                <el-form-item label="账户状态" :label-width="formLabelWidth" prop="status">
                    <el-switch v-model="form.status" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handelOut(forms)">
                        关闭
                    </el-button>
                    <el-button type="primary" @click="handelSucess(forms)" v-if="title == '新增'">确定</el-button>
                    <el-button type="primary" @click="handelEdit(forms)" v-else>修改</el-button>

                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref, watch } from 'vue'

// 接收传递的props
const props = defineProps(['dialogFormVisible', 'dialogTitle', 'editForm'])
const emit = defineEmits([
    'handelCloseDialog',
    'handelXinzeng',
    'handelEditSuccess'
])
const isVisible = ref(props.dialogFormVisible)
// console.log(props.dialogFormVisible)
const formLabelWidth = '180px'
watch(() => props.dialogFormVisible, (newVal) => {
    console.log(newVal)
    isVisible.value = newVal
})
const form = reactive({

    zhanghu: '',
    zhanghuName: "",
    role: '',
    status: false,
    phone: ''

})
const forms = ref(null)
const rules = reactive({
    zhanghu: [
        { required: true, message: '请输入账户', trigger: 'change' },
    ],
    zhanghuName: [
        { required: true, message: '请输入账户名称', trigger: 'change' },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'change' },
    ],
    status: [
        { required: true, message: '请设置状态', trigger: 'change' },
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'change' },
    ],
})
// 关闭弹窗
const handelOut = (formEl) => {
    // 通知父组件关闭弹窗
    emit("handelCloseDialog");


    form.zhanghu = ''
    form.zhanghuName = ''
    form.role = ''
    form.status = false
    form.phone = ''
    formEl.resetFields()
}

const id = ref(null)
const title = ref('')
// 点击登录
async function handelSucess(formEl) {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const data = {
                zhanghu: form.zhanghu,
                zhanghuName: form.zhanghuName,
                phone: form.phone,
                status: form.status,
                role: form.role
            }
            // 通知父组件关闭弹窗
            emit("handelXinzeng", data);
            // 清空表单

            form.zhanghu = ''
            form.zhanghuName = ''
            form.role = ''
            form.status = false
            form.phone = ''
            formEl.resetFields()
        } else {
            console.log('error submit!', fields)
        }
    })
}
// }
function opendialog() {
    title.value = props.dialogTitle
    if (props.dialogTitle == '修改') {

        if (props.editForm) {
            id.value = props.editForm.id
            form.zhanghu = props.editForm.zhanghu
            form.zhanghuName = props.editForm.zhanghuName
            form.phone = props.editForm.phone
            form.status = props.editForm.status
            form.role = props.editForm.role

        }
    }
}

// 修改
async function handelEdit(formEl) {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const ids = {
                id: id.value,
            }
            const data = {
                id: id.value,
                zhanghu: form.zhanghu,
                zhanghuName: form.zhanghuName,
                phone: form.phone,
                status: form.status,
                role: form.role
            }
            emit("handelEditSuccess", ids, data);
            // 清空表单
            form.zhanghu = ''
            form.zhanghuName = ''
            form.role = ''
            form.status = false
            form.phone = ''
            formEl.resetFields()
        } else {
            console.log('error submit!', fields)
        }
    })
}




</script>