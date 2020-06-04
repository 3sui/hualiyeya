<!--
 * @Author: your name
 * @Date: 2020-06-03 15:08:38
 * @LastEditTime: 2020-06-03 17:47:04
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
                <el-button type="primary" class="handle-del mr10" icon="el-icon-plus">新增</el-button>
                <el-input v-model="keyword" placeholder="企业名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
                <el-table-column prop="created_time" label="修改日期" align="center"></el-table-column>
                <el-table-column prop="name" label="权限等级" align="center"></el-table-column>

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
        <el-dialog :title="'权限更改'" :visible.sync="editVisible" width="30%" class="demo-ruleForm">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="权限">
                    <el-select v-model="form.role" placeholder="请选择权限角色">
                        <el-option
                            v-for="item in roles"
                            :label="item.name"
                            :value="item.id"
                            :key="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="Confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Authority',
    data() {
        return {
            roles: [],
            keyword: '',
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            pageIndex: 1,
            pageSize: 10,
            form: {
                role: ''
            },
            isAdd: true,
            idx: 1
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
                    this.tableData = res.data.tableData;
                    this.roles = res.data.roles;
                    window.console.log(res.data);
                })
                .catch(err => {});
        },
        handleEdit(index, row) {
            this.editVisible = true;
            this.form.role = row.name;
            window.console.log(index, row);
        },
        handleDelete() {},
        handlePageChange() {},
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //弹窗取消按钮
        Cancel() {
            this.editVisible = false;
        },

        //弹窗确定按钮
        Confirm() {}
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