<!--
 * @Author: your name
 * @Date: 2020-05-06 14:19:13
 * @LastEditTime: 2020-06-05 10:41:48
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
                    <el-form-item label="企业名称">
                        <el-select v-model="form.enterprise_id" placeholder="请选择企业">
                            <el-option
                                v-for="enterprise in enterprises"
                                :label="enterprise.enterprise_name"
                                :value="enterprise.id"
                                :key="enterprise"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备ID"  :prop="DeviceID">
                        <el-autocomplete
                            class="inline-input"
                            v-model="DeviceID"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            @select="handleSelect"
                        ></el-autocomplete>
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
    name: 'AddRepair',
    data() {
        return {
            enterprises: [],
            devicetypes: [],
            devices: [],
         
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
    created() {
        this.getEnterprises();
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
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
        },
         querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    }
    
};
</script>
<style scoped>
.form-box {
    margin: 0 auto;
}
</style>