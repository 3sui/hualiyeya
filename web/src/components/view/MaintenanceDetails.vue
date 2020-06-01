<!--
 * @Author: your name
 * @Date: 2020-05-06 10:56:10
 * @LastEditTime: 2020-05-11 17:24:08
 * @LastEditors: Please set LastEditors
 * @Description: 维修记录
 * @FilePath: \vue-manage-system\src\components\view\ProductDetails.vue
 -->
<!--  -->
<template>
    <div class>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 产品档案
                </el-breadcrumb-item>
                <el-breadcrumb-item>维修详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button
                type="primary"
                icon="el-icon-delete"
                class="handle-del mr10 mb-30"
                @click="$router.go(-1)"
            >返回</el-button>
            <div class="plugins-tips">设备信息</div>
            <el-row :gutter="20" class="mb-30">
                <el-col :span="12">
                    <div class="ml-50">
                        <p>客户名称:{{tableData.CustomerName}}</p>
                        <p>设备ID:{{tableData.DeviceID}}</p>
                        <p>设备种类:{{tableData.DeviceClass}}</p>
                        <p>设备名称:{{tableData.DeviceName}}</p>
                        <p>型号描述:{{tableData.Model}}</p>
                        <p>出厂编号:{{tableData.SerialNumber}}</p>
                        <p>安装地址:{{tableData.Address}}</p>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="ml-50">
                        <img
                            width="100%"
                            src="http://127.0.0.1:5500/images/%E4%BA%A7%E5%93%81%E8%AF%A6%E6%83%85/u711.png"
                            alt
                        />
                    </div>
                </el-col>
            </el-row>
            <div class="plugins-tips">维修记录</div>
            <div class="ml-50">
                <p>服务提出时间:{{tableData.StartTime}}</p>
                <p>故障类型:{{tableData.FaultType}}</p>
                <p>故障现象:{{tableData.FaultPhenomenon}}</p>
                <p>可能产生的原因:{{tableData.PossiblePhenomena}}</p>
                <p>排除办法:{{tableData.Method}}</p>
                <p>故障部件供应商:{{tableData.LastSupplier}}</p>
                <p>是否更换零部件:{{tableData.IsReplace}}</p>
                <p>更换零部件供应商:{{tableData.NewSupplier}}</p>
                <p>维修费用(元):{{tableData.Price}}</p>
                <p>备注:{{tableData.More}}</p>
                <p>维修人:{{tableData.RepairMan}}</p>
                <p>维修时间:{{tableData.EndTime}}</p>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MaintenanceDetails',
    data() {
        return {
            tableData: {}
        };
    },

    components: {},

    computed: {},
    created() {
        this.getDeviceIDAndInfo();
    },
    methods: {
        getDeviceIDAndInfo() {
            window.console.log(this.$route.query.id);
            axios({
                method: 'get',
                url: '/getMaintenanceInfo',
                params: {
                    id: this.$route.query.id
                }
            })
                .then(res => {
                    window.console.log(res.data);
                    this.tableData = res.data[0];
                })
                .catch();
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