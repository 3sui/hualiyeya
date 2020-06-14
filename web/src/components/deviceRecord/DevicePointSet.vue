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
                <el-breadcrumb-item>设备测点配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button
                type="primary"
                icon="el-icon-lx-back"
                class="handle-del mr10 mb-30"
                @click="$router.go(-1)"
            >返回</el-button>
            <el-button
                type="primary"
                icon="el-icon-edit-outline"
                class="handle-del mr10 mb-30"
                @click="$router.go(-1)"
            >添加测点</el-button>
            <!-- <el-button type="primary" icon="el-icon-edit" class="handle-del mr10 mb-30">编辑</el-button> -->

            <!-- <div class="plugins-tips">设备信息</div> -->
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="日期" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="姓名" width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>住址: {{ scope.row.address }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DevicePointSet',
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