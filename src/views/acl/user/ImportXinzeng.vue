<template>
    <div>

        <el-dialog v-model="isVisible" :title="dialogTitle" width="800" @open="opendialog" :show-close="false">
            <el-form :model="form">
                <el-form-item label="登录名称" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off" />
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
    form.name = ''
    form.username = ''
    form.phone = ''
    form.address = ''
}
const form = reactive({
    name: '',
    username: '',
    phone: '',
    address: '',

})
const id = ref(null)
const title = ref('')
// 点击登录
function handelSucess() {
    if (form.name == "" || form.username == "" || form.phone == "" || form.address == "") {
        ElMessage.warning('请输入完整信息')
    } else {
        const data = {
            name: form.name,
            username: form.username,
            phone: form.phone,
            address: form.address,
        }
        // 通知父组件关闭弹窗
        emit("handelXinzeng", data);
        // 清空表单
        form.name = ''
        form.username = ''
        form.phone = ''
        form.address = ''
    }
}
function opendialog() {
    title.value = props.dialogTitle
    if (props.dialogTitle == '修改') {

        if (props.editForm) {
            id.value = props.editForm.id
            form.name = props.editForm.name
            form.username = props.editForm.username
            form.phone = props.editForm.phone
            form.address = props.editForm.address
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
        name: form.name,
        username: form.username,
        phone: form.phone,
        address: form.address,
    }
    emit("handelEditSuccess", ids, data);
    // 清空表单
    form.name = ''
    form.username = ''
    form.phone = ''
    form.address = ''
}




</script>