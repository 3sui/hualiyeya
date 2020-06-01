<!--
 * @Author: your name
 * @Date: 2020-05-07 15:48:38
 * @LastEditTime: 2020-05-19 14:01:10
 * @LastEditors: Please set LastEditors
 * @Description: 企业视图
 * @FilePath: \vue-manage-system\src\components\view\EnterpriseView.vue
 -->
 <template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 企业视图
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <div class="navbar mb-20">
                <span class="active">设备分析</span>
                <span>行业分析</span>
                <span>故障分析</span>
            </div>-->

            <div id="devicearea">
                <el-row :gutter="20">
                    <!-- <el-col :span="8">
                        <div class="schart-box">
                            <schart class="schart" canvasId="line1" :options="options1"></schart>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="schart-box">
                            <schart class="schart" canvasId="line2" :options="options2"></schart>
                        </div>
                    </el-col>-->
                    <el-col>
                        <div class="schart-box">
                            <schart class="schart" canvasId="line3" :options="options3"></schart>
                        </div>
                    </el-col>
                </el-row>
                <!-- <div class="product-status">
                    <el-input v-model="query.name" placeholder="设备分析" class="handle-input mr10"></el-input>
                    <el-select
                        v-model="query.address"
                        placeholder="请选择省"
                        class="handle-select mr10"
                    >
                        <el-option key="1" label="江苏省" value="江苏省"></el-option>
                    </el-select>
                    <el-select
                        v-model="query.address"
                        placeholder="请选择市"
                        class="handle-select mr10"
                    >
                        <el-option key="1" label="常州市" value="常州市"></el-option>
                    </el-select>
                    <el-select
                        v-model="query.address"
                        placeholder="请选择区"
                        class="handle-select mr10"
                    >
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
                >
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
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
                            <el-button type="text" icon="el-icon-eye">详情</el-button>
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
                </div>-->
            </div>
        </div>
    </div>
</template>
 
 <script>
import Schart from 'vue-schart';
import { fetchData } from '../../api/index';

export default {
    name: 'EnterpriseView',
    data() {
        return {
            // options1: {
            //     type: 'bar',
            //     title: {
            //         text: '设备分析'
            //     },
            //     bgColor: '#fff',
            //     labels: ['干燥设备', '液压设备', '数控机床'],
            //     datasets: [
            //         {
            //             label: '设备类型',
            //             data: [334, 278, 190]
            //         }
            //     ],
            //     width: '100%'
            // },
            // options2: {
            //     type: 'bar',
            //     title: {
            //         text: '行业分析'
            //     },
            //     bgColor: '#fff',
            //     labels: ['纺织业', '化工业', '干燥业'],
            //     datasets: [
            //         {
            //             label: '行业类型',
            //             data: [23, 47, 132],
            //             fillColor:['#FD5F2F']
            //         }
            //     ],
            //     width: '100%'
            // },
            options3: {
                type: 'bar',
                title: {
                    text: '故障分析'
                },
                bgColor: '#fff',
                labels: ['断电', '零件损耗', '操作失误', '设备过热', '开机时长过久', '设备长时间未维护', '电压不稳定', '程序错误'],
                datasets: [
                    {
                        label: '故障类型',
                        data: [23, 47, 132, 7, 0, 8, 1, 3],
                        fillColor: ['#ccc']
                    }
                ],
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
