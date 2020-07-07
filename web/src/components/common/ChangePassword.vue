<!--
 * @Author: your name
 * @Date: 2020-07-03 13:33:17
 * @LastEditTime: 2020-07-03 15:33:17
 * @LastEditors: Please set LastEditors
 * @Description: 修改密码页面
 * @FilePath: \远程监控平台\web\src\components\common\ChangePassword.vue
--> 

<!--  -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 修改密码
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <el-form
                style="width: 600px;margin: 0 auto"
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangePassword',
    data() {
        var checkOld = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            }
            callback();
        };
        var checkNew = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var checkPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                oldPass: '',
                newPass: '',
                checkPass: ''
            },
            rules: {
                oldPass: [{ validator: checkOld, trigger: 'blur' }],
                newPass: [{ validator: checkNew, trigger: 'blur' }],
                checkPass: [{ validator: checkPass, trigger: 'blur' }]
            }
        };
    },

    components: {},

    computed: {},

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios({
                        method: 'post',
                        url: '/login/changePass',
                        data: this.ruleForm
                    }).then(res => {
                        if (res.data.success) {
                            this.$message.success(res.data.message);
                            localStorage.removeItem('ms_username');
                            this.$router.push('/login');
                        } else {
                            this.$message.error(res.data.message);
                            this.$refs[formName].resetFields();
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style scoped>
</style>
