<!--
 * @Author: your name
 * @Date: 2020-05-07 15:48:38
 * @LastEditTime: 2020-05-07 16:38:34
 * @LastEditors: Please set LastEditors
 * @Description: 管理员视图
 * @FilePath: \vue-manage-system\src\components\view\EnterpriseView.vue
 -->
 <template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 管理员视图
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="navbar mb-20">
                <span class="active">设备分析</span>
                <span>行业分析</span>
                <span>故障分析</span>
                <span>收入分析</span>
            </div>
            <div class="schart-box">
                <!-- <div class="content-title">折线图</div> -->
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>
            <div class="product-status">
                <el-input v-model="query.name" placeholder="请输入关键字" class="handle-input mr10"></el-input>
                <el-select v-model="query.address" placeholder="请选择省" class="handle-select mr10">
                    <el-option key="1" label="江苏省" value="江苏省"></el-option>
                </el-select>
                <el-select v-model="query.address" placeholder="请选择市" class="handle-select mr10">
                    <el-option key="1" label="常州市" value="常州市"></el-option>
                </el-select>
                <el-select v-model="query.address" placeholder="请选择区" class="handle-select mr10">
                    <el-option key="1" label="天宁区" value="天宁区"></el-option>
                </el-select>
                <div class="block">
                    <el-date-picker
                        class="mr10"
                        v-model="value2"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                    ></el-date-picker>
                </div>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button
                    style="float: right"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleSearch"
                >导出</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="年"></el-table-column>
                <el-table-column prop="name" label="月份"></el-table-column>
                <el-table-column prop="name" label="企业名称"></el-table-column>
                <el-table-column prop="name" label="设备种类"></el-table-column>
                <el-table-column prop="name" label="设备名称"></el-table-column>
                <el-table-column prop="name" label="型号描述"></el-table-column>
                <el-table-column prop="name" label="已安装数量"></el-table-column>
                <el-table-column prop="name" label="安装地址(省)"></el-table-column>
                <el-table-column prop="name" label="安装地址(市)"></el-table-column>
                <el-table-column prop="name" label="安装地址(区)"></el-table-column>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
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
import Schart from 'vue-schart';
import { fetchData } from '../../api/index';

export default {
    name: 'EnterpriseView',
    data() {
        return {
            options2: {
                type: 'bar',
                title: {
                    text: 'xx企业设备分析'
                },
                bgColor: '#fff',
                labels: [1, 2, 3, 4, 5],
                datasets: [
                    {
                        label: '温度',
                        data: [234, 278, 270, 190, 230]
                    }
                ],
                // leftPadding: 50,
                // rightPadding: 50,
                width: '100%'
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            value1: '',
            value2: '',
            query: {
                address: '',
                name: '',
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

    components: {
        Schart
    },

    computed: {},
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
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
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>
 <style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    /* background-color: red; */
}
.navbar span {
    flex: 1;
    text-align: center;
    padding: 20px 50px;
    border: 1px solid #cdcdcd;
    /* background-color: green; */
}
.navbar span.active {
    background-color: #cdcdcd;
}
.schart-box {
    /* display: inline-block; */
    margin: 0 auto;
    width: 100%;
}
.schart {
    margin: 0 auto;

    width: 95%;
    height: 600px;
}
.mb-20 {
    margin-bottom: 20px;
}
.product-status {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}
.mt-10 {
    margin-bottom: 10px;
}
.mr10 {
    margin-right: 10px;
}
</style>
