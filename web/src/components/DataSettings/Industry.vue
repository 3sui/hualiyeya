<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>行业设置</el-breadcrumb-item>
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
                <el-input v-model="keyword" placeholder="行业名称" class="handle-input mr10"></el-input>
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
                <!-- 行业名称 -->
                <el-table-column prop="industry_name" label="行业名称" align="center"></el-table-column>
                <!-- 创建日期 -->
                <el-table-column prop="created_time" label="创建日期" align="center"></el-table-column>
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
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="isAdd?'新增':'编辑'" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="行业名称">
                    <el-input v-model="form.industry_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click=" Confirm ">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Industry',
    data() {
        return {
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
    },

    methods: {
        //获取当前时间

        // 获取数据
        getData() {
            this.$axios
                .get('/Industry')
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
                this.$axios.post('SearchIndustry', query).then(res => {
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
                    .post('DeleteIndustry', query)
                    .then(res => {
                    // console.log(res);
                    this.pageIndex=1
                    this.getData();
                    this.$message.success('删除成功');
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    
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
            this.form={
                is_deleted:0
            }
        },
        //添加确认
        Confirm() {
            if (this.form.industry_name === '' || this.form.industry_name === null) {
                this.$message.error(`行业名称不能为空`);
            } else if (this.form.industry_name.length > 128) {
                this.$message.error(`行业名称过长`);
            } else {
                if (this.isAdd) {
                    // this.query.industry_name=this.form.industry_name
                    let date = new Date();
                    this.form.created_time = date.getTime();
                    console.log(date);
                    this.$axios
                        .post('/AddIndustry', this.form)
                        .then(res => {
                            console.log(res.data);
                            this.getData();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.form.id = this.idx;
                     let date =new Date(this.form.created_time)
                    this.form.created_time =  date.getTime();
                    this.$axios
                        .post('/updateIndustry', this.form)
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
            this.form = row;
            this.editVisible = true;
            this.isAdd = false;
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
