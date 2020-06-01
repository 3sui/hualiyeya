<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-monitor grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{deviceNum}}</div>
                                    <div>设备数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-video-play grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{status.yxs}}</div>
                                    <div>运行数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-bell grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{status.gzs}}</div>
                                    <div>故障数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-4">
                                <i class="el-icon-video-pause grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{deviceNum-status.yxs}}</div>
                                    <div>待机数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:460px;">
                    <div slot="header" class="clearfix">
                        <span>设备类型</span>
                    </div>
                    <div class="schart-box">
                        <!-- <div class="content-title">饼状图</div> -->
                        <schart class="schart" canvasId="pie" :options="options3"></schart>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="24">
                        <el-card shadow="hover">
                            <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-card shadow="hover" style="height:342px;">
                            <div slot="header" class="clearfix">
                                <span>报警</span>
                                <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
                            </div>
                            <el-tabs v-model="message">
                                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                                    <el-table
                                        :data="unread"
                                        :show-header="false"
                                        style="width: 100%"
                                    >
                                        <el-table-column>
                                            <template slot-scope="scope">
                                                <span class="message-title">{{scope.row.title}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="date" width="180"></el-table-column>
                                        <el-table-column width="120">
                                            <template slot-scope="scope">
                                                <el-button
                                                    size="small"
                                                    @click="handleRead(scope.$index)"
                                                >标为已读</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!-- <div class="handle-row">
                                        <el-button type="primary">全部标为已读</el-button>
                                    </div>-->
                                </el-tab-pane>
                                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                                    <template v-if="message === 'second'">
                                        <el-table
                                            :data="read"
                                            :show-header="false"
                                            style="width: 100%"
                                        >
                                            <el-table-column>
                                                <template slot-scope="scope">
                                                    <span class="message-title">{{scope.row.title}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="date" width="150"></el-table-column>
                                            <el-table-column width="120">
                                                <template slot-scope="scope">
                                                    <el-button
                                                        type="danger"
                                                        @click="handleDel(scope.$index)"
                                                    >删除</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <!-- <div class="handle-row">
                                            <el-button type="danger">删除全部</el-button>
                                        </div>-->
                                    </template>
                                </el-tab-pane>
                                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                                    <template v-if="message === 'third'">
                                        <el-table
                                            :data="recycle"
                                            :show-header="false"
                                            style="width: 100%"
                                        >
                                            <el-table-column>
                                                <template slot-scope="scope">
                                                    <span class="message-title">{{scope.row.title}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="date" width="150"></el-table-column>
                                            <el-table-column width="120">
                                                <template slot-scope="scope">
                                                    <el-button
                                                        @click="handleRestore(scope.$index)"
                                                    >还原</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <!-- <div class="handle-row">
                                            <el-button type="danger">清空回收站</el-button>
                                        </div>-->
                                    </template>
                                </el-tab-pane>
                            </el-tabs>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-card shadow="hover">
                <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',

    data() {
        return {
            message: 'first',
            showHeader: false,
            unread: [
                {
                    date: '2018-04-19 20:00:00',
                    title: '设备1温度过高'
                },
                {
                    date: '2018-04-19 21:00:00',
                    title: '设备2温度过高'
                },
                {
                    date: '2018-04-19 21:00:00',
                    title: '设备3温度过高'
                },
                {
                    date: '2018-04-19 21:00:00',
                    title: '设备4温度过高'
                }
            ],
            read: [
                {
                    date: '2018-04-19 20:00:00',
                    title: '设备1温度过高'
                }
            ],
            recycle: [
                {
                    date: '2018-04-19 20:00:00',
                    title: '设备1温度过高'
                }
            ],
            name: localStorage.getItem('ms_username'),
            // todoList: [
            //     {
            //         title: '设备1温度过高',
            //         status: false,
            //         alarmTime: '2020-05-15 14:00:00'
            //     },
            //     {
            //         title: '设备2温度过高',
            //         status: true,
            //         alarmTime: '2020-05-15 14:00:00'
            //     },
            //     {
            //         title: '设备1断电',
            //         status: false,
            //         alarmTime: '2020-05-15 14:00:00'
            //     },
            //     {
            //         title: '设备1故障',
            //         status: false,
            //         alarmTime: '2020-05-15 14:00:00'
            //     },
            //     {
            //         title: '设备2故障',
            //         status: true,
            //         alarmTime: '2020-05-15 14:00:00'
            //     },
            //     {
            //         title: '设备1故障',
            //         status: false,
            //         alarmTime: '2020-05-15 14:00:00'
            //     }
            //     // {
            //     //     title: '设备2故障',
            //     //     status: true,
            //     //     alarmTime: '2020-05-15 14:00:00'
            //     // },
            //     // {
            //     //     title: '设备2故障',
            //     //     status: true,
            //     //     alarmTime: '2020-05-15 14:00:00'
            //     // },
            //     // {
            //     //     title: '设备1故障',
            //     //     status: false,
            //     //     alarmTime: '2020-05-15 14:00:00'
            //     // },
            //     // {
            //     //     title: '设备2故障',
            //     //     status: true,
            //     //     alarmTime: '2020-05-15 14:00:00'
            //     // }
            // ],

            options: {
                type: 'line',
                title: {
                    text: '最近一月设备报警数'
                },
                xRorate: 25,
                labels: [
                    '01',
                    '02',
                    '03',
                    '04',
                    '05',
                    '06',
                    '07',
                    '08',
                    '09',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21',
                    '22',
                    '23',
                    '24',
                    '25',
                    '26',
                    '27',
                    '28',
                    '29',
                    '30'
                ],
                datasets: [
                    {
                        label: '设备',
                        data: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '开机率/故障率趋势图'
                },
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '开机率',
                        data: [78, 4, 15, 65, 89]
                    },
                    {
                        label: '故障率',
                        data: [4, 2, 2, 6, 5]
                    }
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '设备地域分布'
                },
                legend: {
                    position: 'bottom'
                },
                bottomPadding: '10px',
                labels: ['江苏'],
                datasets: [
                    {
                        data: [50]
                    }
                ]
            },
            status: {},
            deviceNum: 0
        };
    },
    created() {
        this.fetchDeviceNum();
        this.fetchDeviceStatus();
    },
    components: {
        Schart
    },
    computed: {
        unreadNum() {
            return this.unread.length;
        },
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },

    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
        //获取企业设备数量
        fetchDeviceNum() {
            axios({
                method: 'get',
                url: '/fetchDeviceNum'
            })
                .then(res => {
                    this.deviceNum = res.data.data;
                })
                .catch();
        },

        //获取企业设备各种状态的数据
        fetchDeviceStatus() {
            axios({
                method: 'get',
                url: '/fetchDeviceStatus'
            })
                .then(res => {
                    this.status = res.data;
                })
                .catch();
        },
        handleRead(index) {
            const item = this.unread.splice(index, 1);
            console.log(item);
            this.read = item.concat(this.read);
        },
        handleDel(index) {
            const item = this.read.splice(index, 1);
            this.recycle = item.concat(this.recycle);
        },
        handleRestore(index) {
            const item = this.recycle.splice(index, 1);
            this.read = item.concat(this.read);
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 10px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}
.grid-con-4 .grid-con-icon {
    background: rgb(241, 224, 90);
}

.grid-con-4 .grid-num {
    color: rgb(241, 224, 90);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
