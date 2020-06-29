<!--
 * @Author: your name
 * @Date: 2020-05-06 09:29:23
 * @LastEditTime: 2020-06-29 09:14:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-manage-system\src\components\page\ProductList.vue
 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备档案
                </el-breadcrumb-item>
                <el-breadcrumb-item>设备列表</el-breadcrumb-item>
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
                                @click="$router.push('./addnewproduct')"
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
                        <!-- <div class="product-status">
                            <el-select
                                v-model="query.province"
                                placeholder="请选择省"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="江苏省" value="江苏省"></el-option>
                            </el-select>
                            <el-select
                                v-model="query.city"
                                placeholder="请选择市"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="常州市" value="常州市"></el-option>
                            </el-select>
                            <el-select
                                v-model="query.county"
                                placeholder="请选择区"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="天宁区" value="天宁区"></el-option>
                            </el-select>
                            <el-select
                                v-model="query.kind"
                                placeholder="设备种类"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="干燥设备" value="干燥设备"></el-option>
                            </el-select>
                            <el-select
                                v-model="query.status"
                                placeholder="工作状态"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="运行中" value="运行中"></el-option>
                            </el-select>
                            <el-select
                                v-model="query.switch"
                                placeholder="开关机"
                                class="handle-select"
                            >
                                <el-option key="1" label="开机" value="开机"></el-option>
                            </el-select>
                        </div>-->
                        <div class="product-status">
                            <!-- <span class="fs-md mr-2">查找</span> -->
                            <el-input
                                prefix-icon="el-icon-search"
                                v-model.trim="query.msg"
                                placeholder="请输入您需要搜素的内容"
                                class="handle-input mr10"
                                @input="handleSearch"
                            ></el-input>
                            <!-- <div class="block">
                                <el-date-picker
                                    v-model="query.date"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                ></el-date-picker>
                            </div>-->
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
            </div>
            <!-- :data="showData.filter((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize)" -->

            <el-table
                :data="showData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="序号" width="55" align="center" type="index"></el-table-column>
                <el-table-column prop="eq" label="设备ID"></el-table-column>
                <el-table-column prop="device_name" label="设备名称"></el-table-column>
                <el-table-column prop="typename" label="设备种类"></el-table-column>
                <el-table-column prop="device_description" label="型号描述"></el-table-column>
                <el-table-column prop="device_supplier" label="客户名称"></el-table-column>
                <!-- <el-table-column prop="CustomerIndustry" label="客户行业"></el-table-column> -->
                <el-table-column prop="address" label="安装地址(详情)"></el-table-column>
                <!-- <el-table-column prop="Duration" label="运行时长(h)"></el-table-column> -->

                <!-- <el-table-column label="账户余额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>-->
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.status==='正常'?'success':(scope.row.status==='报警'?'danger':'')"
                        >{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="开关机" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.is_on == '0'?'danger':(scope.row.is_on=='1'?'success':'')"
                        >{{scope.row.is_on == '0'? '关机' : '开机'}}</el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="AlarmTimes" label="报警次数"></el-table-column> -->
                <!-- <el-table-column prop="LastMaintenance:" label="上次维修日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.LastMaintenance | convertTime('YYYY-MM-DD')}}</span>
                    </template>
                </el-table-column>-->
                <el-table-column prop="created_time" label="建档日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.created_time | convertTime('YYYY-MM-DD HH:mm')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            @click="handleDetail(scope.$index, scope.row)"
                        >设备详情</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-setting"
                            @click="handleSetting(scope.$index, scope.row)"
                        >测点配置</el-button>
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
        <el-dialog title="编辑设备" :visible.sync="editVisibleDevice" width="30%">
            <el-form ref="form" :model="form" label-width="90px" :rules="rules">
                <el-form-item label="设备名称" prop="device_name">
                    <el-input v-model="form.device_name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="设备厂家" prop="device_supplier">
                    <el-input v-model="form.device_supplier"></el-input>
                </el-form-item>
                <el-form-item label="设备描述" prop="device_description">
                    <el-input v-model="form.device_description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleDevice = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 配置测点弹出框 -->
        <el-dialog title="配置测点" :visible.sync="editVisibleSetting" width="50%">
            <el-form ref="setting" :model="formSetting" label-width="120px">
                <div v-for="(item, index) in formSetting.point" :key="index" class="point">
                    <p class="point-title">测点{{index +1}}</p>
                    <el-form-item label="测点标识号">
                        <el-input v-model="item.cp_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="测点名称">
                        <el-input v-model="item.cp_name"></el-input>
                    </el-form-item>
                    <el-form-item label="测点单位">
                        <el-input v-model="item.unit"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="计算系数值">
                        <el-input v-model="item.k"></el-input>
                    </el-form-item>-->
                    <el-form-item label="量程上限值">
                        <el-input v-model="item.up"></el-input>
                    </el-form-item>
                    <el-form-item label="量程下限值">
                        <el-input v-model="item.down"></el-input>
                    </el-form-item>
                    <el-form-item label="报警上限值">
                        <el-input v-model="item.limit_up"></el-input>
                    </el-form-item>
                    <el-form-item label="报警下限值">
                        <el-input v-model="item.limit_down"></el-input>
                    </el-form-item>
                </div>
                <div style="text-align: center">
                    <el-button @click="addNewPoint">添加</el-button>
                    <el-button type="button" @click="deletePoint">删除</el-button>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleSetting = false">取 消</el-button>
                <el-button type="primary" @click="saveSetting">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'DeviceList',
    data() {
        return {
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
            query: {
                province: '', //省份
                city: '', //市
                county: '', //区县
                kind: '', //种类
                status: '', //状态
                switch: '', //开关机
                msg: '', //关键字
                date: '', //筛选日期
                pageIndex: 1, //当前页数
                pageSize: 10 //每页显示个数选择器的选项设置
            },
            tableData: [], //设备列表的数据
            showData: [], //展示的数据
            multipleSelection: [],
            delList: [],
            editVisibleDevice: false,
            editVisibleSetting: false,
            pageTotal: 0,
            form: {},
            rules: {
                device_name: [
                    {
                        required: true,
                        message: '请输入设备名称',
                        trigger: 'change'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请输入设备名称',
                        trigger: 'change'
                    }
                ],
                device_supplier: [
                    {
                        required: true,
                        message: '请输入设备名称',
                        trigger: 'change'
                    }
                ],
                device_description: [
                    {
                        required: true,
                        message: '请输入设备名称',
                        trigger: 'change'
                    }
                ]
            },
            formSetting: {
                point: [],
                eq: ''
            }, //配置测点数据

            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    computed: {},
    methods: {
        // 获取设备列表数据
        getData() {
            axios({
                method: 'get',
                url: '/device/fetchAllDevice'
            })
                .then(res => {
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
                })
                .catch();
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

        // 删除操作
        handleDelete(index, row) {
            let idArr = [];
            idArr.push(row.id);
            window.console.log(idArr);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    axios({
                        method: 'get',
                        url: '/device/deleteProducts',
                        params: {
                            id: idArr
                        }
                    })
                        .then(res => {
                            window.console.log(res.data);
                            this.$message.success(res.data);
                            this.getData();
                        })
                        .catch();
                })
                .catch(() => {});
        },

        // 查看详情
        handleDetail(index, row) {
            this.$router.push({
                path: './ProductDetails',
                query: {
                    id: row.id
                }
            });
        },

        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            window.console.log(val);
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
                        url: '/device/deleteProducts',
                        params: {
                            id: idArr
                        }
                    })
                        .then(res => {
                            window.console.log(res.data);
                            this.$message.success(res.data);
                            this.getData();
                        })
                        .catch({});
                    this.multipleSelection = [];
                })
                .catch(() => {});
        },

        // 编辑操作
        handleEdit(index, row) {
            window.console.log(row);
            this.idx = index;
            this.form = row;
            this.editVisibleDevice = true;
        },
        // 保存编辑
        saveEdit() {
            axios({
                method: 'post',
                url: '/device/saveEdit',
                data: this.form
            })
                .then(res => {
                    if (res.data.success) {
                        this.editVisibleDevice = false;
                        this.$message.success(res.data.message);
                        this.getData();
                    }
                })
                .catch(err => {});
        },
        // 配置测点
        handleSetting(index, row) {
            window.console.log(row);
            this.editVisibleSetting = true;
            this.formSetting.eq = row.eq;
            axios({
                method: 'get',
                url: '/device/fetchSetting',
                params: {
                    eq: row.eq
                }
            })
                .then(res => {
                    window.console.log(this.formSetting);

                    console.log(res.data);
                    if (res.data.success) {
                        this.$set(this.formSetting, 'point', res.data.data);
                        window.console.log(this.formSetting);
                    }
                    window.console.log(this.formSetting);
                })
                .catch(err => {});
        },

        //
        addNewPoint() {
            if (this.formSetting.point.length > 5) {
                this.$message.error('最多创建6个测点');
                return;
            }
            this.formSetting.point.push({
                cp_id: 'cp' + (this.formSetting.point.length + 1),
                cp_name: '',
                unit: '',
                up: '',
                down: '',
                limit_up: '',
                limit_down: ''
            });
        },
        deletePoint() {
            if (this.formSetting.point.length == 1) {
                return;
            }
            this.formSetting.point.pop();
        },

        //确认修改配置
        saveSetting() {
            console.log(this.formSetting);
            this.$confirm('是否确认修改?', '提示', {
                type: 'warning'
            })
                .then(() => {
                    axios({
                        method: 'post',
                        url: '/device/saveSetting',
                        data: this.formSetting
                    })
                        .then(res => {
                            window.console.log(res.data);
                            if (res.data.success) {
                                this.$message.success(res.data.message);
                                this.editVisibleSetting = false;
                            }
                        })
                        .catch(err => {
                            throw err;
                        });
                })
                .catch(err => {
                    throw err;
                });
        },

        // 分页导航
        handlePageChange(val) {
            window.console.log(val);
            this.$set(this.query, 'pageIndex', val);
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
    align-items: center;
}
.mt-10 {
    margin-bottom: 10px;
}
</style>


