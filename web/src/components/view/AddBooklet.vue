<!--
 * @Author: your name
 * @Date: 2020-05-07 14:37:31
 * @LastEditTime: 2020-05-07 14:48:33
 * @LastEditors: Please set LastEditors
 * @Description: 添加服务手册
 * @FilePath: \vue-manage-system\src\components\view\AddBooklet.vue
 -->
<!--  -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 添加
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form">
                <el-form ref="form" :model="form" label-width="180px">
                    <el-form-item label="故障类型">
                        <el-select v-model="form.region" placeholder="请选择故障类型">
                            <el-option label="泵类" value="shanghai"></el-option>
                            <el-option label="电机类" value="beijing"></el-option>
                            <el-option label="油压机类" value="beijing"></el-option>
                            <el-option label="液压机类" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="震动压力大" value="shanghai"></el-option>
                            <el-option label="压力波动大" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="可能产生的现象">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="可能产生的现象">
                        <el-input type="text" v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddBooklet',
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    },

    components: {},

    computed: {},

    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
};
</script>
<style scoped>
.form {
    width: 600px;
    margin: 0 auto;
}
</style>