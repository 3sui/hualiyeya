<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 分析中心
                </el-breadcrumb-item>
                <el-breadcrumb-item>设备分析</el-breadcrumb-item>
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
                            
                        ></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search">查询报表</el-button>
                    <el-button type="primary" icon="el-icon-download">导出报表</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="mgb20">
                <el-col :span="6" v-for="(device,index) in deviceTop" :key="index">
                    <el-card shadow="hover" :body-style="{padding: '0px'}" v-if="index<4">
                        <div class="grid-content grid-con">
                            <i class="grid-con-icon" :class="backgroundstyle[index]">{{device.sort}}</i>
                            <div class="grid-cont-right">
                                <el-row>
                                    <div
                                        class="card-title"
                                        :class="style[index]"
                                    >{{device.device_type}}</div>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="24">
                                        <div :class="style[index]" class="grid-num">{{device.count}}</div>
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
                    <div id="byDeviceType" style="height: 480px; width: 100%;"></div>
                </el-col>

                <el-col :span="12">
                    <el-table :data="deviceTop" height="480px" border style="width: 100%">
                        <el-table-column prop="sort" label="序号" width="180" align="center"></el-table-column>
                        <el-table-column prop="device_type" label="设备种类" width="180" align="center"></el-table-column>
                        <el-table-column prop="count" label="设备数量" align="center"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
export default {
    name: 'DeviceAnalysis',
    data() {
        return {
            datepick: '',
            deviceTop: [],
            //     {
            //         sort: 1,
            //         device_type: '干燥设备',
            //         count: 247
            //     },
            //     {
            //         sort: 2,
            //         device_type: '电机设备',
            //         count: 180
            //     },
            //     {
            //         sort: 3,
            //         device_type: '钣金设备',
            //         count: 140
            //     },
            //     {
            //         sort: 4,
            //         device_type: '数控机床',
            //         count: 93
            //     },
            //     {
            //         sort: 5,
            //         device_type: '智能设备',
            //         count: 48
            //     },
            //     {
            //         sort: 6,
            //         device_type: '三哑设备',
            //         count: 35
            //     }
            // ],
            style: ['s1', 's2', 's3', 's4'],
            backgroundstyle: ['b1', 'b2', 'b3', 'b4'],
            devicetypelist: [],
            devicedatalist: []
        };
    },
    created(){
this.getDeviceTypes()
    },
    mounted() {
      this.getChart3();
    },
    methods: {

         //获取设备类型设备数量数据
        getDeviceTypes() {
            this.$axios
                .get('DeviceByType')
                .then(res => {
                    if (res) {
                        this.deviceTop = res.data;
                        console.log(this.deviceTop);
                    }
                })
                .then(() => {
                    this.getdata();
                    this.getChart3();
                })

                .catch(err => {
                    console.log(err);
                });
        },
        //获取数据
        getdata() {
             this.devicetypelist=[];
              this.devicedatalist=[];
            for (let i = 0; i < this.deviceTop.length; i++) {
                let item = this.deviceTop[i];
                this.devicetypelist.push(item.device_type);
                let devicedata = {
                    value: item.count,
                    name: item.device_type
                };
                this.devicedatalist.push(devicedata);
            }
        },
        //获取图表1
        getChart3() {
            let myChart = this.$echarts.init(document.getElementById('byDeviceType'));
            // 指定图表的配置项和数据

            let option = {
                title: {
                    text: '设备类型数量分布图',
                    left: '45%'
                },
                backgroundColor: '#fff',
                legend: {
                    orient: 'vertical',
                    top: 'center',
                    right: '5%',

                    data: this.devicetypelist,
                    textStyle: {
                        color: '#000',
                        fontSize: 16
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: 150,
                    bottom: 30
                },

                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '设备类型',
                        type: 'pie',
                        radius: ['30%', '80%'],
                        center: ['40%', '50%'],
                        roseType: 'radius',
                        label: {
                            show: true,
                            normal: {
                                position: 'outside',
                                fontSize: 16
                            }
                        },
                        labelLine: {
                            length: 1,
                            length2: 20,
                            smooth: true
                        },
                        data: this.devicedatalist
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