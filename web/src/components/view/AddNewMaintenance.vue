<!--
 * @Author: your name
 * @Date: 2020-05-06 14:19:13
 * @LastEditTime: 2020-05-16 12:07:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-manage-system\src\components\view\AddNewProduct.vue
 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 产品档案
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加维修记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary" @click="$router.go(-1)">返回</el-button>

            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="设备ID" prop="DeviceID">
                        <el-input v-model="form.DeviceID"></el-input>
                    </el-form-item>
                    <el-form-item label="服务提出时间" prop="StartTime">
                        <el-input v-model="form.StartTime"></el-input>
                    </el-form-item>
                    <el-form-item label="维修时间" prop="EndTime">
                        <el-input v-model="form.EndTime"></el-input>
                    </el-form-item>
                    <el-form-item label="故障类型" prop="FaultType">
                        <el-input v-model="form.FaultType"></el-input>
                    </el-form-item>
                    <el-form-item label="故障现象" prop="FaultPhenomenon">
                        <el-input v-model="form.FaultPhenomenon"></el-input>
                    </el-form-item>
                    <el-form-item label="可能产生的原因" prop="PossiblePhenomena">
                        <el-input v-model="form.PossiblePhenomena"></el-input>
                    </el-form-item>
                    <el-form-item label="排除方法" prop="Method">
                        <el-input v-model="form.Method"></el-input>
                    </el-form-item>
                    <el-form-item label="故障部件供应商" prop="LastSupplier">
                        <el-input v-model="form.LastSupplier"></el-input>
                    </el-form-item>

                    <el-form-item label="是否更换零部件" prop="IsReplace">
                        <el-select v-model="form.IsReplace" placeholder="请选择">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="更换部件供应商" prop="NewSupplier">
                        <el-input v-model="form.NewSupplier"></el-input>
                    </el-form-item>
                    <el-form-item label="维修费用" prop="Price">
                        <el-input v-model="form.Price"></el-input>
                    </el-form-item>
                    <el-form-item label="维修人" prop="RepairMan">
                        <el-input v-model="form.RepairMan" type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="More">
                        <el-input v-model="form.More" type="text"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="resetForm('form')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data';
export default {
    name: 'baseform',
    data() {
        return {
            options: regionData,
            form: {
                DeviceID: '',
                StartTime: '',
                EndTime: '',
                FaultType: '',
                FaultPhenomenon: '',
                PossiblePhenomena: '',
                Method: '',
                NewSupplier: '',
                LastSupplier: '',
                IsReplace: '',
                Price: '',
                More: '',
                RepairMan: ''
            },
            selectedOptions: ''
        };
    },
    methods: {
        onSubmit() {
            axios({
                method: 'post',
                url: '/addNewMaintenance',
                data: this.form
            })
                .then(res => {
                    window.console.log(res.data);
                    this.$message.success('提交成功！');
                    this.$refs.form.resetFields();

                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1000);
                })
                .catch(err => {});
        },
        handleChange() {
            this.form.Province = CodeToText[this.selectedOptions[0]];
            this.form.City = CodeToText[this.selectedOptions[1]];
            this.form.District = CodeToText[this.selectedOptions[2]];
            window.console.log(this.selectedOptions);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style scoped>
.form-box {
    margin: 0 auto;
}
</style>