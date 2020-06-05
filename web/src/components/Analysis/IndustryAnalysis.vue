<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 分析中心
                </el-breadcrumb-item>
                <el-breadcrumb-item>行业分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20" class="mgb20">
                <!-- <el-col :span="6">
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
                </el-col>-->
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search" @click="Refresh">刷新</el-button>
                    <el-button type="primary" icon="el-icon-download" @click="Download">导出报表</el-button>
                </el-col>
            </el-row>
            <!-- </div>

            <div class="container">-->
            <el-row :gutter="20" class="mgb20">
                <el-col :span="6" v-for="(industry,index) in industryTop" :key="index">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" v-if="index<4">
                        <div class="grid-content grid-con">
                            <i
                                class="grid-con-icon"
                                :class="backgroundstyle[index]"
                            >{{industry.sort}}</i>
                            <div class="grid-cont-right">
                                <el-row>
                                    <div
                                        class="card-title"
                                        :class="style[index]"
                                    >{{industry.industryname}}</div>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <div
                                            :class="style[index]"
                                            class="grid-num"
                                        >{{industry.enterpriseNum}}</div>
                                        <div>企业数</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div
                                            :class="style[index]"
                                            class="grid-num"
                                        >{{industry.deviceNum}}</div>
                                        <div>设备数</div>
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
                    <!-- <div id="byEnterprise" style="height: 460px; width: 100%;"></div> -->
                    <el-table :data="industryTop" height="480px" border style="width: 100%">
                        <el-table-column prop="sort" label="序号" width="180" align="center"></el-table-column>
                        <el-table-column
                            prop="industryname"
                            label="行业名称"
                            width="180"
                            align="center"
                        ></el-table-column>
                        <el-table-column prop="enterpriseNum" label="企业数" align="center"></el-table-column>
                        <el-table-column prop="deviceNum" label="设备数" align="center"></el-table-column>
                    </el-table>
                </el-col>

                <el-col :span="12">
                    <div id="byDevice" style="height: 480px; width: 100%;"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
