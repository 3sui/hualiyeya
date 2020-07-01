<template>
  <div class="review">
    <div class="title">文档下载</div>

    <div class="content">
      <van-card v-for="file in filelist" :title="file.file_name" :thumb="imgpath">
        <template #desc>
          <span class="desc">{{'文档类型: '+file.type}}</span>
          <br />
          <span class="desc">{{'上传时间: '+file.created_time}}</span>
        </template>
        <template #footer>
          <van-button
            icon="down"
            size="small"
            type="info"
            round
            @click="download(file.file_path,file.file_name)"
          >下载</van-button>
        </template>
      </van-card>
    </div>
    <van-empty v-if="emptyshow" description="文档未上传，请联系管理员" />

    <div class="sub">
      <van-button round block type="info" class="quit" @click="back">返回</van-button>
    </div>
  </div>
</template>


<script>
import Imgpath from "../assets/img/document.jpg";
import { Button, Card, Empty } from "vant";

export default {
  name: "Review",
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
    [Empty.name]: Empty
  },
  data() {
    return {
      imgpath: "",
      filelist: [],
      emptyshow: false
    };
  },
  created() {
    this.imgpath = Imgpath;
    this.getFile();
  },
  mounted() {},

  methods: {
    //获取文档
    getFile() {
      let query = {
        id: this.$route.query.id
      };
      this.$axios.post("/mobile/files", query).then(res => {
        console.log(res.data.length);
        
        if (res.data !== null || res.data.length > 0) {
          console.log(111111);
          
          this.filelist = res.data;
        } else {
          console.log(2222222);
          
          this.emptyshow = true;
        }
      });
    },
    //下载文档
    download(path, file_name) {
      // console.log(11111111111111111);

      // let url = axios.defaults.baseURL+'/mobile/download/?path='+path
      // console.log(url);

      // var iframe = document.getElementById("myIframe");
      // if (iframe) {
      //   iframe.src = url;
      // } else {
      //   iframe = document.createElement("iframe");
      //   iframe.style.display = "none";
      //   iframe.src = url;
      //   iframe.id = "myIframe";
      //   document.body.appendChild(iframe);
      // }

      console.log(path);
      console.log(file_name);

      this.$axios({
        url: "/mobile/download",
        method: "post",
        responseType: "blob", // 服务器返回的数据类型
        data: {
          // 其他参数
          path: path,
          file_name: file_name
        }
      })
        .then(res => {
          // 关闭loading
          // this.loading = false
          console.log(res);
          // 此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
          // 检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可
          // 另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
          const content = res.data;
          const blob = new Blob([content], {
            type: "application/octet-stream"
          }); // 构造一个blob对象来处理数据
          const fileName = file_name; // 导出文件名
          // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          // IE10以上支持blob但是依然不支持download
          if ("download" in document.createElement("a")) {
            // 支持a标签download的浏览器
            const link = document.createElement("a"); // 创建a标签
            link.download = fileName; // a标签添加属性
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click(); // 执行下载
            URL.revokeObjectURL(link.href); // 释放url
            document.body.removeChild(link); // 释放标签
          } else {
            // 其他浏览器
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //返回
    back() {
      window.history.back();
    }
  }
};
</script>

<style scoped>
.review {
  height: 95vh;
  overflow-y: auto;
}
.title {
  text-align: center;
  line-height: 8vh;
  background-color: white;
  margin-bottom: 0.1rem;
}
/* 
.content {
  min-height: 77vh;
} */
.document {
  height: 96%;
  width: 96%;
  margin: 2%;
}
.van-card {
  border-bottom: 1px solid #f0f0f0;
}
.van-card__title {
  font-size: 0.9rem;
  margin: 0.6rem 0;
}

.desc {
  color: #848484;
}

.sub {
  width: 80%;
  margin: 1rem auto 2rem auto;
}
</style>