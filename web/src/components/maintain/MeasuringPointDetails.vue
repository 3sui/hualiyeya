<!--
 * @Author: your name
 * @Date: 2020-05-07 10:52:41
 * @LastEditTime: 2020-06-14 17:55:46
 * @LastEditors: Please set LastEditors
 * @Description: 测点详情
 * @FilePath: \vue-manage-system\src\components\view\MeasuringPointDetails.vue
 -->
 <template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 远程监控
                </el-breadcrumb-item>
                <el-breadcrumb-item>测点详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button
                type="primary"
                icon="el-icon-delete"
                class="handle-del mr10 mb-30"
                @click="$router.go(-1)"
            >返回</el-button>
            <div class="schart-container">
                <div class="schart-box" v-for="(item, index) in schart" :key="index">
                    <!-- <div class="content-title">折线图</div> -->
                    <schart class="schart" :canvasId="'schart' + index" :options="item"></schart>
                </div>
            </div>
            <!-- <div class="handle-box">
                <el-row>
                    <el-col :span="18">
                        <div class="product-status">
                            <el-input
                                v-model="query.name"
                                placeholder="请输入关键字"
                                class="handle-input mr10"
                            ></el-input>
                            <el-select
                                v-model="query.address"
                                placeholder="工作状态"
                                class="handle-select mr10"
                            >
                                <el-option key="1" label="运行中" value="运行中"></el-option>
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
                            <el-button style="float: right" type="primary" icon="el-icon-search" @click="handleSearch">导出</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>-->
            <el-table
                :data="tableData.info"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>-->
                <el-table-column prop="eq" label="设备ID"></el-table-column>
                <el-table-column
                    :prop="item.cp_id"
                    :label="item.cp_name"
                    v-for="(item, index) in tableData.delimit"
                    :key="index"
                >
                    <template slot-scope="scope">
                        <div>{{scope.row[item.cp_id] * limit[item.cp_id].k}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="ts" label="数据时间">
                    <template slot-scope="scope">
                        <div>{{scope.row.ts | convertTime2('YYYY-MM-DD HH:mm:ss')}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>-->
        </div>
    </div>
</template>
 
<script>
import Schart from 'vue-schart';
import Moment from 'moment';

export default {
    name: 'MeasuringPointDetails',
    data() {
        return {
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
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
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            schart: [],
            value1: '',
            value2: '',
            limit: []
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
        getData() {
            let eq = this.$route.query.eq;
            window.console.log(eq);
            axios({
                method: 'get',
                url: '/maintain/fetchPointInfo',
                params: {
                    eq
                }
            })
                .then(res => {
                    window.console.log(res.data);
                    this.tableData = res.data;
                    let data = res.data;
                    let arr = {};
                    for (let i = 1; i < data.delimit.length + 1; i++) {
                        let a = 'cp' + i;
                        let b = 'option' + i;
                        let info = [];
                        let date = [];
                        arr[a] = data.delimit.find(item => {
                            return item.cp_id == a;
                        });
                        data.info.forEach(item => {
                            info.push(item[a] * arr[a].k);
                            date.push(Moment(+item.ts).format('HH:mm:ss'));
                        });
                        // window.console.log(date);
                        this.schart.push({
                            type: 'line',
                            title: {
                                text: arr[a].cp_name
                            },
                            bgColor: '#fff',
                            labels: date,
                            datasets: [
                                {
                                    data: info
                                }
                            ],
                            legend: {
                                display: false
                            },
                            // leftPadding: 50,
                            // rightPadding: 50,
                            width: '100%'
                        });
                    }
                    this.limit = arr;
                    window.console.log(this.schart);
                })
                .catch(err => {});
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
.schart-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.schart-box {
    /* display: inline-block; */
    width: 49%;
    background-color: #eee;

    margin: 10px 0;
    /* width: 100%; */
}
.schart {
    /* margin: 0 auto; */

    /* width: 95%; */
    height: 300px;
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
