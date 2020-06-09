<!--
 * @Author: your name
 * @Date: 2020-05-06 14:19:13
 * @LastEditTime: 2020-06-08 09:31:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-manage-system\src\components\view\AddNewProduct.vue
 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 设备档案
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加维修记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary" @click="$router.go(-1)">返回</el-button>

            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="企业名称" prop="enterprise_id">
                        <el-select
                            v-model="enterprise_id"
                            placeholder="请选择企业"
                            @change="getDevices(enterprise_id)"
                        >
                            <el-option
                                v-for="enterprise in enterprises"
                                :label="enterprise.enterprise_name"
                                :value="enterprise.id"
                                :key="enterprise"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备ID" prop="device_id">
                        <el-autocomplete
                            v-model="eq"
                            class="inline-input"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入设备ID"
                            @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="故障类型">
                        <el-select
                            v-model="form.type"
                            placeholder="请选择故障类型"
                            @change="handelchoosefault"
                        >
                            <el-option
                                v-for="(type,index) in faultType"
                                :label="type.fault_type"
                                :value="type.fault_type"
                                :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="故障现象">
                        <el-select v-model="form.phenomenon" placeholder="请选择故障现象">
                            <el-option
                                v-for="phenomenon in choosefault"
                                :label="phenomenon"
                                :value="phenomenon"
                                :key="phenomenon"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="可能产生的原因" prop="cause">
                        <el-input v-model="form.cause"></el-input>
                    </el-form-item>
                    <el-form-item label="排除方法" prop="methods">
                        <el-input v-model="form.methods"></el-input>
                    </el-form-item>

                    <el-form-item label="维修人" prop="repair_person">
                        <el-input v-model="form.repair_person" type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="more">
                        <el-input v-model="form.more" type="text"></el-input>
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
    name: 'AddRepair',
    data() {
        return {
            enterprise_id: '',
            enterprises: [],
            devices: [],
            faultType: [],
            choosefault: [],
            eq: '',
            // selectedfaultType: '',

            //options: regionData,
            form: {},
            selectedOptions: ''
        };
    },
    computed: {},
    created() {
        this.getEnterprises();
        this.getFaultType();
    },
    mounted() {},
    methods: {
        //获取企业选项
        getEnterprises() {
            this.$axios
                .get('/Enterprise')
                .then(res => {
                    // console.log(res.data);
                    this.enterprises = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取设备ID
        getDevices(value) {
            // console.log(value);

            this.$axios
                .post('/Devices', { enterprise_id: value })
                .then(res => {
                    console.log(res);
                    this.devices = res.data;
                    console.log(this.devices);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        //获取故障类型、故障现象选项
        getFaultType() {
            this.$axios
                .get('/FaultTypeChoose')
                .then(res => {
                    console.log(res.data);
                    this.faultType = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        //处理选择故障类型和故障现象
        handelchoosefault() {
            console.log(1);
            for (var i = 0; i < this.faultType.length; i++) {
                if (this.faultType[i].fault_type === this.form.type) {
                    this.choosefault = this.faultType[i].fault_phenomenon;
                }
            }
        },

        onSubmit() {
            if (this.enterprise_id == null || this.enterprise_id == 0) {
                this.$message.error(`请选择企业名称`);
            } else if (this.form.device_id == 0 || this.form.device_id == null) {
                this.$message.error(`请选择设备ID`);
            } else if (this.form.type == '' || this.form.type == null) {
                this.$message.error(`请选择故障类型`);
            } else if (this.form.phenomenon == '' || this.form.phenomenon == null) {
                this.$message.error(`请选择故障现象`);
            } else {
                // let date = new Date();
                // this.form.created_time = date.getTime();
                axios({
                    method: 'post',
                    url: '/AddRepair',
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
            }
        },
        // handleChange() {
        //     this.form.Province = CodeToText[this.selectedOptions[0]];
        //     this.form.City = CodeToText[this.selectedOptions[1]];
        //     this.form.District = CodeToText[this.selectedOptions[2]];
        //     window.console.log(this.selectedOptions);
        // },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$router.go(-1)
        },
        //过滤搜索，queryString必须包含有value键值对
        querySearch(queryString, cb) {
            var devices = this.devices;
            var results = queryString ? devices.filter(this.createFilter(queryString)) : devices;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return devices => {
                return devices.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
            };
        },

        handleSelect(item) {
            this.form.device_id = item.id;
        }
    }
};
</script>
<style scoped>
.form-box {
    margin: 0 auto;
}
</style>