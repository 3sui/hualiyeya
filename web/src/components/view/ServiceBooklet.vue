<!--
 * @Author: your name
 * @Date: 2020-05-07 14:21:47
 * @LastEditTime: 2020-05-18 10:20:47
 * @LastEditors: Please set LastEditors
 * @Description: 服务手册
 * @FilePath: \vue-manage-system\src\components\view\ServiceBooklet.vue
 -->
<!--  -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 服务手册
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button
                type="primary"
                icon="el-icon-plus"
                class="handle-del mr10 mb-30"
                @click="editVisible = true"
            >添加</el-button>
            <!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10 mb-30">导入</el-button> -->
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item
                    v-for="(item, index) in tableData"
                    :key="index"
                    :title="Object.keys(item)[0]"
                    :name="index"
                >
                    <table>
                        <thead>
                            <tr>
                                <th>可能产生的原因</th>
                                <th>排除办法</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item2, index2) in item[Object.keys(item)[0]]" :key="index2">
                            <tr>
                                <td>{{item2.reason}}</td>
                                <td>{{item2.function}}</td>
                                <td>
                                    <el-button
                                        type="primary"
                                        plain
                                        size="small"
                                        @click="() => {
                                            editVisible2 = true
                                            form2 = item2
                                        }"
                                    >编辑</el-button>
                                    <el-button
                                        type="primary"
                                        plain
                                        size="small"
                                        @click="deleteBooklet(item2)"
                                    >删除</el-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-collapse-item>
            </el-collapse>
        </div>

        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="故障现象">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="可能产生的原因">
                    <el-input v-model="form.reason"></el-input>
                </el-form-item>
                <el-form-item label="排除方法">
                    <el-input v-model="form.function"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="editVisible2" width="30%">
            <el-form ref="form" :model="form2" label-width="130px">
                <el-form-item label="可能产生的原因">
                    <el-input v-model="form2.reason"></el-input>
                </el-form-item>
                <el-form-item label="排除方法">
                    <el-input v-model="form2.function"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="changeBooklet">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ServiceBooklet',
    data() {
        return {
            editVisible: false,
            activeName: 0,
            tableData: [],
            form: {},
            form2: {},
            editVisible2: false
        };
    },

    components: {},

    computed: {},
    created() {
        this.fetchBooklet();
    },
    methods: {
        fetchBooklet() {
            axios({
                method: 'get',
                url: '/fetchBooklet'
            })
                .then(result => {
                    window.console.log(result.data);
                    let arr = [];
                    let a = false;
                    for (let i in result.data) {
                        let obj = {};

                        for (let j in arr) {
                            if (result.data[i].type === Object.keys(arr[j])[0]) {
                                window.console.log(arr[j]);
                                arr[j][result.data[i].type].push({
                                    function: result.data[i].function,
                                    id: result.data[i].id,
                                    reason: result.data[i].reason
                                });
                                a = true;
                            }
                        }
                        if (a) {
                            a = false;

                            continue;
                        }
                        obj[result.data[i].type] = [];
                        obj[result.data[i].type].push({
                            function: result.data[i].function,
                            id: result.data[i].id,
                            reason: result.data[i].reason
                        });
                        arr.push(obj);
                    }
                    window.console.log(arr);
                    this.tableData = arr;
                })
                .catch(err => {});
        },
        saveEdit() {
            this.editVisible = false;
            axios({
                method: 'post',
                url: '/addNewBooklet',
                data: this.form
            })
                .then(res => {
                    window.console.log(res.data);
                    this.fetchBooklet();
                })
                .catch(err => {});
        },

        deleteBooklet(a) {
            window.console.log(a);
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    axios({
                        method: 'get',
                        url: '/deleteBooklet',
                        params: {
                            id: a.id
                        }
                    })
                        .then(res => {
                            this.$message({
                                type: 'success',
                                message: res.data
                            });
                            this.fetchBooklet();
                        })
                        .catch(err => {});
                })
                .catch(err => {});
        },

        changeBooklet() {
            axios({
                method: 'post',
                url: '/changeBooklet',
                data: {
                    data: this.form2
                }
            })
                .then(res => {
                    window.console.log(res.data);
                    this.fetchBooklet();
                    this.editVisible2 = false;
                })
                .catch(err => {});
        }
    }
};
</script>
<style scoped>
th {
    background-color: #eef1f6;
    padding: 5px 15px;
}
td {
    padding: 5px 15px;
}
table {
    margin: 0 auto;
    width: 90%;
    /* border: 1px solid #cdcdcd; */
    text-align: center;
}
.mb-30 {
    margin-bottom: 30px;
}
</style>