<script setup>
import { ref, onMounted, onBeforeUpdate, nextTick, computed } from 'vue'
const emit = defineEmits([  //emit是父组件向子组件传递的自定义事件
    "query",
    "queryPage",
    "MultipleChoice",
    "RadioChoice",
    "informationTitle",
    "queryTable",
    "queryTableTwo",
    "selectTalkDelete",
    "updateTalk",
    "zhengceTalk",
    "yunyingTalk",
    "changeView",
    "changeInformation",
    "handelViewDetails",
    "handelPermissionEditing",
])
const props = defineProps([  //props是父组件向子组件传递的数据
    "colum",
    "tableData",
    "pagesize",
    "currpage",
    "selections",
    "radioSelects",
    "controls",
    "selectTalkDelete",
    "height",
    "width",
    "totalRows",
    "disable",
    "disjieguo",
    "loading",
    "querySelect",
    "search",
    'xuhao'
])

const newPageSize = ref(0)
const newCurrpage = ref(1)

const multipleTable = ref(null)

//计算属性-计算每页的数据
const paginationData = computed((item) => {
    const start = (newCurrpage.value - 1) * newPageSize.value;
    const end = newCurrpage.value * newPageSize.value
    return props.tableData.slice(start, end)
})



onMounted(() => {
    newPageSize.value = props.pagesize;
    newCurrpage.value = props.currpage;
    emit("query", newPageSize.value, 1);
    emit("queryPage", newPageSize.value, newCurrpage.value);
})
onBeforeUpdate(() => {
    nextTick(() => {
        multipleTable.value.doLayout();
    })
})


function handleSelectionChange(val) {
    //多选的数据传给父组件
    emit("MultipleChoice", val);
}
function setCurrentRow(row) {
    multipleTable.value.setCurrentRow(row);
}
function handleRadioCurrentChange(val) {
    emit("RadioChoice", val);
}
function cellClick(v, colunm) {
    if (colunm.label == "标题") {
        emit("informationTitle", v);
    }
}
//分页-每条页数
function handleSizeChange(val) {
    console.log(`每页${val}条`);
    newPageSize.value = val;
    // emit("query", newPageSize.value, newCurrpage.value);
    // emit("queryPage", newPageSize.value, newCurrpage.value);
    // emit("queryTable");
    // emit("queryTableTwo");
}
//当前页
function handleCurrentChange(val) {
    console.log(`当前页：${val}`);
    newCurrpage.value = val;
    // emit("query", newPageSize.value, newCurrpage.value);
    // emit("queryPage", newPageSize.value, newCurrpage.value);
    // emit("queryTable");
    // emit("queryTableTwo");
}
//删除某条数据
function handleDelete(index, row) {
    emit("selectTalkDelete", index, row);
}
//修改
function handleEdit(index, row) {
    emit("updateTalk", index, row);
    emit("zhengceTalk", index, row);
    emit("yunyingTalk", index, row);
}
//查看
function handleView(index, row) {
    emit("changeView", index, row);
}

