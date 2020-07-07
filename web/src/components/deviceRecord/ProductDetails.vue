<!--
 * @Author: your name
 * @Date: 2020-05-06 10:56:10
 * @LastEditTime: 2020-07-03 16:57:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-manage-system\src\components\view\ProductDetails.vue
 -->
<!--  -->
<template>
    <div class>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-copy"></i>
                    设备列表
                </el-breadcrumb-item>
                <el-breadcrumb-item>设备详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="mb-2 d-flex jc-between">
                <div>
                    <el-button
                        type="primary"
                        icon="el-icon-lx-back"
                        class="handle-del mr10 mb-30"
                        @click="$router.go(-1)"
                    >返回</el-button>
                </div>
                <!-- <el-button type="primary" icon="el-icon-edit" class="handle-del mr10 mb-30">编辑</el-button> -->
                <div style="float: right;display:flex;margin-bottom: 10px">
                    <div>
                        <el-upload
                            multiple
                            :headers="getAuthHeaders()"
                            class="upload-demo"
                            ref="uploadWord"
                            action
                            :http-request="uploading"
                            :file-list="fileListWord"
                            list-type="text"
                            :limit="1"
                            :on-exceed="handleExceed3"
                            :before-remove="beforeRemove"
                            accept=".pdf, .doc, .docx"
                            :auto-upload="false"
                        >
                            <el-button size="small" type="primary">上传文档</el-button>

                            <!-- <span slot="tip" class="el-upload__tip ml-2">只能上传pdf/word文件，且不超过2MB，最多上传3份文档</span> -->
                        </el-upload>
                        <div v-if="percentage1">
                            校验进度
                            <el-progress :percentage="percentage1"></el-progress>
                        </div>
                        <div v-if="percentage2">
                            上传进度
                            <el-progress :percentage="percentage2"></el-progress>
                        </div>
                    </div>
                    <div>
                        <el-button
                            class="ml-3"
                            size="small"
                            type="primary"
                            @click="()=>{$refs['uploadWord'].submit()}"
                        >确认上传</el-button>
                    </div>
                </div>
            </div>
            <div class="plugins-tips">设备信息</div>
            <el-row :gutter="20" class="mb-30" v-if="tableData.info">
                <el-col :span="12">
                    <div class="ml-50">
                        <p>设备ID: {{tableData.info.eq}}</p>
                        <p>工作状态: {{tableData.info.status}}</p>
                        <p>设备名称: {{tableData.info.device_name}}</p>
                        <p>型号描述: {{tableData.info.device_description}}</p>
                        <p>设备种类: {{tableData.info.typename}}</p>
                        <p>创建人: {{tableData.info.created_by}}</p>
                        <p>创建日期: {{tableData.info.created_time}}</p>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="ml-50">
                        <p>开关机:{{tableData.info.is_on == 0? '关机': '开机'}}</p>
                        <p>客户名称:{{tableData.info.device_supplier}}</p>
                        <p>安装地址:{{tableData.info.address}}</p>
                        <div class="demo-image__preview">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="tableData.imgList[0]?(axios.defaults.baseURL.slice(0, -4) + tableData.imgList[0].file_path.split('.').shift()):''"
                                :preview-src-list="srcList"
                            >
                                <div
                                    slot="error"
                                    class="image-slot"
                                    style="width: 100px; height: 100px;font-size: 30px;background-color: #f5f7fa;color: #909399;text-align: center;line-height: 100px"
                                >
                                    <i class="el-icon-picture-outline"></i>
                                    <!-- <i>您没有上传图片</i> -->
                                </div>
                            </el-image>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="plugins-tips">设备文档</div>
            <div class="d-flex ai-start jc-start flex-wrap px-5">
                <a
                    target="_blank"
                    :href="axios.defaults.baseURL.slice(0, -4) + item.file_path"
                    :underline="false"
                    style="margin: 15px 15px 0 0"
                    v-for="(item, index) in tableData.wordList"
                    :key="index"
                >
                    <el-button size="mini" type="warning">{{item.file_name}} 下载</el-button>
                </a>
            </div>
            <div class="plugins-tips mt-5">维修记录</div>
            <el-timeline>
                <el-timeline-item
                    :timestamp="item.date"
                    placement="top"
                    v-for="(item, index) in tableData.repair"
                    :key="index"
                >
                    <el-card>
                        <el-table :data="[item]" style="width: 100%">
                            <el-table-column label="服务提出时间" width="180">
                                <template slot-scope="scope">
                                    <div>{{scope.row.created_time}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="故障类型" width="180">
                                <template slot-scope="scope">
                                    <div>{{scope.row.type}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="故障现象" width="180">
                                <template slot-scope="scope">
                                    <div>{{scope.row.phenomenon}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="可能产生的原因">
                                <template slot-scope="scope">
                                    <div>{{scope.row.cause}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="排除办法">
                                <template slot-scope="scope">
                                    <div>{{scope.row.methods}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="维修人" width="180">
                                <template slot-scope="scope">
                                    <div>{{scope.row.repair_person}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- <table>
                            <thead>
                                <tr>
                                    <th>服务提出时间</th>
                                    <th>故障类型</th>
                                    <th>故障现象</th>
                                    <th>可能产生的原因</th>
                                    <th>排除办法</th>
                                    <th>维修人</th>
                                </tr>
                                <tr>
                                    <td>{{item.created_time}}</td>
                                    <td>{{item.type}}</td>
                                    <td>{{item.phenomenon}}</td>
                                    <td>{{item.cause}}</td>
                                    <td>{{item.methods}}</td>
                                    <td>{{item.repair_person}}</td>
                                </tr>
                            </thead>
                        </table>-->
                        <p class="mt-10">备注: {{item.More}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import SparkMD5 from 'spark-md5';
export default {
    name: 'productDetails',
    data() {
        return {
            tableData: {},
            maintenanceList: [],
            srcList: [],
            fileListWord: [],
            percentage1: 0,
            percentage2: 0
        };
    },
    created() {
        this.getDeviceIDAndInfo();
    },
    components: {},

    computed: {},

    methods: {
        getDeviceIDAndInfo() {
            window.console.log(this.$route.query.id);
            axios({
                method: 'get',
                url: '/device/getDeviceInfo',
                params: {
                    id: this.$route.query.id
                }
            })
                .then(res => {
                    window.console.log(res.data);
                    if (res.data.success) {
                        this.$set(this.tableData, 'info', res.data.info[0]);
                        this.$set(this.tableData, 'imgList', res.data.imgList);
                        this.$set(this.tableData, 'wordList', res.data.wordList);
                        this.$set(this.tableData, 'repair', res.data.repair);

                        res.data.imgList.forEach(item => {
                            this.srcList.push(axios.defaults.baseURL.slice(0, -4) + item.file_path.split('.').shift() || '');
                        });
                        // this.tableData.info = res.data.info[0];
                        window.console.log(this.tableData);
                    }
                })
                .catch();
        },
        handleExceed3(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        uploading(params) {
            let id = this.$route.query.id;
            window.console.log(params.file);
            let _this = this;
            let baseUrl = axios.defaults.baseURL;
            // for(let i in params.)
            let chunkSize = 5 * 1024 * 1024;
            let fileSize = 0;
            let file = null;
            let hasUploaded = 0;
            let chunks = 0;
            let spark = new SparkMD5.ArrayBuffer();
            // window.console.log(456);

            file = params.file;
            fileSize = file.size;
            responseChange(file);

            // 0.响应点击
            async function responseChange(file) {
                // 第一步：按照 修改时间+文件名称+最后修改时间-->MD5
                // 显示文件校验进度
                // $('#process1').slideDown(200);
                // 开始校验
                let fileMd5Value = await md5File(file);
                window.console.log(123);

                // 第二步：校验文件的MD5
                window.console.log(123);

                let result = await checkFileMD5(file.name, fileMd5Value);
                window.console.log(456);
                // 如果文件已存在, 就秒传
                if (result.file) {
                    _this.percentage1 = 0;

                    _this.percentage2 = 0;
                    _this.$refs['uploadWord'].clearFiles();

                    _this.$message.warning('文件已存在');
                    return;
                }
                // let exit = false
                // 显示文件上传进度
                // $('#process2').slideDown(200);
                // 第三步：检查并上传MD5
                await checkAndUploadChunk(fileMd5Value, result.chunkList);
                // 第四步: 通知服务器所有分片已上传完成
                notifyServer(fileMd5Value);
            }

            // 1.修改时间+文件名称+最后修改时间-->MD5
            function md5File(file) {
                return new Promise((resolve, reject) => {
                    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                        //chunkSize = 2097152, // Read in chunks of 2MB
                        chunkSize = file.size / 100,
                        //chunks = Math.ceil(file.size / chunkSize),
                        chunks = 100,
                        currentChunk = 0,
                        spark = new SparkMD5.ArrayBuffer(),
                        fileReader = new FileReader();

                    fileReader.onload = function(e) {
                        // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
                        spark.append(e.target.result); // Append array buffer
                        currentChunk++;

                        if (currentChunk < chunks) {
                            loadNext();
                        } else {
                            let cur = +new Date();
                            console.log('finished loading');
                            // alert(spark.end() + '---' + (cur - pre)); // Compute hash
                            let result = spark.end();
                            resolve(result);
                        }
                    };

                    fileReader.onerror = function() {
                        console.warn('oops, something went wrong.');
                    };

                    function loadNext() {
                        var start = currentChunk * chunkSize,
                            end = start + chunkSize >= file.size ? file.size : start + chunkSize;

                        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
                        _this.percentage1 = currentChunk + 1;
                        // $('#checkProcessStyle').css({
                        //     width: currentChunk + 1 + '%'
                        // });
                        // $('#checkProcessValue').html(currentChunk + 1 + '%');
                        // $("#tip").html(currentChunk)
                    }

                    loadNext();
                });
            }
            // 2.校验文件的MD5
            function checkFileMD5(fileName, fileMd5Value) {
                return new Promise((resolve, reject) => {
                    let url = baseUrl + '/check/file?fileName=' + fileName + '&fileMd5Value=' + fileMd5Value;
                    // window.console.log(_this.$axios);
                    _this
                        .$axios({
                            method: 'get',
                            url: url
                        })
                        .then(res => resolve(res.data));
                    // $.getJSON(url, function(data) {
                    //     resolve(data);
                    // });
                });
            }
            // 3.上传chunk
            async function checkAndUploadChunk(fileMd5Value, chunkList) {
                chunks = Math.ceil(fileSize / chunkSize);
                hasUploaded = chunkList.length;
                for (let i = 0; i < chunks; i++) {
                    let exit = chunkList.indexOf(i + '') > -1;
                    // 如果已经存在, 则不用再上传当前块
                    if (!exit) {
                        let index = await upload(i, fileMd5Value, chunks);
                        hasUploaded++;
                        let radio = Math.floor((hasUploaded / chunks) * 100);
                        _this.percentage2 = radio;
                        // $('#uploadProcessStyle').css({
                        //     width: radio + '%'
                        // });
                        // $('#uploadProcessValue').html(radio + '%');
                    }
                }
            }

            // 3-2. 上传chunk
            function upload(i, fileMd5Value, chunks) {
                return new Promise((resolve, reject) => {
                    //构造一个表单，FormData是HTML5新增的
                    let end = (i + 1) * chunkSize >= file.size ? file.size : (i + 1) * chunkSize;
                    let form = new FormData();
                    form.append('data', file.slice(i * chunkSize, end)); //file对象的slice方法用于切出文件的一部分
                    form.append('total', chunks); //总片数
                    form.append('index', i); //当前是第几片
                    form.append('fileMd5Value', fileMd5Value);
                    _this
                        .axios({
                            url: baseUrl + '/uploads',
                            method: 'POST',
                            data: form, //刚刚构建的form数据对象
                            //async: true, //异步
                            processData: false //很重要，告诉jquery不要对form进行处理
                            //contentType: false, //很重要，指定为false才能形成正确的Content-Type
                            // success: function(data) {
                            //     resolve(data.desc);
                            // }
                        })
                        .then(res => {
                            resolve(res.data.desc);
                        });
                });
            }

            // 第四步: 通知服务器所有分片已上传完成
            function notifyServer(fileMd5Value) {
                let url = baseUrl + '/merge?md5=' + fileMd5Value + '&fileName=' + file.name + '&size=' + file.size + '&deviceId=' + id;
                _this
                    .$axios({
                        method: 'get',
                        url: url
                    })
                    .then(res => {
                        _this.percentage1 = 0;
                        _this.percentage2 = 0;
                        _this.$refs['uploadWord'].clearFiles();
                        _this.$message.success('文件上传成功');
                        _this.getDeviceIDAndInfo()
                    });
                // $.getJSON(url, function(data) {
                //     alert('上传成功');
                // });
            }

            function getDate() {
                let d = new Date();
                return d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getMilliseconds();
            }
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
</style>