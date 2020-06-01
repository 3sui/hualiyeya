<!--
 * @Author: your name
 * @Date: 2020-05-07 10:52:41
 * @LastEditTime: 2020-05-15 15:20:15
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
            <div class>
                <div class="schart-box">
                    <!-- <div class="content-title">折线图</div> -->
                    <schart class="schart" canvasId="line" :options="options2"></schart>
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
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>-->
                <el-table-column prop="DeviceID" label="设备ID"></el-table-column>
                <el-table-column prop="DeviceName" label="设备名称"></el-table-column>
                <el-table-column prop="DeviceClass" label="设备种类"></el-table-column>
                <el-table-column prop="Model" label="型号描述"></el-table-column>
                <el-table-column prop="SerialNumber" label="出厂编号"></el-table-column>
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
            options2: {
                type: 'line',
                title: {
                    text: '主机温度(℃)'
                },
                bgColor: '#fff',
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ],
                legend: {
                    display: false
                },
                // leftPadding: 50,
                // rightPadding: 50,
                width: '100%'
            },
            value1: '',
            value2: ''
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
            let id = this.$route.query.id;
            let type = this.$route.query.type;
            let label = this.$route.query.label;
            // this.tableData = this.$route.query.row;
            window.console.log(this.tableData);
            axios({
                method: 'get',
                url: '/fetchMeasuringPoint',
                params: {
                    id,
                    type
                }
            })
                .then(res => {
                    let data = res.data;
                    console.log(data);

                    data.reverse();
                    let arr1 = [];
                    let arr2 = [];
                    for (let i in data) {
                        arr1 = arr1.concat(Object.keys(data[i]));
                        arr2 = arr2.concat(Object.values(data[i]));
                    }
                    console.log(arr1, arr2);
                    arr1 = arr1.map(item => {
                        return item.slice(6, 10);
                    });
                    this.options2.labels = arr1;
                    this.options2.datasets[0].data = arr2;
                    this.options2.title.text = label;
                })
                .catch();
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
