<!--
 * @Author: your name
 * @Date: 2020-05-07 14:51:42
 * @LastEditTime: 2020-05-07 15:47:56
 * @LastEditors: Please set LastEditors
 * @Description: 导入手册
 * @FilePath: \vue-manage-system\src\components\view\ImportingBooklet.vue
 -->
 <template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 上传
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://jsonplaceholder.typicode.com/api/posts/"
                    multiple
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过500kb</div>
                </el-upload>
            </div>
        </div>
    </div>
</template>
 
 <script>
export default {
    name: 'ImportingBooklet',
    data() {
        return {
            fileList: [
                {
                    name: 'food.jpeg',
                    url:
                        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                },
                {
                    name: 'food2.jpeg',
                    url:
                        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ]
        };
    },

    components: {},

    computed: {},

    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
};
</script>
 <style scoped>
.el-upload--text {
    width: 0;
    height: 0;
}
</style>
