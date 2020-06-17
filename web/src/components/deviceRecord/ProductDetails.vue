<!--
 * @Author: your name
 * @Date: 2020-05-06 10:56:10
 * @LastEditTime: 2020-06-16 17:09:41
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
            <el-row :gutter="20" class="mb-30" v-if="tableData.info">
                <el-col :span="12">
                    <div class="ml-50">
                        <p>设备ID: {{tableData.info.eq}}</p>
                        <p>工作状态: {{tableData.info.status}}</p>
                        <p>设备名称: {{tableData.info.device_name}}</p>
                        <p>型号描述: {{tableData.info.device_description}}</p>
                        <p>设备种类: {{tableData.info.device_type}}</p>
                        <p>上次维修日期: {{tableData.info.LastMaintenance}}</p>
                        <p>创建人: {{tableData.info.created_by}}</p>
                        <p>创建日期: {{tableData.info.created_time}}</p>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="ml-50">
                        <p>开关机:{{tableData.info.is_on}}</p>
                        <p>客户名称:{{tableData.info.device_supplier}}</p>
                        <p>安装地址:{{tableData.info.address}}</p>
                        <p>客户行业:{{tableData.info.CustomerIndustry}}</p>
                        <div class="demo-image__preview">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="tableData.imgList[0]?(axios.defaults.baseURL.slice(0, -4) + tableData.imgList[0].file_path.split('.').shift()):''"
                                :preview-src-list="srcList"
                            ></el-image>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="plugins-tips">维修记录</div>
            <el-timeline>
                <el-timeline-item
                    :timestamp="item.created_time"
                    placement="top"
                    v-for="(item, index) in tableData.repair"
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
                                    <th>维修人</th>
                                </tr>
                                <tr>
                                    <td>{{item.created_time}}</td>
                                    <td>{{item.type}}</td>
                                    <td>{{item.phenomenon}}</td>
                                    <td>{{item.cause}}</td>
                                    <td>{{item.methods}}</td>
                                    <td>{{item.LastSupplier}}</td>
                                    <td>{{item.more}}</td>
                                    <td>{{item.repair_person}}</td>
                                </tr>
                            </thead>
                        </table>
                        <p class="mt-10">备注: {{item.More}}</p>
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
                        <p>王小虎 提交于 2018/4/12 20:46</p>-->
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
            maintenanceList: [],
            srcList: []
        };
    },
    created() {
        this.getDeviceIDAndInfo();
    },
    components: {},

    computed: {},

    methods: {
        getDeviceIDAndInfo() {
            window.console.log(this.$route.query.id);
            axios({
                method: 'get',
                url: '/device/getDeviceInfo',
                params: {
                    id: this.$route.query.id
                }
            })
                .then(res => {
                    window.console.log(res.data);
                    if (res.data.success) {
                        this.$set(this.tableData, 'info', res.data.info[0]);
                        this.$set(this.tableData, 'imgList', res.data.imgList);
                        this.$set(this.tableData, 'repair', res.data.repair);

                        res.data.imgList.forEach(item => {
                            this.srcList.push(axios.defaults.baseURL.slice(0, -4) + item.file_path.split('.').shift() || '');
                        });
                        // this.tableData.info = res.data.info[0];
                        window.console.log(this.tableData);
                    }
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