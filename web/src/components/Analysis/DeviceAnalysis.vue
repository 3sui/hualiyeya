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
                            
                        ></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" icon="el-icon-search">查询报表</el-button>
                    <el-button type="primary" icon="el-icon-download">导出报表</el-button>
                </el-col>
            </el-row>-->
            <el-row :gutter="20" type="flex">
                <el-col  v-for="(device,index) in deviceTop" :key="index"   v-if="index<5">
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
                            <el-col :span="14" >
                                <span class="grid-cont-right">
                                    <div class="grid-num">{{device.count}}</div>
                                    <div class="grid_dev">设备数</div>
                                </span>
                            </el-col>
                        </el-row>

                        <div class="card-title">{{device.device_type}}</div>
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
            //     {'
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
            backgroundstyle: ['b1', 'b2', 'b3', 'b4','b5'],
            devicetypelist: [],
            devicedatalist: [],
            iconlist:['el-icon-s-platform','el-icon-box','el-icon-suitcase','el-icon-data-analysis','el-icon-pie-chart']
        };
    },
    created() {
        this.getDeviceTypes();
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
            this.devicetypelist = [];
            this.devicedatalist = [];
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
                    left: '40%'
                },
                color: ['#8378EA', '#E7BCF3', '#FB7293', '#FF9F7F', '#9FE6B8', '#32C5E9', '#4B7CF3', '#EB6379', '#068687', '#82DACA'],
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
                        radius: ['20%', '65%'], //半径
                        center: ['40%', '60%'], //位置
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
.elcard {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
    font-family: 'open sans';
    border-radius: 10px;
    padding-top:10px ;
}
.grid-cont-right {
    flex: 1;  
    font-size: 14px;
    color: #999;
    height: 120px;
}

.grid-num {
    color: white;
    font-size: 30px;
    font-weight:500;
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
    text-align: left;
    line-height: 120px;
    color: #fff;
}

.card-title {
    text-align: left;
    font-size: 20px;
    /* font-weight: bold; */
    color: white;
    letter-spacing: 0.2em;
    /* width: 50%; */
    line-height: 50px;
    height: 50px;
    /* padding-left: 25px; */
    font-family: 'open sans';
     text-align: center;
    /* background-color: #f0f0f0; */
}

.s1 {
    color: #13aaf9;
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
      background-image: linear-gradient(90deg,  #968cdd, #968cee);
}

.b4 {
    /* background-color: darkturquoise; */
    background-image: linear-gradient(90deg,  #00CEDD, #00CEEE);
}

.b3 {
    /* background-color: #f5a1e2; */
        background-image: linear-gradient(90deg,  #f5a1dd, #f5a1ee);
}
.b5 {
    /* background-color: #f8bb90; */
      background-image: linear-gradient(90deg, #f8bb88,#f8bb99);
}
.container {
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>