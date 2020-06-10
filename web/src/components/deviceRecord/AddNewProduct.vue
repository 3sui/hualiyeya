<!--
 * @Author: your name
 * @Date: 2020-05-06 14:19:13
 * @LastEditTime: 2020-06-10 17:29:58
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
                    <el-form-item label="设备ID" prop="eq">
                        <el-input v-model="form.eq" placeholder="例: 123456"></el-input>
                    </el-form-item>

                    <el-form-item label="设备名称" prop="device_name">
                        <el-input v-model="form.device_name" placeholder="例: 设备一"></el-input>
                    </el-form-item>
                    <el-form-item label="设备型号" prop="device_description">
                        <el-input v-model="form.device_model" placeholder="例: iphone11"></el-input>
                    </el-form-item>
                    <el-form-item label="型号描述" prop="device_description">
                        <el-input
                            type="textarea"
                            v-model="form.device_description"
                            placeholder="例: 这是一个设备"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备种类" prop="device_type">
                        <el-select v-model="form.device_type" placeholder="请选择设备种类">
                            <el-option
                                v-for="item in type"
                                :key="item.id"
                                :label="item.typename"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属企业" prop="enterprise_id">
                        <el-select
                            v-model="form.enterprise_id"
                            placeholder="请选择所属企业"
                            @change="fetchUserInfo(form.enterprise_id)"
                        >
                            <el-option
                                v-for="item in enterprise"
                                :key="item.id"
                                :label="item.enterprise_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备负责人" prop="principal">
                        <el-select v-model="form.principal" placeholder="请选择负责人" :disabled="isTrue">
                            <el-option
                                v-for="item in user.filter(item => item.id == user_e)"
                                :key="item.id"
                                :label="item.username"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备厂家" prop="device_supplier">
                        <el-input v-model="form.device_supplier" placeholder="例: 航天云网"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="form.address" placeholder="例: 江苏省常州市竹林北路265号"></el-input>
                    </el-form-item>

                    <el-form-item label="上传图片">
                        <el-upload
                            multiple
                            :data="newDeviceId"
                            :headers="getAuthHeaders()"
                            class="upload-demo"
                            ref="uploadImg"
                            :action="axios.defaults.baseURL + '/device/upload'"
                            :on-remove="handleRemove"
                            :file-list="form.fileListImg"
                            list-type="picture-card"
                            :limit="6"
                            :on-exceed="handleExceed"
                            :before-remove="beforeRemove"
                            :before-upload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess"
                            accept=".png, .jpg, .jpeg"
                            :auto-upload="false"
                            :on-change="clickImgUpload"
                        >
                            <i class="el-icon-plus"></i>
                            <div
                                slot="tip"
                                class="el-upload__tip ml-2"
                            >只能上传jpg/png文件，且不超过2MB，最多上传3张图片</div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="上传文档">
                        <el-upload
                            class="upload-demo"
                            ref="uploadWord"
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
                            :auto-upload="false"
                        >
                            <el-button size="small" type="primary">选取文件</el-button>
                            <span
                                slot="tip"
                                class="el-upload__tip ml-2"
                            >只能上传pdf/word文件，且不超过2MB，最多上传3份文档</span>
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
                eq: '',
                device_name: '',
                device_description: '',
                device_type: '',
                device_supplier: '',
                address: '',
                device_model: '',
                principal: []
            },

            selectedOptions: '',
            type: [],
            enterprise: [],
            user: [],
            isTrue: true,
            user_e: '',
            dialogImageUrl: '',
            dialogVisible: false,
            newDeviceId: { id: 1 }
        };
    },
    created() {
        this.fetchCaseInfo();
    },
    methods: {
        fetchCaseInfo() {
            axios({
                method: 'get',
                url: '/device/fetchCaseInfo'
            })
                .then(res => {
                    window.console.log(res.data);
                    this.type = res.data.type;
                    this.enterprise = res.data.enterprise;
                    this.user = res.data.user;
                })
                .catch(err => {});
        },
        fetchUserInfo(e) {
            // this.user = this.user;
            this.form.principal = '';
            this.user_e = e;
            this.isTrue = false;
            window.console.log(e);
        },

        onSubmit() {
            // let newDeviceId;
            // axios({
            //     method: 'post',
            //     url: '/device/addNewProduct',
            //     data: this.form
            // })
            //     .then(res => {
            //         window.console.log(res.data);
            //         if (res.data.success) {
            //             this.$message.success(res.data.message);
            //             newDeviceId = res.data.insertId;
            //             this.$refs.form.resetFields();
            //         }
            //     })
            //     .then(res => {
            //         window.console.log(res.data);
            //     })
            //     .catch(err => {});
            this.$refs.uploadImg.submit();
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
        },

        //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        clickImgUpload(file, fileList) {}
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