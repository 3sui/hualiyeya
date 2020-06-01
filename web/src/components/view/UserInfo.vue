<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    class="handle-del mr10"
                    @click="addUser"
                    icon="el-icon-plus"
                >新增</el-button>
            </div>
            <div class="handle-box">
                <el-row>
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="请选择角色">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="value" placeholder="请选择行业大类">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="4">
                        <el-input v-model="query.name" placeholder="名称"></el-input>
                    </el-col>
                    <el-col :span="2">
                        <div class="demonstration">创建日期</div>
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </el-col>
                </el-row>
            </div>

            <!-- 表格列 -->
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- 复选框 -->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!-- 序号 -->
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <!-- 用户账号 -->
                <el-table-column prop="account" label="用户账号" align="center"></el-table-column>
                <!-- 会员姓名 -->
                <el-table-column prop="userName" label="会员姓名" align="center"></el-table-column>
                <!-- 用户组 -->
                <el-table-column prop="userTeam" label="用户组" align="center"></el-table-column>
                <!-- 企业名称 -->
                <el-table-column prop="company" label="企业名称" align="center"></el-table-column>
                <!-- 手机号码 -->
                <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
                <!-- 邮箱 -->
                <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                <!-- 注册日期 -->
                <el-table-column prop="registrationDate" label="注册日期" align="center"></el-table-column>
                <!-- 所属行业大类 -->
                <el-table-column prop="industry" label="所属行业大类" align="center"></el-table-column>
                <!-- 供应设备种类 -->
                <el-table-column prop="deviceType" label="供应设备种类" align="center"></el-table-column>
                <!-- 所属角色 -->
                <el-table-column prop="role" label="所属角色" align="center"></el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            @click="handleEdit(scope.$index, scope.row)"
                        >详情</el-button>
                        <el-button
                            type="text"
                            class="green"
                            @click="handleChange(scope.$index, scope.row)"
                        >启用</el-button>
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
        <el-dialog title="新增/编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="用户组">
                    <el-select v-model="formInline.role" placeholder="请选择">
                        <el-option label="企业用户" value="company"></el-option>
                        <el-option label="系统管理员" value="system"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="*用户账号">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="*会员姓名">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="*企业明层">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="*手机号码">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="*邮箱">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="*所属行业大类">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="*设备供应种类">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="*所属角色">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

                <el-form-item label="*登录密码">
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
import { fetchData } from '../../api/index';
export default {
    name: 'UserInfo',
    data() {
        return {
            formInline: {},
            query: {
                id: 0,
                account: '',
                userName: '',
                userTeam: '',
                company: '',
                phone: '',
                email: '',
                registrationDate: '',
                industry: '',
                deviceType: '',
                role: '',
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
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.userlist;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleChange(index, row) {
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
        //新增用户
        addUser() {
            this.editVisible = true;
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

.table {
    width: 100%;
    font-size: 14px;
}
.green {
    color: green;
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
    display: inline;
}
.demonstration {
    text-align: center;
    padding: 3px 0;
}
</style>
