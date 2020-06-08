<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 角色设置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    class="handle-del mr10"
                    @click="addRole"
                    icon="el-icon-plus"
                >新增</el-button>

                <el-input v-model="query.name" placeholder="名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <div class="block datechoose">
                    <span class="demonstration">创建日期</span>
                    &nbsp;
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </div>
            </div>

            <!-- 表格列 -->
            <el-table
                :data="tableData.slice((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- 复选框 -->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!-- 序号 -->
                <el-table-column prop="ID" label="序号" width="55" align="center"></el-table-column>
                <!-- 角色 -->
                <el-table-column prop="role" label="角色" align="center"></el-table-column>
                <!-- 角色描述 -->
                <el-table-column prop="roleDescription" label="角色描述" align="center"></el-table-column>
                <!-- 用户 -->
                <el-table-column prop="userList" label="用户" align="center"></el-table-column>
                <!-- 用户数 -->
                <el-table-column prop="userSum" label="用户数" align="center"></el-table-column>
                <!-- 创建时间 -->
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
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
                            @click="handleInfo(scope.$index, scope.row)"
                        >查看</el-button>
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
        <el-dialog title="新增/编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="角色名">
                    <el-input v-model="form.role"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="form.roleDescription"></el-input>
                </el-form-item>
                <el-divider>功能权限</el-divider>
                <label>请选择角色可使用功能</label>
                <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    default-expanded-all="true"
                    :default-checked-keys="[1,2,3,4,5,6,7,8,9,10,11,12,13,14]"
                    :props="defaultProps"
                ></el-tree>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="Confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData, deleteData, addData, updateData, searchData } from '../../api/index';
export default {
    name: 'RoleList',
    data() {
        return {
            //rightlist:this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()),
            data: [
                {
                    id: 1,
                    label: 'PC',
                    children: [
                        {
                            id: 2,
                            label: '用户地图',
                            children: [
                                {
                                    id: 3,
                                    label: '查询'
                                },
                                {
                                    id: 4,
                                    label: '导出'
                                }
                            ]
                        },
                        {
                            id: 5,
                            label: '设备档案'
                        },
                        {
                            id: 6,
                            label: '远程监控'
                        },
                        {
                            id: 7,
                            label: '服务手册'
                        },
                        {
                            id: 8,
                            label: '报警记录'
                        },
                        {
                            id: 9,
                            label: '交易分析'
                        },
                        {
                            id: 10,
                            label: '基础数据管理',
                            children: [
                                {
                                    id: 11,
                                    label: '数据字典'
                                },
                                {
                                    id: 12,
                                    label: '用户管理'
                                },
                                {
                                    id: 13,
                                    label: '角色管理'
                                },
                                {
                                    id: 14,
                                    label: '报警设置'
                                }
                            ]
                        }
                    ]
                }
            ],
            date: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            // delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            isAdd: true
            // id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取所有数据
        getData() {
            fetchData('getAllRoleList').then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = this.tableData.length;
            });
        },
         // 触发搜索按钮
        handleSearch(value) {
            if (value !== '') {
                let query = {
                    keyword: value
                };
                searchData('getRole', query).then(res => {
                    this.tableData = res.data;                 
                    this.pageTotal = this.tableData.length;
                });
            } else {
                this.getData();
            }
            
        },
    
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    let query = {
                        ID: row.ID
                    };
                    deleteData('deleteDataDictionaryByID', query).then(res => {
                        this.getData();
                    });
                    this.$message.success('删除成功');
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //处理权限
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },

        //添加确认
        Confirm() {
            if (this.form.role === '') {
                this.$message.error(`请输入必填项`);
            } else {
                if (this.isAdd) {
                    let query = {
                        role: this.form.role,
                        roleDescription: this.form.roleDescription,
                        right1: 1,
                        right2: 1,
                        right3: 1,
                        right4: 1,
                        right5: 1,
                        right6: 1,
                        right7: 1,
                        right8: 1,
                        right9: 1,
                        right10: 1,
                        right11: 1,
                        right12: 1,
                        right13: 1,
                        right14: 1
                    };

                    //console.log(query);
                    addData('/addRole', query)
                        .then(res => {
                            //console.log(res);
                            this.getData();
                        })
                        .catch(() => {});
                    this.editVisible = false;
                    this.$message.success('添加成功');
                } else {
                    let query = {
                        ID: this.form.ID,
                        role: this.form.role,
                        roleDescription: this.form.roleDescription,
                        right1: 1,
                        right2: 1,
                        right3: 1,
                        right4: 1,
                        right5: 1,
                        right6: 1,
                        right7: 1,
                        right8: 1,
                        right9: 1,
                        right10: 1,
                        right11: 1,
                        right12: 1,
                        right13: 1,
                        right14: 1
                    };
                    updateData('/updateDataDictionary', query)
                        .then(res => {
                            //console.log(res);
                            this.getData();
                        })
                        .catch(() => {});
                    this.editVisible = false;
                    this.$message.success('修改成功');
                }
                this.getData();
                this.form = {};
            }
        },
        //取消
        cancel() {
            this.editVisible = false;
            this.form = {};
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
            this.isAdd = false;
        },
        // delAllSelection() {
        //     const length = this.multipleSelection.length;
        //     let str = '';
        //     this.delList = this.delList.concat(this.multipleSelection);
        //     for (let i = 0; i < length; i++) {
        //         str += this.multipleSelection[i].name + ' ';
        //     }
        //     this.$message.error(`删除了${str}`);
        //     this.multipleSelection = [];
        // },

        // 保存编辑
        // saveEdit() {
        //     this.editVisible = false;
        //     this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        //     this.$set(this.tableData, this.idx, this.form);
        // },
        //新增角色
        addRole() {
            this.editVisible = true;
            this.isAdd = true;
        },
        // 分页导航
        handlePageChange(val) {
            // this.$set(this.query, 'pageIndex', val);
            // this.getData();
            this.query.pageIndex = val;
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
