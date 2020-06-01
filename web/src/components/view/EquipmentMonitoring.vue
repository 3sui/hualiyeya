<!--
 * @Author: your name
 * @Date: 2020-05-06 16:21:18
 * @LastEditTime: 2020-05-16 12:41:20
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
                                v-model="query.name"
                                placeholder="请输入关键字"
                                class="handle-input mr10"
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
                            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                            <el-button
                                type="primary"
                                plain
                                icon="el-icon-refresh"
                                @click="refresh"
                            >重置</el-button>
                            <el-button
                                type="primary"
                                icon="el-icon-delete"
                                class="handle-del"
                                @click="visible = true;"
                            >阈值查看</el-button>

                            <el-dialog
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
                                    <!-- <el-button @click="visible = false">取 消</el-button> -->
                                    <el-button type="primary" @click="visible = false">确 定</el-button>
                                </span>
                            </el-dialog>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                @cell-click="showMore"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center" type="index"></el-table-column>

                <el-table-column prop="DeviceID" label="设备ID"></el-table-column>

                <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
                <el-table-column prop="DeviceClass" label="设备种类"></el-table-column>
                <el-table-column prop="Model" label="型号描述"></el-table-column>
                <el-table-column prop="SerialNumber" label="出厂编号"></el-table-column>
                <el-table-column prop="CustomerName" label="客户名称"></el-table-column>

                <el-table-column prop="Engin" label="主机温度(℃)"></el-table-column>
                <el-table-column prop="WaterTank" label="水箱温度(℃)"></el-table-column>
                <el-table-column prop="Enter" label="进口温度(℃)"></el-table-column>
                <el-table-column prop="Export" label="出口温度(℃)"></el-table-column>
                <el-table-column prop="Pressure" label="压力"></el-table-column>
                <el-table-column prop="DiffPressure" label="压差"></el-table-column>
                <el-table-column prop="RotatingSpeed" label="电机转速(转/分)"></el-table-column>
                <el-table-column prop="Current" label="电流(A)"></el-table-column>
                <el-table-column prop="Level" label="主油箱液位(mm)"></el-table-column>
                <el-table-column prop="Temperature" label="主油箱温度(℃)"></el-table-column>
                <el-table-column prop="TemperatureFeedLine" label="供油管路温度(℃)"></el-table-column>
                <el-table-column prop="EmergencyDiffPressure" label="紧急过滤器压差"></el-table-column>
                <el-table-column prop="BinocularsDiffPressure" label="双筒过滤器压差"></el-table-column>
                <el-table-column prop="FuelTankLevel" label="高位油箱液位(mm)"></el-table-column>
                <el-table-column prop="ControlOilPressure" label="控制油压力"></el-table-column>
                <el-table-column prop="LubricatingOilOutletPressure" label="润滑油出口压力"></el-table-column>
                <el-table-column prop="MotorPumpShock" label="电机泵组震动"></el-table-column>
                <el-table-column prop="MotorCurrent" label="电机电流"></el-table-column>
                <el-table-column prop="MainTankOilAnalysis" label="主油箱油品分析"></el-table-column>
                <el-table-column prop="ErrorCode" label="故障代码"></el-table-column>
                <el-table-column prop="Duration" label="运行时长(h)"></el-table-column>
                <el-table-column prop="status" label="工作状态"></el-table-column>
                <el-table-column prop="switch" label="开关机"></el-table-column>
                <!-- <el-table-column prop="name" label="更新日期"></el-table-column> -->
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
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
        </el-dialog>
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
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
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
                url: '/fetchEquipment'
            }).then(res => {
                window.console.log(res);
                if (res.status === 200) {
                    this.tableData = res.data;
                    this.pageTotal = res.data.length;
                    window.console.log(res.data);
                } else {
                    window.console.log('服务器错误');
                }
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.tableData = this.tableData.filter((item, index) => {
                // return item.Address == '竹林北路256号';
                for (let key in item) {
                    // window.console.log(i, item[i]);
                    if ((item[key] + '').includes(this.query.msg)) {
                        return true;
                    }
                }
            });
        },

       // 触发重置按钮
        refresh() {
            this.getData()
            this.query.msg = ''
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
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
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },

        //跳转到详情页
        showMore(row, column, cell, event) {
            window.console.log(row, column, cell, event);
            let a;
            let arr = [
                '主机温度(℃)',
                '水箱温度(℃)',
                '进口温度(℃)',
                '出口温度(℃)',
                '压力',
                '压差',
                '电机转速(转/分)',
                '电流(A)',
                '主油箱液位(mm)',
                '主油箱温度(℃)',
                '供油管路温度(℃)',
                '紧急过滤器压差',
                '双筒过滤器压差',
                '高位油箱液位(mm)',
                '控制油压力',
                '润滑油出口压力',
                '电机泵组震动',
                '电机电流',
                '主油箱油品分析',
                '运行时长(h)'
            ];
            a = arr.includes(column.label);
            if (!a) {
                return false;
            }
            this.$router.push({
                path: '/MeasuringPointDetails',
                query: {
                    type: column.property,
                    id: row.DeviceID,
                    label: column.label,
                    row
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

