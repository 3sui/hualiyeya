<template>
<div>
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-data"></i> 分析中心
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <div class="container">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="设备分析" name="first">
                

            </el-tab-pane>
            <el-tab-pane label="行业分析" name="second">
                
            </el-tab-pane>
            <el-tab-pane label="故障分析" name="third">

            </el-tab-pane>
            <el-tab-pane label="收入分析" name="fourth">

            </el-tab-pane>
        </el-tabs>
    </div>
    </div>
</template>

<script>
export default {
    name: 'tabs',
    data() {
        return {
            message: 'first',
            showHeader: true
        };
    },
    methods: {
        handleRead(index) {
            const item = this.unread.splice(index, 1);
            console.log(item);
            this.read = item.concat(this.read);
        },
        handleDel(index) {
            const item = this.read.splice(index, 1);
            this.recycle = item.concat(this.recycle);
        },
        handleRestore(index) {
            const item = this.recycle.splice(index, 1);
            this.read = item.concat(this.read);
        }
    },
    computed: {
        unreadNum() {
            return this.unread.length;
        }
    }
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>

