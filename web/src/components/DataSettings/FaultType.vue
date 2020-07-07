<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>故障类型</el-breadcrumb-item>
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
                <!-- 故障种类 -->
                <el-table-column prop="fault_type" label="故障种类" align="center"></el-table-column>
                <!-- 故障现象 -->
                <el-table-column prop="fault_phenomenon" label="故障现象" align="center"></el-table-column>
                <!-- 创建日期 -->
                <el-table-column prop="created_time" label="创建日期" align="center">
                    <template
                        slot-scope="scope"
                    >{{scope.row.created_time | convertTime('YYYY-MM-DD HH:mm')}}</template>
                </el-table-column>
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
        <el-dialog :title="isAdd?'新增':'编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item
                    label="故障种类"
                    prop="fault_type"
                    :rules="{required: true, message: '请输入故障种类', trigger: 'blur'}"
                >
                    <el-input v-model="form.fault_type"></el-input>
                </el-form-item>
                <el-form-item
                    label="故障现象"
                    prop="fault_phenomenon"
                    :rules="{required: true, message: '请输入故障现象', trigger: 'blur'}"
                >
                    <el-input v-model="form.fault_phenomenon"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="Confirm('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'FaultType',
    data() {
        return {
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
            pageTotal: 0,
            pageIndex: 1,
            pageSize: 10,
            form: {},
            isAdd: true,
            idx: 1,
            checkdelete: false
        };
    },
    created() {
        this.getData();
    },

    methods: {
        //获取当前时间

        // 获取数据
        getData() {
            this.$axios
                .get('/dataSettings/FaultType')
                .then(res => {
                    this.tableData = res.data;
                    this.showData = this.tableData.slice(
                        (this.query.pageIndex - 1) * this.query.pageSize,
                        this.query.pageIndex * this.query.pageSize
                    );
                    this.pageTotal = res.data.length;
                    window.console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 触发搜索按钮
        handleSearch(value) {
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
       
            
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        let query = {
                            id: row.id
                        };
                        this.$axios.post('/dataSettings/DeleteFaultType', query).then(res => {
                            //console.log(res);
                            this.pageIndex = 1;
                            this.getData();
                            this.$message.success('删除成功');
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
                // is_deleted: 0
                fault_type: '',
                fault_phenomenon: ''
            };
        },
        //添加确认
        Confirm(formName) {
            // if (
            //     this.form.fault_type === '' ||
            //     this.form.fault_type === null ||
            //     this.form.fault_phenomenon === '' ||
            //     this.form.fault_phenomenon === null
            // ) {
            //     this.$message.error(`故障类型、故障现象不能为空`);
            // } else if (this.form.fault_type.length > 128) {
            //     this.$message.error(`故障类型过长`);
            // } else if (this.form.fault_phenomenon.length > 1024) {
            //     this.$message.error(`故障现象过长`);
            // } else {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isAdd) {
                        // let date = new Date();
                        // this.form.created_time = date.getTime();
                        // console.log(date);
                        this.$axios
                            .post('/dataSettings/AddFaultType', this.form)
                            .then(res => {
                                console.log(res.data);
                                this.getData();
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        this.form.id = this.idx;
                        delete this.form['created_time'];
                        //  let date =new Date(this.form.created_time )
                        // this.form.created_time =  date.getTime();
                        this.$axios
                            .post('/dataSettings/updateFaultType', this.form)
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

            // }
        },
        //取消
        Cancel() {
            this.editVisible = false;
            this.form = {};
            this.getData();
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = row.id;
            this.form = JSON.parse(JSON.stringify(row));
            this.editVisible = true;
            this.isAdd = false;
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
.datechoose {
    float: right;
}
</style>
