<!--
 * @Author: your name
 * @Date: 2020-05-06 09:29:23
 * @LastEditTime: 2020-05-17 17:15:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-manage-system\src\components\page\ProductList.vue
 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 产品档案
                </el-breadcrumb-item>
                <el-breadcrumb-item>产品列表</el-breadcrumb-item>
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
                            <el-input
                                v-model="query.msg"
                                placeholder="请输入关键字"
                                class="handle-input mr10"
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
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center" type="index"></el-table-column>
                <el-table-column prop="DeviceID" label="设备ID"></el-table-column>
                <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
                <el-table-column prop="DeviceClass" label="设备种类"></el-table-column>
                <el-table-column prop="Model" label="型号描述"></el-table-column>
                <el-table-column prop="SerialNumber" label="出厂编号"></el-table-column>
                <el-table-column prop="CustomerName" label="客户名称"></el-table-column>
                <el-table-column prop="CustomerIndustry" label="客户行业"></el-table-column>
                <el-table-column prop="Province" label="安装地址(省)"></el-table-column>
                <el-table-column prop="City" label="安装地址(市)"></el-table-column>
                <el-table-column prop="District" label="安装地址(区)"></el-table-column>
                <el-table-column prop="Address" label="安装地址(详情)"></el-table-column>
                <el-table-column prop="Duration" label="运行时长(h)"></el-table-column>

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
                            :type="scope.row.switch==='开机'?'success':(scope.row.switch==='关机'?'danger':'')"
                        >{{scope.row.switch}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="AlarmTimes" label="报警次数"></el-table-column>
                <el-table-column prop="LastMaintenance:" label="上次维修日期">
                    <template slot-scope="scope">
                        <span>{{formateTimeStamp(scope.row.LastMaintenance)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Createtime" label="建档日期">
                    <template slot-scope="scope">
                        <span>{{formateTimeStamp(scope.row.Createtime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>-->
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
    name: 'basetable',
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
    computed: {},
    methods: {
        //吧时间戳转化为想要的时间格式
        formateTimeStamp(time) {
            var date = new Date();
            date.setTime(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        },

        // 获取设备列表数据
        getData() {
            axios
                .get('/getProductList')
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
            this.getData();
            this.query.msg = '';
        },

        // 删除操作
        handleDelete(index, row) {
            let idArr = [];
            idArr.push(row.DeviceID);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    axios({
                        method: 'get',
                        url: '/deleteProducts',
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
                    id: row.DeviceID
                }
            });
        },

        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //批量删除
        delAllSelection() {
            let idArr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                idArr.push(this.multipleSelection[i].DeviceID);
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
                        url: '/deleteProducts',
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


