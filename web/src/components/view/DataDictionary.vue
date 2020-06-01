<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 数据字典
                </el-breadcrumb-item>
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
                <el-input v-model="keyword" placeholder="名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch(keyword)">搜索</el-button>

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
                <!-- 分类 -->
                <el-table-column prop="classification" label="分类" align="center"></el-table-column>
                <!-- 名称 -->
                <el-table-column prop="keyname" label="名称" align="center"></el-table-column>
                <!-- 描述 -->
                <el-table-column prop="description" label="描述" align="center"></el-table-column>
                <!-- 创建日期 -->
                <el-table-column prop="createtime" label="创建日期" align="center"></el-table-column>
                <!-- 创建人 -->
                <el-table-column prop="createuser" label="创建人" align="center"></el-table-column>

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
        <el-dialog title="新增/编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="*选择分类">
                    <el-select v-model="form.classification" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="*名称">
                    <el-input v-model="form.keyname"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click=" Confirm ">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData, deleteData, addData, updateData, searchData } from '../../api/index';
export default {
    name: 'DataDictionary',
    data() {
        return {
            options: [
                {
                    value: '客户行业',
                    label: '客户行业'
                },
                {
                    value: '企业行业',
                    label: '企业行业'
                },
                {
                    value: '故障类型',
                    label: '故障类型'
                },
                {
                    value: '故障现象',
                    label: '故障现象'
                },
                {
                    value: '设备种类',
                    label: '设备种类'
                },
                {
                    value: '设备名称',
                    label: '设备名称'
                },
                {
                    value: '型号描述',
                    label: '型号描述'
                }
            ],
            date: '',
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            keyword: '',
            tableData: [],
          
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            isAdd: true
        };
    },
    created() {
        this.getData();
    },
   
    methods: {
      

        // 获取数据
        getData() {
            fetchData('getAllDataDictionary').then(res => {
                //console.log(res);
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
                searchData('getDataDictionary', query).then(res => {
                   // console.log('ok');
                    this.tableData = res.data;
                 
                    this.pageTotal = this.tableData.length;
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
                        ID: row.ID
                    };
                    deleteData('deleteDataDictionaryByID', query).then(res => {
                        //console.log(res);
                        this.getData();
                        //this.tableData = res.data;
                        // this.pageTotal = res.pageTotal || 50;
                    });
                    this.$message.success('删除成功');
                    // this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        //添加操作
        AddData() {
            this.editVisible = true;
            this.isAdd = true;
        },
        //添加确认
        Confirm() {
            if (this.form.classification === '' || this.keyname === '') {
                this.$message.error(`请输入必填项`);
            } else {
                if (this.isAdd) {
                    let query = {
                        classification: this.form.classification,
                        keyname: this.form.keyname,
                        description: this.form.description,
                        createuser: localStorage.getItem('ms_username')
                    };

                    //console.log(query);
                    addData('/addDataDictionary', query)
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
                        classification: this.form.classification,
                        keyname: this.form.keyname,
                        description: this.form.description,
                        createuser: localStorage.getItem('ms_username')
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

        //过滤
        // filterBy(tableData, value) {
        //     return tableData.filter(function(tableData) {
        //         return tableData.keyname.match(value);
        //     });
        // },

        // 分页导航
        handlePageChange(val) {
           // this.$set(this.query, 'pageIndex', val);
           // this.getData();
           this.query.pageIndex=val;
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
