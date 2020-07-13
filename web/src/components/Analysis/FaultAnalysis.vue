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
            <!-- <el-row :gutter="20" class="mgb20">
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
            </el-row>-->
            <el-row :gutter="20" type="flex" >
                <el-col  v-for="(fault,index) in faultTop" :key="index" v-if="index < 5">
                    <el-card
                        shadow="hover"
                        :body-style="{padding: '0px'}"
                        :class="backgroundstyle[index]"
                        
                        class="elcard"
                    >
                        <el-row :gutter="20">
                            <el-col :span="6" :offset="3">
                                <span class="grid-content">
                                    <i :class="iconlist[index]"></i>
                                </span>
                            </el-col>
                            <el-col :span="14" :offset="1">
                                <span class="grid-cont-right">
                                    <div class="grid-num">{{fault.count}}</div>
                                    <div class="grid_dev">故障数</div>
                                </span>
                            </el-col>
                        </el-row>

                        <div class="card-title">{{fault.fault_type}}</div>
                    </el-card>

                    <!-- <el-card
                        shadow="hover"
                        :body-style="{padding: '0px'}"
                        v-if="index<5"
                        class="elcard"
                    >
                        <div class="grid-content grid-con">
                            <div
                                class="card-title"
                                :class="backgroundstyle[index]"
                            >{{fault.fault_type}}</div>
                            <div class="grid-cont-right">
                                <el-row :gutter="24">
                                    <el-col :span="24">
                                        <div :class="style[index]" class="grid-num">{{fault.count}}</div>
                                        <div class="grid_dev">故障数</div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-card> -->
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
            // style: ['s1', 's2', 's3', 's4'],
            backgroundstyle: ['b1', 'b2', 'b3', 'b4', 'b5'],
            faulttypelist: [],
            faultnumlist: [],
            iconlist: ['el-icon-s-platform', 'el-icon-box', 'el-icon-suitcase', 'el-icon-data-analysis', 'el-icon-pie-chart']
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
            var colorList = ['#EB6379', '#23A9F2', '#EEA03C', '#69D3AB'];
            var option = {
                title: {
                    text: '故障种类数量分布图',
                    left: '40%'
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
                        margin: 120,
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

<style scoped>
/* .el-row {
    margin-bottom: 10px;
} */
.grid-content {
    height: 70px;
    line-height: 70px;
    font-size: 50px;
    color: white;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    height: 120px;
}


.elcard {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
    font-family: 'open sans';
    border-radius: 10px;
    padding-top:10px ;
}
.grid-num {
    color: white;
    font-size: 30px;
    font-weight: 500;
    /* margin-bottom: 10px; */
    height: 50px;
    line-height: 50px;
    font-family: 'open sans';
    text-align: left;
}
.grid_dev {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    color: white;
    text-align: left;
    font-weight: 500;
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
    text-align: left;
    font-size: 20px;
    /* font-weight: bold; */
    color: white;
    /* letter-spacing: 0.2em; */
    /* width: 50%; */
    line-height: 50px;
    height: 50px;
    /* padding-left: 25px; */
    font-family: 'open sans';
     text-align: center;
    /* background-color: #f0f0f0; */
}

.s1 {
    color: #eb6379;
}

.s3 {
    color: #eea03c;
}

.s2 {
    color: darkturquoise;
}

.s4 {
    color: #69d3ab;
}
.b1 {
    /* background-color: #13aaf9; */
    background-image: linear-gradient(90deg, #13aaee, #13aaff);
}

.b2 {
    /* background-color: #968cec; */
    background-image: linear-gradient(90deg, #968cdd, #968cee);
}

.b4 {
    /* background-color: darkturquoise; */
    background-image: linear-gradient(90deg, #00cedd, #00ceee);
}

.b3 {
    /* background-color: #f5a1e2; */
    background-image: linear-gradient(90deg, #f5a1dd, #f5a1ee);
}
.b5 {
    /* background-color: #f8bb90; */
    background-image: linear-gradient(90deg, #f8bb88, #f8bb99);
}
/* .b1 {
    background-color: #eb6379;
}

.b3 {
    background-color: #eea03c;
}

.b2 {
    background-color: darkturquoise;
}

.b4 {
    background-color: #69d3ab;
} */
.container {
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>