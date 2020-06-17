<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    class="handle-del mr10"
                    @click="AddData"
                    icon="el-icon-plus"
                >新增</el-button>
                <el-input v-model="keyword" placeholder="企业名称、用户名、用户昵称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch(keyword)">搜索</el-button>

                <!-- <div class="block datechoose">
                    <span class="demonstration">创建日期</span>
                    &nbsp;
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </div>-->
            </div>

            <!-- 表格列 -->
            <el-table
                :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- 复选框 -->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <!-- 企业名称 -->
                <el-table-column prop="enterprise_name" label="企业名称" align="center"></el-table-column>
                <!-- 用户账号 -->
                <el-table-column prop="username" label="用户账号" align="center"></el-table-column>
                <!-- 昵称 -->
                <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
                <!-- 用户权限 -->
                <el-table-column prop="permission" label="用户权限" align="center"></el-table-column>
            

                <!-- 创建日期 -->
                <el-table-column prop="created_time" label="创建日期" align="center">
                    <template
                        slot-scope="scope"
                    >{{+scope.row.created_time | convertTime('YYYY-MM-DD HH:mm')}}</template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>

                        <el-button
                            type="text"
                            icon="el-icon-refresh"
                            @click="handleReset(scope.$index, scope.row)"
                        >重置密码</el-button>
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
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog
            :title="isAdd?'新增':'编辑'"
            :visible.sync="editVisible"
            width="30%"
            class="demo-ruleForm"
            @close="Cancel"
        >
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="企业名称">
                    <el-select v-model="form.enterprise_id" placeholder="请选择企业">
                        <el-option
                            v-for="enterprise in enterprises"
                            :label="enterprise.enterprise_name"
                            :value="enterprise.id"
                            :key="enterprise"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="用户权限">
                    <el-select v-model="form.permission" placeholder="请选择">
                        <el-option
                            v-for="permission in permissions"
                            :label="permission.permission_name"
                            :value="permission.id"
                            :key="permission"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click=" Confirm() ">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',
    data() {
        return {
            enterprises: [],
            permissions: [
                { id: 1, permission_name: '超级管理员' },
                { id: 2, permission_name: '企业管理员' },
                { id: 3, permission_name: '企业普通账号' },
                { id: 4, permission_name: '维修工账号' }
            ],
            keyword: '',
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            pageIndex: 1,
            pageSize: 10,
            form: {},
            isAdd: true,
            idx: 1
        };
    },
    created() {
        this.getData();
        this.getEnterprises();
    },

    methods: {
        //获取企业选项
        getEnterprises() {
            this.$axios
                .get('/dataSettings/Enterprise')
                .then(res => {
                    // console.log(res.data);
                    this.enterprises = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        // 获取数据
        getData() {
            this.$axios
                .get('/dataSettings/UserInfo')
                .then(res => {
                    console.log(res.data);
                    this.tableData = res.data;
                    this.pageTotal = this.tableData.length;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 触发搜索按钮
        handleSearch(value) {
            if (value !== '') {
                let query = {
                    keyword: value
                };
                this.$axios.post('/dataSettings/SearchUserInfo', query).then(res => {
                    if (res) {
                        this.tableData = res.data;
                        this.pageTotal = this.tableData.length;
                    }
                });
            } else {
                this.getData();
            }
            //this.tableData = this.filterBy(this.tableAll, value);
            //this.pageTotal = this.tableData.length;
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    let query = {
                        id: this.tableData[index + this.pageSize * (this.pageIndex - 1)].id
                    };
                    this.$axios
                        .post('/dataSettings/DeleteUserInfo', query)
                        .then(res => {
                            // console.log(res);
                            this.pageIndex = 1;
                            this.getData();
                            this.$message.success('删除成功');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //添加操作
        AddData() {
            this.editVisible = true;
            this.isAdd = true;
            this.form = {
                is_deleted: 0,
                password: '123456'
            };
        },
        //添加确认
        Confirm() {
            if (this.form.enterprise_id === '' || this.form.enterprise_id === null) {
                this.$message.error(`企业名称不能为空`);
            } else if (this.form.username === '' || this.form.username === null) {
                this.$message.error(`用户名不能为空`);
            } else if (this.form.nickname === '' || this.form.nickname === null) {
                this.$message.error(`昵称不能为空`);
            } else if (this.form.permission === '' || this.form.permission === null) {
                this.$message.error(`用户权限不能为空`);
            } else {
                if (this.isAdd) {
                    let date = new Date();
                    this.form.created_time = date.getTime();
                    console.log(date);
                    this.$axios
                        .post('/dataSettings/AddUserInfo', this.form)
                        .then(res => {
                            console.log(res.data);
                            this.getData();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.form.id = this.idx;
                    delete this.form['enterprise_name'];
                    delete this.form['created_time'];
                    // let date = new Date(this.form.created_time);
                    // this.form.created_time = date.getTime();
                    this.$axios
                        .post('/dataSettings/updateUserInfo', this.form)
                        .then(res => {
                            console.log(res.data);
                            this.getData();
                            this.$message.success('修改成功');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                this.editVisible = false;
                this.form = {};
            }
        },
        //取消
        Cancel() {
            this.editVisible = false;
            this.form = {};
            this.getData();
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = this.tableData[index + (this.pageIndex - 1) * this.pageSize].id;
            // delete row['enterprise_name'];
            this.form = row;
            this.editVisible = true;
            this.isAdd = false;
        },
        //重置密码
        handleReset(index, row) {
            this.$confirm('确定要重置吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    let query = {
                        id: this.tableData[index + this.pageSize * (this.pageIndex - 1)].id
                    };
                    this.$axios
                        .post('/dataSettings/UpdatePassword', query)
                        .then(res => {
                            if (res.data.success) {
                                this.getData();
                                this.$message.success(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val;
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
.datechoose {
    float: right;
}
</style>
