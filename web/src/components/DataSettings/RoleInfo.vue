<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 基础数据管理 </el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box d-flex jc-between">
                <el-button type="primary" class="handle-del mr10" @click="AddData" icon="el-icon-plus"
                 v-if="opera.operation.indexOf('添加')>-1">新增</el-button>
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
            <el-table :data="showData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <!-- 复选框 -->
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <!-- 序号 -->
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <!-- 企业名称 -->
                <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
                <!-- 行业名称 -->
                <!-- <el-table-column prop="industry_name" label="行业名称" align="center"></el-table-column> -->
                <!-- 联系人 -->
                <!-- <el-table-column prop="contact" label="联系人" align="center"></el-table-column> -->
                <!-- 联系电话 -->
                <!-- <el-table-column prop="contact_phone" label="联系电话" align="center"></el-table-column> -->
                <!-- 邮箱 -->
                <!-- <el-table-column prop="contact_email" label="邮箱" align="center"></el-table-column> -->
                <!-- 地址 -->
                <!-- <el-table-column prop="address" label="地址" align="center"></el-table-column> -->
                <!-- 创建日期 -->
                <el-table-column prop="created_time" label="创建日期" align="center">
                    <template slot-scope="scope">{{ scope.row.created_time | convertTime('YYYY-MM-DD HH:mm') }}</template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" width="460" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="14" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"
                         v-if="opera.operation.indexOf('修改')>-1">修改</el-button>
                        <el-button type="text" size="14" icon="el-icon-edit" @click="handleEditRole(scope.$index, scope.row)"
                         v-if="opera.operation.indexOf('修改')>-1">菜单设置</el-button>
                        <el-button type="text" size="14" icon="el-icon-edit" @click="handleDataRight(scope.$index, scope.row)"
                         v-if="opera.operation.indexOf('修改')>-1">数据权限</el-button>
                        <!-- v-if="scope.row.id!==1" -->
                        <el-button type="text" size="14" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                         v-if="opera.operation.indexOf('删除')>-1"
                            >删除</el-button
                        >
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
        <el-dialog :title="isAdd ? '新增' : '编辑'" :visible.sync="editVisible" width="30%" class="demo-ruleForm">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="菜单权限">
                    <el-tree :data="menu" show-checkbox node-key="index" :props="defaultProps" ref="tree" @check-change="CheckChange"> </el-tree>
                </el-form-item> -->
                <!-- <el-form-item label="行业" prop="industry_id">
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
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="Confirm('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="菜单设置" :visible.sync="editVisible1" width="30%" class="demo-ruleForm">
            <el-form ref="roleform" :model="roleform" label-width="100px">
                <el-form-item label="菜单设置">
                    <el-tree
                        :data="menu"
                        show-checkbox
                        node-key="index"
                        :props="defaultProps"
                        default-expand-all
                        ref="tree"
                        @check-change="CheckChange"
                        :default-checked-keys="rights"
                    >
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="ConfirmEditRight('roleform')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="数据权限" :visible.sync="editVisible2" width="30%" class="demo-ruleForm">
            <el-form ref="datarightform" :model="datarightform" label-width="100px">
                <el-form-item label="查看权限">
                    <el-radio-group v-model="read">
                        <el-radio label="查看"></el-radio>
                        <el-radio label="查看所有"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="操作权限">
                    <el-checkbox-group v-model="operation">
                        <el-checkbox v-for="operation in operations" :label="operation" :key="operation">{{ operation }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="ConfirmEditDataRight('datarightform')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'RoleInfo',
    data() {
        return {
            // industrys: [],
            keyword: '',
            tableData: [],
            showData: [],
            query: {
                msg: '', //关键字
                pageIndex: 1, //当前页数
                pageSize: 10 //每页显示个数选择器的选项设置
            },
            editVisible: false,
            editVisible1: false,
            editVisible2: false,
            pageTotal: 0,
            form: {},
            roleform: {},
            datarightform: {},
            read: '',
            operation: [],
            isIndeterminate: true,
            checkAll: '',
            operations: ['添加', '删除', '修改'],
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
                ]
            },
            isAdd: true,
            idx: 1,
            checkdelete: false,

            defaultProps: {
                children: 'subs',
                label: 'title'
            },
            menu: [
                {
                    index: 'dashboard',
                    title: '主页'
                },
                {
                    index: 'map',
                    title: '用户地图'
                },
                {
                    index: 'devicebook',
                    title: '设备档案',
                    subs: [
                        {
                            index: 'DeviceList',
                            title: '设备列表'
                        },
                        {
                            index: 'MaintenanceRecords',
                            title: '维修记录'
                        }
                    ]
                },
                {
                    index: 'remotemonitor',
                    title: '远程监控',
                    subs: [
                        {
                            index: 'EquipmentMonitoring',
                            title: '设备监控'
                        },
                        {
                            index: 'AlarmRecord',
                            title: '报警记录'
                        }
                    ]
                },
                {
                    index: 'analysiscenter',
                    title: '分析中心',
                    subs: [
                        {
                            index: 'DeviceAnalysis',
                            title: '设备分析'
                        },
                        {
                            index: 'IndustryAnalysis',
                            title: '行业分析'
                        },
                        {
                            index: 'FaultAnalysis',
                            title: '故障分析'
                        }
                    ]
                },
                {
                    index: 'datasetting',
                    title: '基础数据管理',
                    subs: [
                        {
                            index: 'Industry',
                            title: '行业设置'
                        },
                        {
                            index: 'DeviceType',
                            title: '设备类型'
                        },
                        {
                            index: 'FaultType',
                            title: '故障类型'
                        },
                        {
                            index: 'Enterprise',
                            title: '企业管理'
                        },
                        {
                            index: 'RoleInfo',
                            title: '角色管理'
                        },

                        {
                            index: 'Authority',
                            title: '用户管理'
                        }
                    ]
                },
                {
                    index: 'DeviceManage',
                    title: '设备管理(手机端)'
                },
                  {
                    index: 'DeviceAlarm',
                    title: '设备报警(手机端)'
                },
                  {
                    index: 'RepairRecord',
                    title: '维修记录(手机端)'
                },
                  {
                    index: 'NewRepairRecord',
                    title: '新建工单(手机端)'
                },
                  {
                    index: 'Settings',
                    title: '设置(手机端)'
                },
            ],
            rights: [],
            opera:{
                read:"",
                operation:"",
            }

        };
    },
    created() {
        this.getData();
        this.opera.read=window.localStorage.read;
        this.opera.operation=window.localStorage.operation;
        // this.getIndustries();
    },

    methods: {
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        getData() {
            this.$axios
                .get('/dataSettings/RoleInfo')
                .then((res) => {
                    this.tableData = res.data;
                    this.showData = this.tableData.slice(
                        (this.query.pageIndex - 1) * this.query.pageSize,
                        this.query.pageIndex * this.query.pageSize
                    );
                    this.pageTotal = res.data.length;
                    window.console.log(res.data);
                })
                .catch((err) => {
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
        async getRoleUser(id) {
            await this.$axios.post('/dataSettings/checkRoleID', { id: id }).then((res) => {
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
            await this.getRoleUser(row.id);
            let flag = this.checkdelete;
            console.log(flag);

            if (!flag) {
                this.$message.error('该角色有关联用户，请解除关联后删除！');
            } else {
                console.log(1111);
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', { type: 'warning' })
                    .then(() => {
                        let query = {
                            id: row.id
                        };
                        this.$axios
                            .post('/dataSettings/DeleteRole', query)
                            .then((res) => {
                                // console.log(res);
                                this.pageIndex = 1;
                                this.getData();
                                this.$message.success('删除成功');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        // 多选操作
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        // },

        //添加操作
        AddData() {
            this.editVisible = true;
            this.isAdd = true;
            this.form = {
                // is_deleted: 0
                name: ''
                // industry_id: ''
            };
        },
        //获取角色名称列表
        getrolelist() {
            let list = [];
            this.tableData.forEach((element) => {
                list.push(element.name);
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
            // this.getCheckedNodes();
            // this.getCheckedKeys();

            let arrylist = this.getrolelist();
            console.log(arrylist);

            // if (arrylist.indexOf(this.form.enterprise_name) !== -1) {
            //     this.$message.error(`企业名称不能重复`);
            // } else {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.isAdd) {
                        // let date = new Date();
                        // this.form.created_time = date.getTime();
                        console.log(123);
                        this.$axios
                            .post('/dataSettings/AddRole', this.form)
                            .then((res) => {
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
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        this.form.id = this.idx;
                        // delete this.form['name'];
                        // delete this.form['created_time'];
                        // delete this.form['updated_time'];

                        // let date =new Date(this.form.created_time )
                        // this.form.created_time =  date.getTime();
                        this.$axios
                            .post('/dataSettings/UpdateRole', this.form)
                            .then((res) => {
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
                            .catch((err) => {
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
            this.editVisible1 = false;
            this.editVisible2 = false;
            this.rights = [];
            this.read = '';
            this.operation = [];
            this.form = {};
            this.datarightform = {};
            this.roleform = {};
            this.getData();
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = row.id;
            this.form = JSON.parse(JSON.stringify(row));
            this.editVisible = true;
            this.isAdd = false;
        },

        handleEditRole(index, row) {
            this.idx = row.id;
            this.roleform = JSON.parse(JSON.stringify(row));

            if (this.roleform.rights) {
                this.rights = this.roleform.rights.split(',');
            } else {
                this.rights = [];
            }
            this.editVisible1 = true;

            this.$refs.tree.setCheckedKeys([]);
            this.$refs.tree.setCheckedKeys(this.rights);
        },

        handleDataRight(index, row) {
            this.idx = row.id;
            this.datarightform = JSON.parse(JSON.stringify(row));
            this.editVisible2 = true;
            this.read = this.datarightform.read;
            if (this.datarightform.operation.length > 0) {
                this.operation = this.datarightform.operation.split(',');
            } else {
                this.operation = [];
            }
        },

        // 分页导航
        handlePageChange(val) {
            window.console.log(val);
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },

        //选择菜单
        // getCheckedNodes() {
        //     console.log(this.$refs.tree.getCheckedNodes());
        // },
        // getCheckedKeys() {
        //     console.log(this.$refs.tree.getCheckedKeys());
        // },
        CheckChange(a, b, c) {
            if (b) {
                this.rights.push(a.index);
            } else {
                let index = this.rights.indexOf(a.index);
                console.log(index);
                if (index >= 0) {
                    this.rights.splice(index, 1);
                }
            }
        },
        ConfirmEditRight(formName) {
            this.roleform.id = this.idx;
            let right = Array.from(new Set(this.rights));
            console.log(right);
            this.roleform.rights = right.toString();
            this.$axios
                .post('/dataSettings/UpdateRoleright', this.roleform)
                .then((res) => {
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
                    this.Cancel()
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        ConfirmEditDataRight(formName) {
            this.datarightform.id = this.idx;
            this.datarightform.read = this.read;
            this.datarightform.operation = this.operation.toString();
            this.$axios
                .post('/dataSettings/UpdateRoleright', this.datarightform)
                .then((res) => {
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
                   this.Cancel();
                })
                .catch((err) => {
                    console.log(err);
                });
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
