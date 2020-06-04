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
                <el-col :span="6" v-for="industry in industryTop" :key='industry'>
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con">
                            <i class="el-icon-monitor grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{industry.enterpriseNum}}</div>
                                <div>企业数</div>
                            </div>
                            <div class="grid-cont-right">
                                <div class="grid-num">{{industry.deviceNum}}</div>
                                <div>设备数</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="mgb20">
                <el-col :span="12">
                    <div id="byEnterprise"></div>
                </el-col>
                <el-col :span="12">
                    <div id="byDevice"></div>
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
            industryTop: [
                {
                    industryname: '干燥行业',
                    enterpriseNum: 20,
                    deviceNum: 200
                },
                {
                    industryname: '液压行业',
                    enterpriseNum: 17,
                    deviceNum: 150
                },
                {
                    industryname: '钢铁行业',
                    enterpriseNum: 10,
                    deviceNum: 80
                },
                {
                    industryname: '电子行业',
                    enterpriseNum: 26,
                    deviceNum: 30
                }
            ]
        };
    },
    created() {
        this.getChart1();
        this.getChart2();
    },
    methods: {
        //获取图表1
        getChart1() {},

        //获取图表2
        getChart2() {}
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

.grid-con .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con .grid-num {
    color: rgb(45, 140, 240);
}
</style>