<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础数据管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>企业管理</el-breadcrumb-item>
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
                :data="showData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- 复选框 -->
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <!-- 企业名称 -->
                <el-table-column prop="enterprise_name" label="企业名称" align="center"></el-table-column>
                <!-- 行业名称 -->
                <el-table-column prop="industry_name" label="行业名称" align="center"></el-table-column>
                <!-- 联系人 -->
                <el-table-column prop="contact" label="联系人" align="center"></el-table-column>
                <!-- 联系电话 -->
                <el-table-column prop="contact_phone" label="联系电话" align="center"></el-table-column>
                <!-- 邮箱 -->
                <el-table-column prop="contact_email" label="邮箱" align="center"></el-table-column>
                <!-- 地址 -->
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
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
        <el-dialog
            :title="isAdd?'新增':'编辑'"
            :visible.sync="editVisible"
            width="30%"
            class="demo-ruleForm"
        >
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="企业名称" prop="enterprise_name" v-if="isAdd === true">
                    <el-input v-model="form.enterprise_name"></el-input>
                </el-form-item>
                <el-form-item label="行业" prop="industry_id">
                    <el-select v-model="form.industry_id" placeholder="请选择行业">
                        <el-option
                            v-for="industry in industrys"
                            :label="industry.industry_name"
                            :value="industry.id"
                            :key="industry.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="form.contact"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="contact_phone">
                    <el-input v-model="form.contact_phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="contact_email">
                    <el-input v-model="form.contact_email"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="Confirm('form') ">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Enterprise',
    data() {
        return {
            industrys: [],
            keyword: '',
            tableData: [],
            showData: [],
            query: {
                msg: '', //关键字
                pageIndex: 1, //当前页数
                pageSize: 10 //每页显示个数选择器的选项设置
            },
            editVisible: false,
            pageTotal: 0,
            form: {},
            rules: {
                enterprise_name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' },
                    { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
                ],
                industry_id: [{ required: true, message: '请选择行业', trigger: 'change' }],
                contact: [
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                    { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
                ],
                contact_phone: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                    { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
                ],
                contact_email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                    { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
                ]
            },
            isAdd: true,
            idx: 1,
            checkdelete: false
            // rules: {
            //     enterprise_name: [
            //         { required: true, message: '请输入企业名称', trigger: 'blur' },
            //         { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
            //     ],
            //     industry_id: [{ required: true, message: '请选择行业', trigger: 'change' }],
            //     contact: [{ min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }],
            //     contact_phone: [{ min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }],
            //     contact_email: [{ min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }],
            //     address: [{ min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }]
            // }
        };
    },
    created() {
        this.getData();
        this.getIndustries();
    },

    methods: {
        //获取行业选项
        getIndustries() {
            this.$axios
                .get('/dataSettings/Industry')
                .then(res => {
                    // console.log(res.data);
                    this.industrys = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        // 获取数据
        getData() {
            this.$axios
                .get('/dataSettings/Enterprise')
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
        //获取企业关联设备信息、用户信息判断是否可以删除
        async getEnterpriseDeviceUser(id) {
            await this.$axios.post('/dataSettings/checkEnterpriseID', { id: id }).then(res => {
                console.log(res.data);

                if (res.data !== 0) {
                    this.checkdelete = false;
                    console.log('>>>>>>>>>');
                } else {
                    this.checkdelete = true;
                }
            });
        },

        // 删除操作
        async handleDelete(index, row) {
            await this.getEnterpriseDeviceUser(row.id);
            let flag = this.checkdelete;
            console.log(flag);

            if (!flag) {
                this.$message.error('有企业关联设备或用户，请解除关联后删除！');
            } else {
                // 二次确认删除
                this.$('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        let query = {
                            id: row.id
                        };
                        this.$axios
                            .post('/dataSettings/DeleteEnterprise', query)
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
            }
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
                enterprise_name: '',
                industry_id: ''
            };
        },
        //获取企业名称列表
        getenterpriselist() {
            let list = [];
            this.tableData.forEach(element => {
                list.push(element.enterprise_name);
            });
            return list;
        },

        //添加确认
        Confirm(formName) {
            // if (this.form.enterprise_name === '' || this.form.enterprise_name === null) {
            //     this.$message.error(`企业名称不能为空`);
            // } else if (this.form.industry_id === '' || this.form.industry_id === null) {
            //     this.$message.error(`行业不能为空`);
            // } else {
            let arrylist = this.getenterpriselist();
            console.log(arrylist);

            // if (arrylist.indexOf(this.form.enterprise_name) !== -1) {
            //     this.$message.error(`企业名称不能重复`);
            // } else {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isAdd) {
                        // let date = new Date();
                        // this.form.created_time = date.getTime();
                        console.log(123);
                        this.$axios
                            .post('/dataSettings/AddEnterprise', this.form)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.success === true) {
                                    console.log(456);

                                    this.$message.success(res.data.message);
                                    this.getData();
                                } else {
                                    console.log(789);

                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        this.form.id = this.idx;
                        delete this.form['industry_name'];
                        delete this.form['created_time'];
                        // let date =new Date(this.form.created_time )
                        // this.form.created_time =  date.getTime();
                        this.$axios
                            .post('/dataSettings/updateEnterprise', this.form)
                            .then(res => {
                                if (res.data.success === true) {
                                    console.log(456);

                                    this.$message.success(res.data.message);
                                    this.getData();
                                } else {
                                    console.log(789);
                                    this.$refs[formName].resetFields();
                                    this.$message.error(res.data.message);
                                    this.getData();
                                }
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
            // this.idx = this.tableData[index + (this.pageIndex - 1) * this.pageSize].id;
            // delete row['industry_name'];
           this.form = JSON.parse(JSON.stringify(row));
            // delete this.form['industry_name']
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
