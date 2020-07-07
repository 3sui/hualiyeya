<!--
 * @Author: your name
 * @Date: 2020-06-03 15:08:38
 * @LastEditTime: 2020-06-29 14:22:12
 * @LastEditors: Please set LastEditors
 * @Description: 用户管理
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
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box d-flex jc-between">
                <el-button
                    type="primary"
                    class="handle-del mr10"
                    @click="AddData"
                    icon="el-icon-plus"
                >新增</el-button>
                <el-input
                    prefix-icon="el-icon-search"
                    v-model.trim="query.msg"
                    placeholder="请输入您需要搜素的内容"
                    class="handle-input mr10"
                    @input="handleSearch"
                ></el-input>
            </div>
            <!-- 表格列 -->
            <el-table
                :data="showData"
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
                    :filters="[{ text: '超级管理员', value: '超级管理员' }, { text: '企业管理员', value: '企业管理员' }, { text: '企业用户', value: '企业用户' }, { text: '维修工', value: '维修工' }]"
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
                        <!-- <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDealing(scope.$index, scope.row)"
                        >分配设备</el-button> -->
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
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="editVisible" width="30%" class="demo-ruleForm">
            <el-form ref="add" :rules="rules" :model="newUser" label-width="100px">
                <el-form-item label="所属企业" prop="enterprise_id">
                    <el-select
                        v-model="newUser.enterprise_id"
                        placeholder="请选择所属企业"
                        prop="enterprise_id"
                    >
                        <el-option
                            v-for="item in enterprises"
                            :label="item.enterprise_name"
                            :value="item.id"
                            :key="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号" prop="username">
                    <el-input v-model="newUser.username"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="nickname">
                    <el-input v-model="newUser.nickname"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="role">
                    <el-select v-model="newUser.role" placeholder="请选择权限角色">
                        <el-option
                            v-for="item in roles"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model.number="newUser.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
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
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                        :on-change="clickAvatarUpload"
                        accept=".jpg, .png, .jpeg"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="Confirm('add')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 权限弹出框 -->
        <el-dialog title="修改权限" :visible.sync="editVisibleAuth" width="30%" class="demo-ruleForm">
            <el-form ref="auth" :model="role" label-width="100px">
                <el-form-item label="权限等级">
                    <el-select v-model="role.id" placeholder="请选择修改权限">
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

        <!-- 分配设备弹出框 -->
        <el-dialog
            title="分配设备"
            :visible.sync="editVisibleDealing"
            width="40%"
            class="demo-ruleForm"
            center
            style="text-align: center;width: 100%"
        >
            <el-transfer
                :titles="['可分配设备', '已分配设备']"
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入设备名称/id"
                v-model="value"
                :data="data"
                style="text-align: left; display: inline-block;"
            ></el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="ConfirmDealing">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Authority',
    data() {
        return {
            data: [],
            value: [
                {
                    eq: '111115',
                    key: 0,
                    label: '设备6'
                }
            ],
            filterMethod(query, item) {
                return item.eq.indexOf(query) > -1 || item.label.indexOf(query) > -1;
            },
            dealingInfo: {},

            addNewUserId: '',
            roles: [],
            enterprises: [],
            keyword: '',
            tableData: [],
            showData: [],
            query: {
                msg: '', //关键字
                date: '', //筛选日期
                pageIndex: 1, //当前页数
                pageSize: 10 //每页显示个数选择器的选项设置
            },
            editVisible: false,
            editVisibleAuth: false,
            editVisibleDealing: false,
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
            url: '',
            rules: {
                enterprise_id: [
                    {
                        required: true,
                        message: '请选择企业',
                        trigger: 'change'
                    }
                ],
                username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                role: [
                    {
                        required: true,
                        message: '请选择权限',
                        trigger: 'change'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入正确的email地址',
                        trigger: 'blur'
                    }
                ],
                nickname: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    created() {
        this.getData();
    },
    components: {},

    computed: {},

    methods: {
        //获取页面所需数据
        getData() {
            axios({
                method: 'get',
                url: '/dataSettings/fetchAuthList'
            })
                .then(res => {
                    // window.console.log(res.data);
                    this.tableData = res.data.tableData;
                    this.showData = this.tableData.slice(
                        (this.query.pageIndex - 1) * this.query.pageSize,
                        this.query.pageIndex * this.query.pageSize
                    );
                    // this.$set(this.enterprises, 'enterprises', res.data.enterprises);
                    this.enterprises = res.data.enterprise;
                    this.roles = res.data.roles;
                    this.pageTotal = res.data.tableData.length;
                    // window.console.log(res.data);
                })
                .catch(err => {});
        },

        //修改权限操作
        handleEdit(index, row) {
            this.editVisibleAuth = true;
            this.role.name = row.name;
            this.role.id = row.role_id;
            this.role.user_id = row.id;
            window.console.log(index, row);
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

        //弹窗取消按钮
        Cancel() {
            this.editVisible = false;
            this.editVisibleAuth = false;
            this.editVisibleDealing = false;
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
            this.imageUrl = '';
        },

        //新增弹窗确定按钮
        Confirm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //分配设备按钮
        handleDealing(index, row) {
            window.console.log(index, row);
            this.editVisibleDealing = true;
            this.data = [];
            this.value = [];
            this.dealingInfo = row;
            axios({
                method: 'get',
                url: '/dataSettings/fetchDealing',
                params: {
                    id: row.id,
                    eid: row.enterprise_id
                }
            })
                .then(res => {
                    res.data.all.forEach((item, index) => {
                        this.data.push({
                            label: item.device_name,
                            key: item.id,
                            eq: item.eq
                        });
                    });
                    res.data.old.forEach((item, index) => {
                        this.value.push(item.id);
                    });
                    console.log(res.data);
                })
                .catch(err => {});
        },

        //分配弹窗确定
        ConfirmDealing() {
            console.log(this.dealingInfo);
            axios({
                method: 'post',
                url: '/dataSettings/dealingDevice',
                data: {
                    ids: this.value,
                    id: this.dealingInfo.id
                }
            })
                .then(res => {
                    if (res.data.success) {
                        this.$message.success(res.data.message);
                        this.editVisibleDealing = false;
                    }
                })
                .catch(err => {});
        },

        // 触发重置按钮
        refresh() {
            this.getData();
            this.keyword = '';
        },

        //删除操作
        handleDelete(index, row) {
            if(row.username===localStorage.username){
                this.$message.error('超级管理员不能删除自己的账号！'); 
            }else{

          
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
            }
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

        //点击上传图片
        clickAvatarUpload(file) {
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.newUser.avatar = file.name;
        },

        //文件上传前
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
        },

        //根据权限角色筛选
        filterRole(value, row) {
            return row.name === value;
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

        handlePageChange() {},
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
.demo-ruleForm .el-dialog__body {
    text-align: center;
}
.el-select {
    display: block !important;
}
</style>