export default {
    name: 'IndustryAnalysis',
    data() {
        return {
            datepick: '',
            // pickerOptions: {
            //     shortcuts: [
            //         {
            //             text: '最近一周',
            //             onClick(picker) {
            //                 const end = new Date();
            //                 const start = new Date();
            //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            //                 picker.$emit('pick', [start, end]);
            //             }
            //         },
            //         {
            //             text: '最近一个月',
            //             onClick(picker) {
            //                 const end = new Date();
            //                 const start = new Date();
            //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            //                 picker.$emit('pick', [start, end]);
            //             }
            //         },
            //         {
            //             text: '最近三个月',
            //             onClick(picker) {
            //                 const end = new Date();
            //                 const start = new Date();
            //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            //                 picker.$emit('pick', [start, end]);
            //             }
            //         }
            //     ]
            // },

            industryTop: [],
            // {
            //     industryname: '干燥行业',
            //     enterpriseNum: 20,
            //     deviceNum: 200,
            //     sort: 1
            // },
            // {
            //     industryname: '液压行业',
            //     enterpriseNum: 17,
            //     deviceNum: 150,
            //     sort: 2
            // },
            // {
            //     industryname: '钢铁行业',
            //     enterpriseNum: 10,
            //     deviceNum: 80,
            //     sort: 3
            // },
            // {
            //     industryname: '电子行业',
            //     enterpriseNum: 26,
            //     deviceNum: 30,
            //     sort: 4
            // },
            // {
            //     industryname: '纺织行业',
            //     enterpriseNum: 8,
            //     deviceNum: 40,
            //     sort: 5
            // },
            // {
            //     industryname: '钣金行业',
            //     enterpriseNum: 5,
            //     deviceNum: 20,
            //     sort: 6
            // },
            // {
            //     industryname: '实施行业',
            //     enterpriseNum: 8,
            //     deviceNum: 40,
            //     sort: 7
            // },
            // {
            //     industryname: '看了行业',
            //     enterpriseNum: 5,
            //     deviceNum: 20,
            //     sort: 8
            // }
            // ],
            style: ['s1', 's2', 's3', 's4'],
            backgroundstyle: ['b1', 'b2', 'b3', 'b4'],
            industrylist: [],
            devicenumlist: [],
            enterprisenumlist: []
        };
    },
    created() {
        this.getEnterprise();
    },

    mounted() {
        this.getChart2();
    },
    methods: {
        //获取企业行业数据
        getEnterprise() {
            this.$axios
                .get('EnterprisesByIndustry')
                .then(res => {
                    if (res) {
                        this.industryTop = res.data;
                        console.log(this.industryTop);
                    }
                })
                .then(() => {
                    this.getdata();
                    this.getChart2();
                })

                .catch(err => {
                    console.log(err);
                });
        },

        //获取数据
        getdata() {
            this.industrylist = [];
            this.devicenumlist = [];
            this.enterprisenumlist = [];
            for (let i = 0; i < this.industryTop.length; i++) {
                // console.log(1);
                let item = this.industryTop[i];
                this.industrylist.push(item.industryname);
                this.devicenumlist.push(item.deviceNum);
                this.enterprisenumlist.push(item.enterpriseNum);
            }
            // console.log(this.industrylist)
            //  console.log(this.devicenumlist)
            //   console.log(this.enterprisenumlist)
        },

        //获取图表2
        getChart2() {
            // console.log(document.getElementById('byDevice'));
            let myChart = this.$echarts.init(document.getElementById('byDevice'));
            // 指定图表的配置项和数据
            var xData = this.industrylist;
            // var lineData = [100, 100, 100, 100, 100, 100, 100]
            var lastYearData = this.devicenumlist;
            var thisYearData = this.enterprisenumlist;
            var timeLineData = [1];
            let legend = ['设备数', '企业数'];
            var background = '#fff'; //背景
            let textColor = '#000';
            let lineColor = 'rgba(255,255,255,0.2)';
            let colors = [
                {
                    borderColor: 'rgba(227,161,96,1)',
                    start: 'rgba(227,161,96,0.8)',
                    end: 'rgba(227,161,96,0.3)'
                },
                {
                    borderColor: 'rgba(0,222,255,1)',
                    start: 'rgba(0,222,255,0.3)',
                    end: 'rgba(0,222,255,0.8)'
                }
            ];
            let borderData = [];
            let scale = 2;
            borderData = xData.map(item => {
                return scale;
            });
            var option = {
                baseOption: {
                    title: {
                        show: true,
                        text: '设备数量企业数量行业分布图',
                        left: 'left'
                    },
                    backgroundColor: background,
                    timeline: {
                        show: false,
                        top: 0,
                        data: []
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        top: '5%',
                        right: '5%',
                        itemWidth: 20,
                        itemHeight: 8,
                        // itemGap: 343,
                        icon: 'horizontal',
                        textStyle: {
                            color: '#000',
                            fontSize: 16
                        },
                        data: legend
                    },
                    grid: [
                        {
                            show: false,
                            left: '5%',
                            top: '15%',
                            bottom: '8%',
                            containLabel: true,
                            width: '37%'
                        },
                        {
                            show: false,
                            left: '51%',
                            top: '15%',
                            bottom: '8%',
                            //    containLabel: true,
                            width: '0%'
                        },
                        {
                            show: false,
                            right: '2%',
                            top: '15%',
                            bottom: '8%',
                            containLabel: true,
                            width: '37%'
                        }
                    ],
                    xAxis: [
                        {
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                show: false
                            },
                            // label: {
                            //     show: true
                            // },
                            axisTick: {
                                show: false
                            },
                            position: 'top',
                            axisLabel: {
                                show: true,
                                color: textColor
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: lineColor
                                }
                            }
                        },
                        {
                            gridIndex: 1,
                            show: false
                        },
                        {
                            gridIndex: 2,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            position: 'top',
                            axisLabel: {
                                show: true,
                                color: textColor
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: lineColor
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            inverse: true,
                            position: 'right',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: lineColor
                                }
                            },

                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            data: xData
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                padding: [30, 0, 0, 0],
                                textStyle: {
                                    color: '#000',
                                    fontSize: 14
                                },
                                align: 'center'
                            },
                            data: xData.map(function(value) {
                                return {
                                    value: value,
                                    textStyle: {
                                        align: 'center'
                                    }
                                };
                            })
                        },
                        {
                            gridIndex: 2,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: lineColor
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            data: xData
                        }
                    ],
                    series: []
                },
                options: []
            };

            option.baseOption.timeline.data.push(timeLineData[0]);
            option.options.push({
                series: [
                    {
                        name: '设备数',
                        type: 'bar',
                        barWidth: 25,
                        stack: '1',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: colors[0].start
                                    },
                                    {
                                        offset: 1,
                                        color: colors[0].end
                                    }
                                ])
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: lastYearData,
                        animationEasing: 'elasticOut'
                    },
                    {
                        name: '设备数',
                        type: 'bar',
                        barWidth: 25,
                        stack: '1',
                        itemStyle: {
                            normal: {
                                color: colors[0].borderColor
                            }
                        },
                        data: borderData
                    },
                    {
                        name: '企业数',
                        type: 'bar',
                        stack: '2',
                        barWidth: 25,
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: colors[1].start
                                    },
                                    {
                                        offset: 1,
                                        color: colors[1].end
                                    }
                                ])
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: thisYearData,
                        animationEasing: 'elasticOut'
                    },
                    {
                        name: '企业数',
                        type: 'bar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        barWidth: 25,
                        stack: '2',
                        itemStyle: {
                            normal: {
                                color: colors[1].borderColor
                            }
                        },
                        data: borderData
                    }
                ]
            });

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },

        //刷新
        Refresh() {
            this.getEnterprise();
        }

        //导出excel表
    }
};
</script>

<style>
.el-row {
    margin-bottom: 20px;
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