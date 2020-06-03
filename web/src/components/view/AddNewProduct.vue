<!--
 * @Author: your name
 * @Date: 2020-05-06 14:19:13
 * @LastEditTime: 2020-05-27 16:40:32
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
                <el-breadcrumb-item>添加设备</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary" @click="$router.go(-1)">返回</el-button>

            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="设备ID" prop="DeviceID">
                        <el-input v-model="form.DeviceID"></el-input>
                    </el-form-item>
                    <el-form-item label="设备种类" prop="DeviceClass">
                        <el-select v-model="form.DeviceClass" placeholder="请选择">
                            <el-option label="干燥设备" value="干燥设备"></el-option>
                            <el-option label="液压设备" value="液压设备"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备名称" prop="DeviceName">
                        <el-input v-model="form.DeviceName"></el-input>
                    </el-form-item>
                    <el-form-item label="型号描述" prop="Model">
                        <el-input v-model="form.Model"></el-input>
                    </el-form-item>
                    <el-form-item label="出厂编号" prop="SerialNumber">
                        <el-input v-model="form.SerialNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="所属客户名称" prop="CustomerName">
                        <el-input v-model="form.CustomerName"></el-input>
                    </el-form-item>
                    <el-form-item label="客户行业" prop="CustomerIndustry">
                        <el-input v-model="form.CustomerIndustry"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="安装地址" prop="selectedOptions">
                        <el-cascader
                            size="large"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange"
                        ></el-cascader>
                    </el-form-item>-->
                    <el-form-item label="详细地址" prop="Address">
                        <el-input v-model="form.Address"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <el-upload
                            multiple
                            class="upload-demo"
                            ref="upload"
                            :action="axios.defaults.baseURL + '/upload'"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="form.fileListImg"
                            list-type="picture"
                            :limit="3"
                            :on-exceed="handleExceed"
                            :before-remove="beforeRemove"
                            :before-upload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess"
                            accept=".png, .jpg, .jpeg"
                        >
                            <el-button size="small" type="primary">选取文件</el-button>
                            <span slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB，最多上传3张图片</span>
                            <!-- <div slot="tip" class="el-upload__tip">{{axios.defaults.baseURL}}</div> -->
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传文档">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="axios.defaults.baseURL + '/upload'"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="form.fileListWord"
                            list-type="text"
                            :limit="3"
                            :on-exceed="handleExceed"
                            :before-remove="beforeRemove"
                            :before-upload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess"
                            accept=".pdf, .doc, .docx"
                        >
                            <el-button size="small" type="primary">选取文件</el-button>
                            <span slot="tip" class="el-upload__tip">只能上传pdf/word文件，且不超过2MB，最多上传3份文档</span>
                        </el-upload>
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
// import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data';
export default {
    name: 'AddNewProduct',
    data() {
        return {
            // options: regionData,
            form: {
                DeviceID: '',
                DeviceClass: '',
                DeviceName: '',
                Model: '',
                SerialNumber: '',
                CustomerName: '',
                CustomerIndustry: '',
                Address: '',
                Province: '',
                City: '',
                District: '',
                fileListImg: [],
                fileListWord: []
            },

            selectedOptions: ''
        };
    },
    methods: {
        onSubmit() {
            axios({
                method: 'post',
                url: '/addNewProduct',
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
        //文件列表移除文件时的钩子
        handleRemove(file, fileList) {
            axios({
                url: '/remove',
                method: 'post',
                data: {
                    file: file
                }
            })
                .then(res => {
                    window.console.log(res.data);
                })
                .catch(err => {});
            window.console.log(file, fileList);
        },
        //点击文件列表中已上传的文件时的钩子
        handlePreview(file) {
            console.log(file);
        },
        //文件超出个数限制时的钩子
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        //文件上传成功时的钩子
        handleAvatarSuccess(response, file, fileList) {
            window.console.log(response, file, fileList);
            this.form.fileListImg = fileList;
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
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
</style>