<!--
 * @Author: your name
 * @Date: 2020-06-12 09:13:08
 * @LastEditTime: 2020-06-28 01:53:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\src\components\deviceRecord\DeviceSettings.vue
--> 
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 设备档案
                </el-breadcrumb-item>
                <el-breadcrumb-item>测点配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <div v-for="(item, index) in form.point" :key="index" class="point">
                        <p class="point-title">测点{{index +1}}</p>
                        <el-form-item label="测点标识号">
                            <el-input v-model="item.cp_id" disabled></el-input>
                        </el-form-item>
                        <el-form-item
                            label="测点名称"
                            :prop="'point.'+ index  + '.cp_name'"
                            :rules="{
      required: true, message: '测点名称不能为空', trigger: 'blur'
    }"
                        >
                            <el-input v-model="item.cp_name"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="测点单位"
                            :prop="'point.'+ index  + '.unit'"
                            :rules="{
      required: true, message: '测点单位不能为空', trigger: 'blur'
    }"
                        >
                            <el-input v-model="item.unit"></el-input>
                        </el-form-item>
                        <!-- <el-form-item
                            label="计算系数值"
                            :prop="'point.'+ index  + '.k'"
                            :rules="{
      required: true, message: '计算系数值不能为空', trigger: 'blur'
    }"
                        >
                            <el-input v-model="item.k"></el-input>
                        </el-form-item>-->
                        <el-form-item
                            label="量程上限值"
                            :prop="'point.'+ index  + '.up'"
                            :rules="{
      required: true, message: '量程上限值不能为空', trigger: 'blur'
    }"
                        >
                            <el-input v-model="item.up"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="量程下限值"
                            :prop="'point.'+ index  + '.down'"
                            :rules="{
      required: true, message: '量程下限值不能为空', trigger: 'blur'
    }"
                        >
                            <el-input v-model="item.down"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="报警上限值"
                            :prop="'point.'+ index  + '.limit_up'"
                            :rules="{
      required: true, message: '上限值不能为空', trigger: 'blur'
    }"
                        >
                            <el-input v-model="item.limit_up"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="报警下限值"
                            :prop="'point.'+ index  + '.limit_down'"
                            :rules="{
      required: true, message: '下限值不能为空', trigger: 'blur'
    }"
                        >
                            <el-input v-model="item.limit_down"></el-input>
                        </el-form-item>
                    </div>
                    <div style="text-align: right">
                        <el-button @click="submitForm('form')">提交</el-button>
                        <div style="text-align: center">
                            <el-button @click="addNewPoint">新增</el-button>
                            <el-button @click="deletePoint">删除</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddNewProduct',
    data() {
        return {
            // options: regionData,
            form: {
                point: [
                    {
                        cp_id: 'cp1',
                        cp_name: '',
                        unit: '',
                        up: '',
                        down: '',
                        limit_up: '',
                        limit_down: ''
                    }
                ],
                eq: ''
            }
        };
    },
    created() {
        // this.fetchCaseInfo();
    },
    methods: {
        addNewPoint() {
            if (this.form.point.length > 5) {
                this.$message.error('最多创建6个测点');
                return;
            }
            this.form.point.push({
                cp_id: 'cp' + (this.form.point.length + 1),
                cp_name: '',
                unit: '',
                up: '',
                down: '',
                limit_up: '',
                limit_down: ''
            });
        },
        deletePoint() {
            if (this.form.point.length == 1) {
                return;
            }
            this.form.point.pop();
        },
        submitForm(formName) {
            this.form.eq = this.$route.query;

            window.console.log(this.form.eq);
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios({
                        method: 'post',
                        url: '/device/settings',
                        data: this.form
                    })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.success) {
                                this.$message.success(res.data.message);
                                this.$router.push('/deviceList');
                            }
                        })
                        .catch(err => {});
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>
<style scoped>
.form-box {
    margin: 0 auto;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.point {
    padding: 20px 25px 20px 0;
    border: 1px solid #ebeef5;
    border-radius: 4px;
}
.point-title {
    font-size: 16px;
    margin: 10px 0;
    padding-left: 20px;
}
</style>