//详细信息
function handleInformation(index, row) {
    emit("changeInformation", index, row);
}
//详情
function handelDetails(index, row) {
    emit('handelViewDetails', index, row)
}
//编辑
function handleEditor(index, row) {
    emit('handelPermissionEditing', index, row)
}
</script>
<template>
    <div>
        <div v-show="paginationData.length > 0">
            <el-table :data="paginationData" ref="multipleTable" border style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row @row-click="handleRadioCurrentChange"
                @cell-click="cellClick" v-loading="loading" :header-cell-style="{ color: '#8F8F8F' }"
                :cell-style="{ color: '#171717' }">
                <el-table-column v-if="selections" type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="80" label="序号" v-if="xuhao">
                    <template v-slot="scope">
                        <span style="color: rgba(0, 0, 0, 0.9)">{{
            (newCurrpage - 1) * newPageSize + scope.$index + 1
        }}</span>
                    </template>
                </el-table-column>

                <el-table-column v-for="(item, index) in colum" :key="index" :prop="item.prop" :label="item.label"
                    :width="width">
                    
                    <template v-slot="scope">
                        
                        <span :style="item.prop === 'dataPermission' ? { background: scope.row.dataPermission === '全部数据权限' ? '#1AB394' : '#1C84C6', color: '#fff', fontSize: '14px', borderRadius: '65px', padding: '3px' } : {}" v-if="item.prop === 'dataPermission'">
                            {{ scope.row[item.prop] }}
                        </span>
                        <!-- 添加状态按钮 -->

                        <div v-if="item.prop === 'status'">
      
                            <el-switch v-model="scope.row.status" />
                        </div>
                    </template>


                </el-table-column>

                <el-table-column label="操作" v-if="controls === 'edit'" fixed="right" width="100px">
                    <template v-slot="scope">
                        <span class="cursor" @click="handleEdit(scope.$index, scope.row)">修改</span>
                        <span class="cursor" ref="delete" @click="handleDelete(scope.$index, scope.row)">删除</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-if="controls === 'editProcessCenter'" fixed="right" width="150px">
                    <template v-slot="scope">
                        <span class="cursor" @click="handleEdit(scope.$index, scope.row)">修改</span>
                        <span class="cursor" @click="handelDetails(scope.$index, scope.row)">详情</span>
                        <span class="cursor" ref="delete" @click="handleDelete(scope.$index, scope.row)">删除</span>

                    </template>
                </el-table-column>
                <el-table-column label="操作" v-else-if="controls === 'compute'">
                    <template v-slot="scope">
                        <span class="cursor" @click="handleEdit(scope.$index, scope.row)">计算</span>
                        <span class="cursor" @click="handleDelete(scope.$index, scope.row)">查看</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-else-if="controls === 'show'">
                    <template v-slot="scope">
                        <el-button :disabled="scope.row.disable" class="cursor"
                            @click="handleEdit(scope.$index, scope.row)">
                            <span :style="{ color: scope.row.disable ? '#888' : '#0052D9' }">计算</span>
                        </el-button>
                        <el-button :disabled="scope.row.disjieguo" class="cursor"
                            @click="handleDelete(scope.$index, scope.row)"><span
                                :style="{ color: scope.row.disjieguo ? '#888' : '#0052D9' }">结果展示</span></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-else-if="controls === 'ChuliShow'">
                    <template v-slot="scope">
                        <div class="chuliShowtn">
                            <el-button :disabled="scope.row.disable" class="cursor"
                                @click="handleEdit(scope.$index, scope.row)">
                                <span :style="{ color: scope.row.disable ? '#888' : '#0052D9' }">计算</span>
                            </el-button>
                            <el-button class="cursor" @click="handleView(scope.$index, scope.row)">
                                <span>详情</span>
                            </el-button>
                            <el-button :disabled="scope.row.disjieguo" class="cursor"
                                @click="handleDelete(scope.$index, scope.row)"><span
                                    :style="{ color: scope.row.disjieguo ? '#bab8b8' : '#0052D9' }">结果展示</span></el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" v-else-if="controls === 'qxEdit'">
                    <template v-slot="scope">
                        <span class="cursor" v-if="scope.row.value !== '超级管理员'"
                            @click="handleEditor(scope.$index, scope.row)">编辑</span>
                    </template>
                </el-table-column>
                <el-table-column label="结果展示" v-else-if="controls === 'zhanshi'">
                    <template v-slot="scope">
                        <span class="cursor" @click="handleEdit(scope.$index, scope.row)">结果展示</span>
                    </template>
                </el-table-column>
            </el-table>

            <div class="paging">
                <div class="totalStyle">共{{ totalRows }}项数据</div>
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    v-model:current-page="newCurrpage" :page-sizes="[5, 10, 15, 20]" :page-size="newPageSize"
                    layout="sizes, prev, pager, next, jumper" :total="props.totalRows">
                </el-pagination>
            </div>
        </div>

    </div>
</template>



<style scoped lang="scss">
.paging {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 20px 20px; */
    padding-top: 10px;
}

.totalStyle {
    font-size: 15px;
    color: #a1a3a7;
}

span {
    margin-right: 5px;
}

/* .el-table {
  width: 99.9% !important;
} */
.el-table .cell {
    height: 20px !important;
}

.cursor {
    cursor: pointer;
}

.el-button {
    padding: 0;
    margin-right: 10px;
    border: none;

    font-weight: normal;
}

.chuliShowtn {
    display: flex;
    flex-direction: column;

    .cursor {
        cursor: pointer;
        margin-top: 10px;
        background: none;
    }
}
</style>