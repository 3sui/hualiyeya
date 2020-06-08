<!--
 * @Author: your name
 * @Date: 2020-05-06 10:56:10
 * @LastEditTime: 2020-05-16 11:45:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-manage-system\src\components\view\ProductDetails.vue
 -->
<!--  -->
<template>
    <div class>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 设备列表
                </el-breadcrumb-item>
                <el-breadcrumb-item>设备详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button
                type="primary"
                icon="el-icon-lx-back"
                class="handle-del mr10 mb-30"
                @click="$router.go(-1)"

            >返回</el-button>
            <!-- <el-button type="primary" icon="el-icon-edit" class="handle-del mr10 mb-30">编辑</el-button> -->

            <div class="plugins-tips">设备信息</div>
            <el-row :gutter="20" class="mb-30">
                <el-col :span="12">
                    <div class="ml-50">
                        <p>设备ID: {{tableData.DeviceID}}</p>
                        <p>工作状态: {{tableData.status}}</p>
                        <p>设备名称: {{tableData.DeviceName}}</p>
                        <p>型号描述: {{tableData.Model}}</p>
                        <p>设备种类: {{tableData.DeviceClass}}</p>
                        <p>经度: {{}}</p>
                        <p>报警次数: {{tableData.AlertTimes}}</p>
                        <p>信号位地址: {{}}</p>
                        <p>上次维修日期: {{tableData.LastMaintenance}}</p>
                        <p>创建人: {{}}</p>
                        <p>建档日期: {{}}</p>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="ml-50">
                        <p>出厂编号:{{tableData.SerialNumber}}</p>
                        <p>运行时长(h):{{tableData.Duration}}</p>
                        <p>开关机:{{tableData.switch}}</p>
                        <p>客户名称:{{tableData.CustomerName}}</p>
                        <p>安装地址:{{tableData.Address}}</p>
                        <p>纬度:{{}}</p>
                        <p>客户行业:{{tableData.CustomerIndustry}}</p>
                        <img
                            width="200"
                            src="http://127.0.0.1:5500/images/%E4%BA%A7%E5%93%81%E8%AF%A6%E6%83%85/u711.png"
                            alt
                        />
                    </div>
                </el-col>
            </el-row>
            <div class="plugins-tips">维修记录</div>
            <el-timeline>
                <el-timeline-item
                    :timestamp="item.StartTime"
                    placement="top"
                    v-for="(item, index) in maintenanceList"
                    :key="index"
                >
                    <el-card>
                        <table>
                            <thead>
                                <tr>
                                    <th>服务提出时间</th>
                                    <th>故障类型</th>
                                    <th>故障现象</th>
                                    <th>可能产生的原因</th>
                                    <th>排除办法</th>
                                    <th>故障部件供应商</th>
                                    <th>是否更换部件</th>
                                    <th>更换部件供应商</th>
                                    <th>维修费用（元）</th>
                                    <th>维修人</th>
                                </tr>
                                <tr>
                                    <td>{{item.StartTime}}</td>
                                    <td>{{item.FaultType}}</td>
                                    <td>{{item.FaultPhenomenon}}</td>
                                    <td>{{item.possibleReason}}</td>
                                    <td>{{item.Method}}</td>
                                    <td>{{item.LastSupplier}}</td>
                                    <td>{{item.IsReplace}}</td>
                                    <td>{{item.NewSupplier}}</td>
                                    <td>{{item.Price}}</td>
                                    <td>{{item.RepairMan}}</td>
                                </tr>
                            </thead>
                        </table>
                        <p class="mt-10">备注: {{More}}</p>
                        <!-- <div class="annex">
                            附件:
                            <img
                                width="100"
                                src="http://127.0.0.1:5500/images/%E4%BA%A7%E5%93%81%E8%AF%A6%E6%83%85/u711.png"
                                alt
                            />
                            <img
                                width="100"
                                src="http://127.0.0.1:5500/images/%E4%BA%A7%E5%93%81%E8%AF%A6%E6%83%85/u711.png"
                                alt
                            />
                            <img
                                width="100"
                                src="http://127.0.0.1:5500/images/%E4%BA%A7%E5%93%81%E8%AF%A6%E6%83%85/u711.png"
                                alt
                            />
                            <img
                                width="100"
                                src="http://127.0.0.1:5500/images/%E4%BA%A7%E5%93%81%E8%AF%A6%E6%83%85/u711.png"
                                alt
                            />
                        </div>
                        <p>王小虎 提交于 2018/4/12 20:46</p> -->
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
export default {
    name: 'productDetails',
    data() {
        return {
            tableData: {},
            maintenanceList: []
        };
    },
    created() {
        this.getDeviceIDAndInfo();
        this.getMaintenanceRecord();
    },
    components: {},

    computed: {},

    methods: {
        getDeviceIDAndInfo() {
            window.console.log(this.$route.query.id);
            axios({
                method: 'get',
                url: '/getDeviceInfo',
                params: {
                    id: this.$route.query.id
                }
            })
                .then(res => {
                    window.console.log(res.data);
                    this.tableData = res.data;
                })
                .catch();
        },
        getMaintenanceRecord() {
            axios({
                methods: 'get',
                url: 'getMaintenanceRecord',
                params: {
                    id: this.$route.query.id
                }
            }).then(res => {
                this.maintenanceList = res.data;
                window.console.log(this.maintenanceList);
            });
        }
    }
};
</script>
<style scoped>
th {
    background-color: #eef1f6;
    padding: 5px 10px;
}
td {
    padding: 5px 10px;
}
p {
    line-height: 25px;
}
.ml-50 {
    margin-left: 50px;
}
.mb-30 {
    margin-bottom: 30px;
}
.mt-10 {
    margin-top: 10px;
}
.annex img {
    margin: 10px 10px;
    vertical-align: middle;
}
</style>