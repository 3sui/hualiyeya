<!--
 * @Author: your name
 * @Date: 2020-05-07 13:46:11
 * @LastEditTime: 2020-06-29 15:16:02
 * @LastEditors: Please set LastEditors
 * @Description: 报警记录
 * @FilePath: \vue-manage-system\src\components\view\AlarmRecord.vue
 -->
<!--  -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 远程监控
                </el-breadcrumb-item>
                <el-breadcrumb-item>报警记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-row>
                    <el-col>
                        <div class="product-status">
                            <el-input
                                prefix-icon="el-icon-search"
                                v-model.trim="query.msg"
                                placeholder="请输入您需要搜素的内容"
                                class="handle-input mr10"
                                @input="handleSearch"
                            ></el-input>

                            <!-- <el-select
                                v-model="query.address"
                                placeholder="设备种类"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="干燥设备" value="干燥设备"></el-option>
                            </el-select>
                            <el-select
                                v-model="query.address"
                                placeholder="工作状态"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="运行中" value="运行中"></el-option>
                            </el-select>
                            <el-select
                                v-model="query.address"
                                placeholder="开关机"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="开机" value="开机"></el-option>
                            </el-select>
                            <el-date-picker
                                class="mr10"
                                v-model="value2"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                            ></el-date-picker>-->
                            <!-- <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                            <el-button
                                type="primary"
                                plain
                                icon="el-icon-refresh"
                                @click="refresh"
                            >重置</el-button>-->
                        </div>
                    </el-col>
                </el-row>
                <el-table
                    :data="showData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column prop="id" label="序号" width="55" align="center" type="index"></el-table-column>
                    <el-table-column prop="device_eq" label="设备ID" width="85"></el-table-column>
                    <el-table-column prop="typename" label="设备种类" width="55"></el-table-column>
                    <el-table-column prop="device_name" label="设备名称" width="120"></el-table-column>

                    <el-table-column prop="cp_name" label="测点名称"></el-table-column>
                    <el-table-column prop="limit_up" label="上限值"></el-table-column>
                    <el-table-column prop="limit_down" label="下限值"></el-table-column>
                    <el-table-column prop="cp_value" label="报警值">
                        <template slot-scope="scope">
                            <div>{{(+scope.row.cp_value).toFixed(2)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="created_time" label="最近报警日期">
                        <template
                            slot-scope="scope"
                        >{{scope.row.ts | convertTime2('YYYY-MM-DD HH:mm')}}</template>
                    </el-table-column>

                    <!-- 状态 -->
                    <el-table-column prop="is_handled" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.is_handled==='0'?'danger':(scope.row.is_handled=='1'?'success':'')"
                            >{{scope.row.is_handled == '0'? '未处理' : '已处理'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.is_handled == 0"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                            >标为已读</el-button>
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'AlarmRecord',
    data() {
        return {
            showData: [],
            tableData: [],
            query: {
                address: '',
                msg: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            multipleSelection: [],
            value1: '',
            value2: '',
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            }
        };
    },

    components: {},

    computed: {},
    created() {
        this.getData();
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 分页导航
        handlePageChange(val) {
            window.console.log(val);
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        // 触发搜索按钮
        handleSearch() {
            this.query.pageIndex = 1;
            this.showData = this.tableData.filter((item, index) => {
                // return item.Address == '竹林北路256号';
                for (let key in item) {
                    // window.console.log(i, item[i]);
                    if ((item[key] + '').includes(this.query.msg + '')) {
                        return true;
                    }
                }
            });
            this.pageTotal = this.showData.length;

            this.showData = this.showData.slice(
                (this.query.pageIndex - 1) * this.query.pageSize,
                this.query.pageIndex * this.query.pageSize
            );
        },

        // 触发重置按钮
        refresh() {
            this.getData();
            this.query.msg = '';
        },
        getData() {
            axios({
                method: 'get',
                url: '/maintain/fetchAlarmRecord',
            }).then(res => {
                window.console.log(res);
                if (res.data.success) {
                    this.tableData = res.data.data;
                    this.showData = this.tableData.slice(
                        (this.query.pageIndex - 1) * this.query.pageSize,
                        this.query.pageIndex * this.query.pageSize
                    );
                    this.pageTotal = this.tableData.length;
                    window.console.log(res.data);
                } else {
                    window.console.log('服务器错误');
                }
            });
        },
        handleEdit(index, row) {
            console.log(row.id);
            axios({
                method: 'post',
                url: '/maintain/changeHandled',
                data: {
                    id: row.id
                }
            })
                .then(res => {
                    if (res.data.success) {
                        // window.console.log(res.data);
                        this.getData();
                    }
                })
                .catch(err => {});
        },
        handleDelete(index, row) {
            console.log(row.id);

            axios({
                method: 'post',
                url: '/maintain/deleted',
                data: {
                    id: row.id
                }
            })
                .then(res => {
                    if (res.data.success) {
                        // window.console.log(res.data);
                        this.getData();
                    }
                })
                .catch(err => {});
        }
    }
};
</script>
<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.product-status {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
.mt-10 {
    margin-bottom: 10px;
}
.mr10 {
    margin-right: 10px;
}
</style>