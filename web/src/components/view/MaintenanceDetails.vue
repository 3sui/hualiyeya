<!--
 * @Author: your name
 * @Date: 2020-05-06 10:56:10
 * @LastEditTime: 2020-05-11 17:24:08
 * @LastEditors: Please set LastEditors
 * @Description: 维修记录
 * @FilePath: \vue-manage-system\src\components\view\ProductDetails.vue
 -->
<!--  -->
<template>
    <div class>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i> 设备档案
                </el-breadcrumb-item>
                <el-breadcrumb-item>维修详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <el-button type="primary" class="handle-del mr10 mb-30" @click="$router.go(-1)">返回</el-button>
            <el-button type="primary" class="handle-del mr10 mb-30" @click="handelEdit">编辑</el-button>-->
            <div class="plugins-tips">设备维修详情</div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="demo-image__preview">
                        <el-image
                            style="width: 320px; height: 160px"
                            :src="url"
                            :preview-src-list="srcList"
                        ></el-image>
                    </div>

                    <div class="keyvalue">客户名称：{{deviceDetail.enterprise_name}}</div>
                    <div class="keyvalue">设备ID：{{deviceDetail.eq}}</div>
                    <div class="keyvalue">设备种类：{{deviceDetail.typename}}</div>
                    <div class="keyvalue">设备名称：{{deviceDetail.device_name}}</div>
                    <div class="keyvalue">设备厂家：{{deviceDetail.device_supplier}}</div>
                    <div class="keyvalue">设备型号：{{deviceDetail.device_model}}</div>
                    <div class="keyvalue">安装地址：{{deviceDetail.address}}</div>
                </el-col>
                <el-col :span="14" :offset="1">
                    <el-form
                        ref="form"
                        :model="form"
                        label-width="80px"
                        size="mini"
                        :disabled="editEnable"
                    >
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
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="故障现象">
                            <el-select v-model="form.phenomenon" placeholder="请选择故障现象">
                                <el-option
                                    v-for="phenomenon in choosefault"
                                    :label="phenomenon"
                                    :value="phenomenon"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="原因" :prop="cause">
                            <el-input v-model="form.cause"></el-input>
                        </el-form-item>
                        <el-form-item label="排除方法" :prop="methods">
                            <el-input v-model="form.methods"></el-input>
                        </el-form-item>
                        <el-form-item label="费用" :prop="cost">
                            <el-input v-model="form.cost" type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="维修人" :prop="repair_person">
                            <el-input v-model="form.repair_person" type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" :prop="repair_person_phone">
                            <el-input v-model="form.repair_person_phone" type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" :prop="more">
                            <el-input v-model="form.more" type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="维修时间" :prop="created_time">
                            <el-input v-model="form.created_time" type="text" disabled></el-input>
                        </el-form-item>
                    </el-form>
                    <el-row :gutter="20">
                        <el-col :offset="6" :span="3">
                            <el-button type="primary" size="meduim" @click="handelEdit">编辑</el-button>
                        </el-col>
                        <el-col :offset="2" :span="3">
                            <el-button
                                type="primary"
                                size="meduim"
                                @click="onSubmit"
                                :disabled="saveEnable"
                            >保存</el-button>
                        </el-col>
                        <el-col :offset="2" :span="3">
                            <el-button type="primary" size="meduim" @click="Cancel">取消</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MaintenanceDetails',
    data() {
        return {
            // tableData: {},
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
                'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            deviceDetail: {},

            form: {},
            faultType: [],
            choosefault: [],
            editEnable: true,
            saveEnable: true
        };
    },

    components: {},

    computed: {},
    created() {
        this.getDeviceIDAndInfo();
        this.getFaultType();
    },
    methods: {
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
            // console.log(1);
            for (var i = 0; i < this.faultType.length; i++) {
                if (this.faultType[i].fault_type === this.form.type) {
                    this.choosefault = this.faultType[i].fault_phenomenon;
                }
            }
        },
        getDeviceIDAndInfo() {
            // window.console.log(this.$route.query.id);
            axios({
                method: 'get',
                url: '/RepairInfo',
                params: {
                    id: this.$route.query.id
                }
            })
                .then(res => {
                    this.deviceDetail = res.data[0];
                    this.form = res.data[0];
                })
                .catch();
        },
        //提交
        handelEdit() {
            this.editEnable = false;
            this.saveEnable = false;
        },

        //保存
        onSubmit() {
            let query = {
                id: this.form.id,
                type: this.form.type,
                phenomenon: this.form.phenomenon,
                cause: this.form.cause,
                methods: this.form.methods,
                cost:this.form.cost,
                repair_person: this.form.repair_person,
                repair_person_phone: this.form.repair_person_phone,
                more: this.form.more,
            };
            this.$axios.post('UpdateRepair',query)
            .then(res=>{
                if(res){
                    this.$message.success('保存成功')
                    this.$router.go(-1);
                }    
            })
            
            .catch(err=>{
                console.log(err);
                
            })
            
        },

        //取消
        Cancel() {
            // console.log('submit!');
            this.$router.go(-1);
            // this.deviceDetail={}

            // this.form={}
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

.plugins-tips {
    font-size: 16px;
    margin: 10px auto;
}
.keyvalue {
    font-size: 12px;
    text-align: left;
    width: 100%;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.buttonbox {
    /* height: 40px; */
    margin: 20px auto;
}
</style>