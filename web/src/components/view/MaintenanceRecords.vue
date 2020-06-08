<!--
 * @Author: your name
 * @Date: 2020-05-06 15:04:18
 * @LastEditTime: 2020-06-08 00:43:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-manage-system\src\components\view\MaintenanceRecords.vue
 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备档案
                </el-breadcrumb-item>
                <el-breadcrumb-item>维修记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row>
                    <el-col :span="6">
                        <div class="mt-10">
                            <el-button
                                type="primary"
                                icon="el-icon-lx-add"
                                class="handle-del mr10"
                                @click="$router.push('./addNewMaintenance')"
                            >新增</el-button>
                            <el-button
                                type="primary"
                                icon="el-icon-delete"
                                class="handle-del mr10"
                                @click="delAllSelection"
                            >批量删除</el-button>
                        </div>
                        <div></div>
                    </el-col>
                    <el-col :span="18">
                        <div class="product-status">
                            <el-input
                                v-model="keyword"
                                placeholder="客户名称、设备名称、设备ID、维修人"
                                class="handle-input mr10"
                            ></el-input>
                            <!-- <div class="block">
                                <el-date-picker
                                    v-model="value2"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                ></el-date-picker>
                            </div>-->
                            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                            <el-button
                                type="primary"
                                plain
                                icon="el-icon-refresh"
                                @click="refresh"
                            >重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="enterprise_name" label="客户名称"></el-table-column>

                <el-table-column prop="eq" label="设备ID"></el-table-column>
                <el-table-column prop="typename" label="设备种类"></el-table-column>
                <el-table-column prop="device_name" label="设备名称"></el-table-column>
                <!-- <el-table-column prop="Model" label="型号描述"></el-table-column>
                <el-table-column prop="SerialNumber" label="出厂编号"></el-table-column>
                <el-table-column prop="StartTime" label="服务提出日期"></el-table-column>-->

                <el-table-column prop="type" label="故障类型"></el-table-column>
                <el-table-column prop="phenomenon" label="故障现象"></el-table-column>
                <!-- <el-table-column prop="LastSupplier" label="故障部件供应商"></el-table-column>
                <el-table-column prop="IsReplace" label="是否更换零部件"></el-table-column>
                <el-table-column prop="NewSupplier" label="更换部件供应商"></el-table-column>
                <el-table-column prop="Price" label="维修费用（元）"></el-table-column>-->
                <el-table-column prop="cause" label="原因"></el-table-column>

                <el-table-column prop="repair_person" label="维修人"></el-table-column>
                <el-table-column prop="created_time" label="维修时间123"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            @click="handleDetail(scope.$index, scope.row)"
                        >详情</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>-->
    </div>
</template>

<script>
export default {
    name: 'MaintenanceRecords',
    data() {
        return {
            keyword: '',
            tableData: [],
            query: {},
            value1: '',
            value2: '',
            pageIndex: 1,
            pageSize: 10,

            multipleSelection: [],
            delList: [],
            // editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        //吧时间戳转化为想要的时间格式
        // formateTimeStamp(time) {
        //     var date = new Date();
        //     date.setTime(time);
        //     var year = date.getFullYear();
        //     var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        //     var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        //     var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        //     var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        //     var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        //     return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        // },

        // 获取设备列表数据
        getData() {
            axios
                .get('/Repair')
                .then(res => {
                    window.console.log(res);
                    if (res.status === 200) {
                        this.tableData = res.data;
                        this.pageTotal = res.data.length;
                        window.console.log(res.data);
                    } else {
                        window.console.log('服务器错误');
                    }
                })
                .catch();
        },

        // 查看详情
        handleDetail(index, row) {
            this.$router.push({
                path: './MaintenanceDetails',
                query: {
                    id: row.id
                }
            });
        },

        // 触发搜索按钮
        handleSearch() {
            
             axios
                .post('/SearchRepair',{keyword:this.keyword})
                .then(res => {
                    window.console.log(res);
                    if (res.status === 200) {
                        this.tableData = res.data;
                        this.pageTotal = res.data.length;
                        window.console.log(res.data);
                    } else {
                        window.console.log('服务器错误');
                    }
                })
                .catch();
            // this.tableData = this.tableData.filter((item, index) => {
            //     // return item.Address == '竹林北路256号';
            //     for (let key in item) {
            //         // window.console.log(i, item[i]);
            //         if ((item[key] + '').includes(this.keyword)) {
            //             return true;
            //         }
            //     }
            // });
        },

        // 触发重置按钮
        refresh() {
            this.getData();
            this.keyword = '';
        },

        // 删除操作
        handleDelete(index, row) {
            let idArr = [];
            idArr.push(row.id);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    axios({
                        method: 'get',
                        url: '/DeleteRepair',
                        params: {
                            id: idArr
                        }
                    })
                        .then(res => {
                            window.console.log(res.data);
                            this.$message.success('删除成功');
                            this.getData();
                        })
                        .catch();
                })
                .catch(() => {});
        },

        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //批量删除
        delAllSelection() {
            let idArr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                idArr.push(this.multipleSelection[i].id);
            }
            window.console.log(idArr);
            if (this.multipleSelection.length === 0) {
                this.$message.warning('请选择需要删除的项');
                return;
            }
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    axios({
                        method: 'get',
                        url: '/DeleteRepair',
                        params: {
                            id: idArr
                        }
                    })
                        .then(res => {
                            window.console.log(res.data);
                            this.$message.success('删除成功');
                            this.getData();
                        })
                        .catch({});
                    this.multipleSelection = [];
                })
                .catch(() => {});
        },

        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val;
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.product-status {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
}
.mt-10 {
    margin-bottom: 10px;
}
</style>


