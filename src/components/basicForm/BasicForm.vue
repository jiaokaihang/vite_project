<script setup>
import { ref } from 'vue'
// 父组件传递过来的数据
const props = defineProps(['list', 'picker'])
// 父组件传递过来的事件
const emit = defineEmits([
    "query",
    "queryPrefectural",
    "queryCounty",
    "querySearchList",
    "chang",
    "blur",
    "queryTableData",
])


const resetData = ref([])
// eslint-disable-next-line no-unused-vars
const options = ref([])
//查询
function onSubmit() {
    // 发起一次请求
    const formData = props.list.reduce((obj, item) => {
        obj[item.value] = item.value;
        return obj;
    }, {});
    console.log('formData', formData)
    emit("query", formData);
}
//重置
function onReset() {
    // 同样也要发起一次请求
    const formData = props.list.reduce((obj, item) => {
        obj[item.value] = item.value;
        return obj;
    }, {});
    resetData.value = props.list.map((item) => (item.value = ""));
    emit("queryTableData", formData);
}

function handelChange(e) {
    console.log("eeeee", e);
    if (e.length == 2) {
        // 市
        console.log("e大于2调用");
        emit("queryCounty", e);
    } else {
        // 省
        console.log("e小于2调用");
        emit("queryPrefectural", e);
    }
}

function searchList(e) {
    console.log("e", e);
    emit("querySearchList", e);
}
function changTab() {
    emit("chang");
}
function blurList() {
    emit("blur");
}


</script>



<template>
    <el-form style="display: flex">
        <div style="display: flex">
            <div v-for="(item, index) in list" :key="index" style="width: 300px">
                <el-form-item :label="item.title" style="margin-bottom: 0px">
                    <template v-if="item.type === 'select'">
                        <el-select v-model="item.value" placeholder="请选择" style="height: 32px">
                            <el-option v-for="(option, optionIndex) in item.options" :key="optionIndex"
                                :label="option.label" :value="option.value">
                            </el-option>
                        </el-select>
                    </template>
                    <template v-if="item.type === 'selectProivce'">
                        <el-select v-model="item.value" placeholder="请选择">
                            <el-option v-for="(option, optionIndex) in item.options" :key="optionIndex"
                                :label="option.label" :value="option.label"></el-option>
                        </el-select>
                    </template>
                    <!-- <template v-if="item.type === 'chuliselect'">
                        <el-select v-model="item.value" placeholder="请选择" :lazy="true" :filterable="true"
                            :filter-method="searchList" @change="changTab" @blur="blurList"
                            v-el-select-loadmore:rangeNumber="loadMore(rangeNumber)">
                            <el-option v-for="(option, optionIndex) in item.options.slice(
                                0,
                                rangeNumber
                            )" :key="optionIndex" :label="option.label" :value="option.value"></el-option>
                        </el-select>
                    </template> -->
                    <template v-else-if="item.type === 'input'">
                        <el-input v-model="item.value" placeholder="请输入" style="width: 180px"></el-input>
                    </template>
                    <template v-else-if="item.type === 'Chuliinput'">
                        <el-input v-model="item.values" placeholder="请输入" style="width: 200px" readonly></el-input>
                    </template>
                    <template v-else-if="item.type === 'datePicker'" >
                        <el-date-picker style="width: 180px;margin-left: 10px;" v-model="item.value" type="date" format="YYYY-MM-DD "
                            value-format="YYYY-MM-DD" placeholder="请选择日期" >
                        </el-date-picker>
                    </template>
                    <!-- <template v-else-if="item.type === 'datePickerChuli'">
                        <el-date-picker style="width: 180px" v-model="item.value" type="date" format="yyyy-MM-dd "
                            value-format="yyyy-MM-dd" placeholder="请选择日期" :picker-options="pickerOptions"
                            :default-value="picker[0]">
                        </el-date-picker>
                    </template> -->
                    <template v-else-if="item.type === 'cascader'">
                        <el-cascader v-model="item.value" :options="item.options" :props="{ checkStrictly: true }"
                            @change="handelChange" clearable></el-cascader>
                    </template>
                </el-form-item>

            </div>
        </div>
        <el-form-item label="" style="margin-bottom: 0; width: 200px">
            <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
            <el-button type="info" @click="onReset" size="small"
                style="background-color: #e7e7e7; color: #171717; border: none">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="scss">
.el-form-item label {
    color: #171717;
}

.el-input,
.el-select {
    .el-input__inner {
        height: 32px;
    }
}
</style>