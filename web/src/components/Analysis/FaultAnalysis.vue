<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 分析中心
                </el-breadcrumb-item>
                <el-breadcrumb-item>故障分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20" class="mgb20">
                <el-col :span="6">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker
                            v-model="datepick"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                        ></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search">查询报表</el-button>
                    <el-button type="primary" icon="el-icon-download">导出报表</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="6" v-for="(fault,index) in faultTop" :key="index">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" v-if="index<4">
                        <div class="grid-content grid-con">
                            <i class="grid-con-icon" :class="backgroundstyle[index]">{{fault.sort}}</i>
                            <div class="grid-cont-right">
                                <el-row>
                                    <div
                                        class="card-title"
                                        :class="style[index]"
                                    >{{fault.fault_type}}</div>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="24">
                                        <div :class="style[index]" class="grid-num">{{fault.count}}</div>
                                        <div>故障数</div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="container" style="margin-top:10px">
            <el-row :gutter="20" class="mgb20">
                <el-col :span="12">
                    <div id="byFault" style="height: 480px; width: 100%;"></div>
                </el-col>

                <el-col :span="12">
                    <el-table :data="faultTop" height="480px" border style="width: 100%">
                        <el-table-column prop="sort" label="序号" width="180" align="center"></el-table-column>
                        <el-table-column prop="fault_type" label="故障类型" width="180" align="center"></el-table-column>
                        <el-table-column prop="count" label="故障数量" align="center"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
export default {
    name: 'FaultAnalysis',
    data() {
        return {
            datepick: '',
            faultTop: [],
            //     {
            //         sort: 1,
            //         fault_type: '泵类',
            //         count: 20
            //     },
            //     {
            //         sort: 2,
            //         fault_type: '电机类',
            //         count: 18
            //     },
            //     {
            //         sort: 3,
            //         fault_type: '冷却器类',
            //         count: 14
            //     },
            //     {
            //         sort: 4,
            //         fault_type: '过滤器类',
            //         count: 8
            //     },
            //     {
            //         sort: 5,
            //         fault_type: '油雾风机类',
            //         count: 4
            //     },
            //     {
            //         sort: 6,
            //         fault_type: '电加热器类',
            //         count: 2
            //     },
            //     {
            //         sort: 7,
            //         fault_type: '减压阀类',
            //         count: 1
            //     },
            //     {
            //         sort: 8,
            //         fault_type: '减压阀类',
            //         count: 1
            //     },
            //     {
            //         sort: 9,
            //         fault_type: '减压阀类',
            //         count: 1
            //     },
            //     {
            //         sort: 10,
            //         fault_type: '减压阀类',
            //         count: 1
            //     },

            //     {
            //         sort: 11,
            //         fault_type: '减压阀类',
            //         count: 1
            //     }
            // ],
            style: ['s1', 's2', 's3', 's4'],
            backgroundstyle: ['b1', 'b2', 'b3', 'b4'],
            faulttypelist: [],
            faultnumlist: []
        };
    },
    created() {
        this.getFaultList();
    },
    mounted() {
        this.getdata(), this.getChart1();
    },
    methods: {
        //获取数据库数据
        getFaultList() {
            this.$axios
                .get('FaultByType')
                .then(res => {
                    if (res) {
                        this.faultTop = res.data;
                       
                    }
                })
                .then(() => {
                    this.getdata();
                    this.getChart1();
                })
                .catch(err => {
                    console.log(err);
                });
        },

        //获取数据
        getdata() {
            for (let i = 0; i < this.faultTop.length; i++) {
                let item = this.faultTop[i];
                this.faulttypelist.push(item.fault_type);
                this.faultnumlist.push(item.count);
            }
        },
        //获取图表1
        getChart1() {
            // console.log(document.getElementById('byEnterprise'));
            let myChart = this.$echarts.init(document.getElementById('byFault'));
            // 指定图表的配置项和数据
            var index = 0;
            var colorList = ['#f36c6c', '#e6cf4e', '#20d180', '#0093ff'];
            var option = {
                title: {
                    text: '故障种类数量分布图',
                    left: '45%'
                },

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    show: false
                },
                grid: {
                    left: 150,
                    bottom: 30
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'value',

                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    // axisPointer: {
                    //     label: {
                    //         show: true,
                    //         margin: 30
                    //     }
                    // },
                    data: this.faulttypelist,
                    axisLabel: {
                        margin: 100,
                        fontSize: 14,
                        align: 'left',
                        color: '#333',
                        rich: {
                            a1: {
                                color: '#fff',
                                backgroundColor: colorList[0],
                                width: 30,
                                height: 30,
                                align: 'center',
                                borderRadius: 2
                            },
                            a2: {
                                color: '#fff',
                                backgroundColor: colorList[1],
                                width: 30,
                                height: 30,
                                align: 'center',
                                borderRadius: 2
                            },
                            a3: {
                                color: '#fff',
                                backgroundColor: colorList[2],
                                width: 30,
                                height: 30,
                                align: 'center',
                                borderRadius: 2
                            },
                            b: {
                                color: '#fff',
                                backgroundColor: colorList[3],
                                width: 30,
                                height: 30,
                                align: 'center',
                                borderRadius: 2
                            }
                        }
                    }
                },
                series: [
                    {
                        z: 2,
                        name: '故障数量',
                        type: 'bar',
                        data: this.faultnumlist.map((item, i) => {
                            let itemStyle = {
                                color: i > 3 ? colorList[3] : colorList[i]
                            };
                            return {
                                value: item,
                                itemStyle: itemStyle
                            };
                        }),
                        label: {
                            show: true,
                            position: 'right',
                            color: '#333333',
                            fontSize: 14,
                            offset: [10, 0]
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
};
</script>

<style>
.el-row {
    margin-bottom: 10px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 120px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.grid-con-icon {
    font-size: 50px;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    color: #fff;
}

.card-title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    /* color: coral; */
    letter-spacing: 0.5em;
    line-height: 50px;
}

.s1 {
    color: rgb(45, 140, 240);
}

.s2 {
    color: coral;
}

.s3 {
    color: darkturquoise;
}

.s4 {
    color: red;
}

.b1 {
    background-color: rgb(45, 140, 240);
}

.b2 {
    background-color: coral;
}

.b3 {
    background-color: darkturquoise;
}

.b4 {
    background-color: red;
}
.container {
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>