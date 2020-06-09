<!--
 * @Author: your name
 * @Date: 2020-06-03 15:08:38
 * @LastEditTime: 2020-06-08 17:13:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\src\components\DataSettings\Authority.vue
--> 
<!--  -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
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
                <el-input v-model="keyword" placeholder="企业/账号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                <el-table-column prop="username" label="账号" align="center"></el-table-column>
                <el-table-column prop="nickname" label="名称" align="center"></el-table-column>
                <el-table-column prop="enterprise_name" label="企业" align="center"></el-table-column>

                <!-- 创建日期 -->
                <el-table-column label="修改日期" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.created_time | convertTime('YYYY-MM-DD HH:mm')}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="权限等级"
                    align="center"
                    :filters="[{ text: '超级管理员', value: '超级管理员' }, { text: '企业管理员', value: '企业管理员' }, { text: '企业用户', value: '企业用户' }]"
                    :filter-method="filterRole"
                    filter-placement="bottom-end"
                ></el-table-column>

                <!-- 操作 -->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >修改权限</el-button>
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
                        <!-- <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>-->
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

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="editVisible" width="30%" class="demo-ruleForm">
            <el-form ref="add" :model="newUser" label-width="100px">
                <el-form-item label="所属企业">
                    <el-select v-model="newUser.enterprise_id" placeholder="请选择所属企业">
                        <el-option
                            v-for="item in enterprises"
                            :label="item.enterprise_name"
                            :value="item.id"
                            :key="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="newUser.username"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="newUser.nickname"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="newUser.role" placeholder="请选择权限角色">
                        <el-option
                            v-for="item in roles"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="newUser.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="newUser.email"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload
                        class="avatar-uploader"
                        ref="uploadAvatar"
                        :data="{id:addNewUserId}"
                        :action="axios.defaults.baseURL + '/dataSettings/addNewUserAvatar'"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                        :on-change="clickAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="Confirm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 权限弹出框 -->
        <el-dialog title="修改权限" :visible.sync="editVisibleAuth" width="30%" class="demo-ruleForm">
            <el-form ref="auth" :model="role" label-width="100px">
                <el-form-item label="所属企业">
                    <el-select v-model="role.id" placeholder="请选择所属企业">
                        <el-option
                            v-for="item in roles"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="ConfirmAuth">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Authority',
    data() {
        return {
            addNewUserId: '',
            roles: [],
            enterprises: [],
            keyword: '',
            tableData: [],
            editVisible: false,
            editVisibleAuth: false,
            pageTotal: 0,
            pageIndex: 1,
            pageSize: 10,
            newUser: {
                enterprise_id: '',
                username: '',
                nickname: '',
                role: '',
                phone: '',
                email: '',
                avatar: ''
            },
            role: {
                id: '',
                name: '',
                user_id: ''
            },

            isAdd: true,
            idx: 1,
            imageUrl: '',
            url: ''
        };
    },
    created() {
        this.getData();
    },
    components: {},

    computed: {},

    methods: {
        getData() {
            axios({
                method: 'get',
                url: '/dataSettings/fetchAuthList'
            })
                .then(res => {
                    if (res.data.success) {
                        this.tableData = res.data.tableData;
                        this.roles = res.data.roles;
                        this.enterprises = res.data.enterprise;
                        window.console.log(res.data);
                        this.pageTotal = this.tableData.length;
                    }
                })
                .catch(err => {});
        },
        handleEdit(index, row) {
            this.editVisibleAuth = true;
            this.role.name = row.name;
            this.role.id = row.role_id;
            this.role.user_id = row.id;
            window.console.log(index, row);
        },
        handlePageChange() {},
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //弹窗取消按钮
        Cancel() {
            this.editVisible = false;
            this.editVisibleAuth = false;
        },
        //新增操作
        AddData() {
            this.editVisible = true;
            this.newUser = {
                enterprise_id: '',
                username: '',
                nickname: '',
                role: '',
                phone: '',
                email: '',
                avatar: ''
            };
        },

        //新增弹窗确定按钮
        Confirm() {
            axios({
                method: 'post',
                url: '/dataSettings/addNewUser',
                data: this.newUser
            })
                .then(res => {
                    if (res.data.success) {
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                        this.addNewUserId = res.data.id;
                        this.editVisible = false;
                        this.getData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                })
                .then(res => {
                    this.$refs.uploadAvatar.submit();
                })
                .catch(err => {});
        },

        //权限弹窗确定按钮
        ConfirmAuth() {
            axios({
                method: 'post',
                url: '/dataSettings/changeAuth',
                data: this.role
            })
                .then(res => {
                    if (res.data.success) {
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                        this.editVisibleAuth = false;
                        this.getData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                })
                .catch(err => {});
        },
        //根据权限角色筛选
        filterRole(value, row) {
            return row.name === value;
        },

        // 触发搜索按钮
        handleSearch() {
            this.tableData = this.tableData.filter((item, index) => {
                // return item.Address == '竹林北路256号';
                for (let key in item) {
                    // window.console.log(i, item[i]);
                    if ((item[key] + '').includes(this.keyword)) {
                        return true;
                    }
                }
            });
        },

        // 触发重置按钮
        refresh() {
            this.getData();
            this.keyword = '';
        },

        //删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    window.console.log(row.id);
                    let query = {
                        id: row.id
                    };
                    this.$axios
                        .post('/dataSettings/DeleteUserInfo', query)
                        .then(res => {
                            // console.log(res);
                            if (res.data.success) {
                                this.pageIndex = 1;
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
        //重置密码
        handleReset(index, row) {
            this.$confirm('确定要重置吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    let query = {
                        id: row.id
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

        //
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        clickAvatarUpload(file) {
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.newUser.avatar = file.name;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>