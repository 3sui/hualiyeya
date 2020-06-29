<!--
 * @Author: your name
 * @Date: 2020-05-06 16:21:18
 * @LastEditTime: 2020-06-29 16:52:33
 * @LastEditors: Please set LastEditors
 * @Description: 设备监控
 * @FilePath: \vue-manage-system\src\components\view\EquipmentMonitoring.vue
 -->
<!--  -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 远程监控
                </el-breadcrumb-item>
                <el-breadcrumb-item>设备监控</el-breadcrumb-item>
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
                            <!-- <el-button
                                type="primary"
                                icon="el-icon-delete"
                                class="handle-del"
                                @click="visible = true;"
                            >阈值查看</el-button>-->

                            <!-- <el-dialog
                                v-dialogDrag
                                title="阈值详情"
                                center
                                :visible.sync="visible"
                                width="30%"
                            >
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>测点名称</th>
                                                <th>上限值</th>
                                                <th>下限值</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>主机温度</td>
                                                <td>234</td>
                                                <td>123</td>
                                            </tr>
                                            <tr>
                                                <td>主机温度</td>
                                                <td>234</td>
                                                <td>123</td>
                                            </tr>
                                            <tr>
                                                <td>主机温度</td>
                                                <td>234</td>
                                                <td>123</td>
                                            </tr>
                                            <tr>
                                                <td>主机温度</td>
                                                <td>234</td>
                                                <td>123</td>
                                            </tr>
                                            <tr>
                                                <td>主机温度</td>
                                                <td>234</td>
                                                <td>123</td>
                                            </tr>
                                            <tr>
                                                <td>主机温度</td>
                                                <td>234</td>
                                                <td>123</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="visible = false">确 定</el-button>
                                </span>
                            </el-dialog>-->
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="showData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="id" label="序号" width="55" align="center" type="index"></el-table-column>

                <el-table-column prop="eq" label="设备ID"></el-table-column>

                <el-table-column prop="device_name" label="设备名称"></el-table-column>
                <el-table-column prop="device_model" label="设备型号"></el-table-column>
                <el-table-column prop="device_description" label="型号描述"></el-table-column>
                <el-table-column prop="device_supplier" label="客户名称"></el-table-column>

                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.status==='正常'?'success':(scope.row.status==='报警'?'danger':'')"
                        >{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="is_on" label="开关机" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.is_on == '0'?'danger':(scope.row.is_on=='1'?'success':'')"
                        >{{scope.row.is_on == '0'? '关机' : '开机'}}</el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="created_time" label="更新日期"></el-table-column> -->
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            @click="handleMore(scope.$index, scope.row)"
                        >查看详情</el-button>
                        <!-- <el-button
                            type="text"
                            icon="el-icon-setting"
                            @click="handleSetting(scope.$index, scope.row)"
                        >测点配置</el-button>-->
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
    name: 'EquipmentMonitoring',
    data() {
        return {
            visible: false,
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
            },
            value1: '',
            value2: '',
            query: {
                address: '',
                msg: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            showData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
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
        // 获取 easy-mock 的模拟数据
        getData() {
            axios({
                method: 'get',
                url: '/maintain/fetchEquipment'
            }).then(res => {
                window.console.log(res);
                if (res.data.success) {
                    this.tableData = res.data.data;
                    this.showData = this.tableData.slice(
                        (this.query.pageIndex - 1) * this.query.pageSize,
                        this.query.pageIndex * this.query.pageSize
                    );
                    this.pageTotal = res.data.data.length;
                    window.console.log(res.data);
                } else {
                    window.console.log('服务器错误');
                }
            });
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
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleMore(index, row) {
            console.log(index, row);
            this.$router.push({
                path: '/MeasuringPointDetails',
                query: {
                    eq: row.eq
                }
            });
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
th {
    background-color: #eef1f6;
    padding: 5px 15px;
}
td {
    padding: 5px 15px;
}
table {
    margin: 0 auto;
    width: 90%;
    border: 1px solid #cdcdcd;
    text-align: center;
}
</style>

