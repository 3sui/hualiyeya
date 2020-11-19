<template>
  <div class="devicemanage">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">设备管理</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <!-- <van-icon name="bell" dot /> -->
          </span>
        </van-col>
      </van-row>
    </div>
    <van-row class="main">
      <van-col span="8" :style="{color:'#53CFE9'}">
        <div class="img">
          <div class="img_icon">
            <van-icon size="1.5rem" name="bar-chart-o" />
          </div>
        </div>
        <h3>{{deviceNum}}</h3>
        <p>设备数</p>
      </van-col>
      <van-col span="8" class="second" :style="{color:'#69D3AB'}">
        <div class="img">
          <div class="img_icon">
            <van-icon size="1.5rem" name="tv-o" />
          </div>
        </div>
        <h3>{{device_isonNum}}</h3>
        <p>运行数</p>
      </van-col>
      <van-col span="8" :style="{color:'#EB6379'}">
        <div class="img">
          <div class="img_icon">
            <van-icon size="1.5rem" name="warn-o" />
          </div>
        </div>
        <h3>{{device_alarmNum}}</h3>
        <p>报警设备数</p>
      </van-col>
    </van-row>

    <van-search
    class="search-item"
      v-model="value"
      shape="round"
      background="#ffffff"
      placeholder="搜索设备名称、出厂编号"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />

    <div class="device_container">
      <div
        class="device_item"
        v-for="device in devicelist"
        @click="goDeviceDetail(device.id,device.file_path)"
      >
        <van-row :gutter="20">
          <van-col span="8">
            <div class="img">
              <van-image width="100%" height="100%" fit="contain" :src="Iamge(device.file_path)" />
            </div>
          </van-col>
          <van-col span="16">
            <h3>
              <van-icon color="#007ACC" size="1.2rem" name="user-circle-o" />
              {{device.device_name}}
            </h3>
            <div class="speci">
              <div>
            <p>出厂编号:{{device.eq}}</p>
            <p>测点数:{{device.count?device.count:0}}</p></div>
           
            <div class="state" :class="device.status==='正常'?'nomalstate':(device.status==='报警'?'alarmstate':'nostate')">{{device.status}}</div>
            </div> 
          </van-col>
          <!-- <van-col span="5">
            <div class="state" :class="device.status==='正常'?'nomalstate':(device.status==='报警'?'alarmstate':'nostate')">{{device.status}}</div>
          </van-col> -->
        </van-row>
      </div>
    </div>

    <van-empty v-if="devicelist.length===0?true:false" description="未获取设备信息" />
      <van-pagination
      v-model="currentPage"
      :total-items="totalitems"
      :show-page-size="3"
      force-ellipses
      @change="HandleChange"
   
    />
  </div>
</template>
<script>
import imgUrl from "../assets/img/device.jpg";
import {
  Col,
  Row,
  Toast,
  Icon,
  Divider,
  Form,
  Search,
  Image as VanImage,
  Empty,
  Pagination
} from "vant";
export default {
  name: "DeviceManage",
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Form.name]: Form,
    [Search.name]: Search,
    [VanImage.name]: VanImage,
    [Empty.name]: Empty,
    [Pagination.name]: Pagination,
  },
  data() {
    return {
      value: "",
      devicelist: [],
      deviceNum: 0,
      device_isonNum: 0,
      device_alarmNum: 0,
      currentPage: 1,
      totalitems: 0,
     
    };
  },
  created() {
    this.getData();
  },
  mounted() {
  },

  methods: {
    //图片路径地址转换
    Iamge(path) {
      let userAvatar = "";
      if (path) {
        userAvatar = axios.defaults.baseURL.slice(0, -4) + path.substring(0,path.lastIndexOf("."));
      }

      return path !== null ? userAvatar : imgUrl;
    },
    //获取企业id
    // getEnterprise() {
    //   let username = localStorage.getItem("ms_username");
    //   console.log(username);
    // },
    // 获取设备列表数据
    getData() {
         let data={
        startid:(this.currentPage - 1) * 10,
        keyword:this.value
      }
      axios({
        method: "post",
        url: "/mobile/devicelist",
        data:data
      })
        .then(res => {
          // console.log(res);
          if (res.data.count>=0) {
            this.totalitems=res.data.count; 
            this.deviceNum=res.data.count; 
            this.device_isonNum=res.data.device_isonNum; 
            this.device_alarmNum=res.data.device_alarmNum; 
            this.devicelist = res.data.data;
          } 
        })
        .catch(error=>{
          console.log(errpr);
        })
    },

    //获取测点数
    // getPointNum:function(eq) {
    //   return this.$axios.post("/mobile/devicepointcount", { eq: eq });
    // .then(res => {
    //   if (res.data !== null || res.data.length > 0) {
    //     console.log(res.data[0].count);
    //     this.count = res.data[0].count;
    //   } else {
    //     this.count = 0;
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    // },

    //获取设备图片地址
    // getImage:function(id) {
    // console.log(id);

    // return this.$axios.post("/mobile/deviceimg", { id: id });
    // .then(res => {
    //   if (res.data !== null || res.data.length > 0) {
    //     console.log(res.data[0].file_path);

    //     this.file_path = res.data[0].file_path;
    //   } else {
    //     this.file_path = "";
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    // },

    //搜索
    onSearch() {
      // this.devicelist = this.devicelist.filter(array => {
      //   return array.device_name.match(val) || array.eq.match(val);
      // });

      this.currentPage=1;
      this.getData()
    },

    //取消
    onCancel() {
      this.value = "";
      this.currentPage=1

      this.devicelist = [];
      this.getData();
      // location.reload();
    },

    //查看设备详情
    goDeviceDetail(id,url) {
      this.$router.push({
        path: "/DeviceDetail",
        query: {
          id: id,
          file_path:url
        }
      });
    },
      //换页
    HandleChange() {
      // this.$router.push({
      //   path:'/RepairRecord',
      //   query:{
        // page:this.currentPage
      //   }
      // })
      this.devicelist=[]
      this.getData()
    },
  }
};
</script>

<style scoped >
.devicemanage {
  background-color: #f0f0f0;
  height: 95vh;
  overflow-y:auto
}
.devicemanage .header {
  background-color: white;
  height: 8vh;
  margin-bottom: 0.5vh;
}
.devicemanage .title {
  font-size: 1.2rem;
  font-weight: bold;
  padding-left: 1rem;
  line-height: 8vh;
}

.devicemanage .alarm {
  font-size: 1.5rem;
  font-weight: bold;
  padding-right: 1rem;
  line-height: 8vh;
  color: #1989fa;
}
.devicemanage .main {
  background-color: white;
  margin-bottom: 0.5vh;
  padding: 1rem 0;
}
.devicemanage .main img {
  width: 20%;
  margin: auto;
  text-align: center;
}

.devicemanage .main h3 {
  font-weight: bolder;
  text-align: center;
  margin: 0.3rem auto;
  font-size: 1.8rem;
}

.devicemanage .main p {
  text-align: center;
  margin: 0.2rem auto;
  color: #cccccc;
  font-size: 0.8rem;
}

.devicemanage .main .img {
  height: 1.5rem;
}
.devicemanage .main .second {
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
}

.devicemanage .main .img_icon {
  width: 1.5rem;
  margin: 1rem auto;
  line-height: 1rem;
  text-align: center;
}
.devicemanage .device_container {
  padding: 0 0 2rem 0;
}

.devicemanage .device_item {
  padding: 0.5rem;
  background-color: white;
  margin-bottom: 1rem;
  height: 6rem;
}

.devicemanage .device_item .img {
  width: 85%;
  height: 6rem;
  margin: auto;
  /* padding: 2rem 0; */
}

.devicemanage .device_item h3 {
  height: 3rem;
  line-height: 3rem;
  margin: 0;
  font-size:1rem ;
}

.devicemanage .device_item p {
  color: #747474;
  font-size: 0.8rem;
  height: 1.5rem;
  line-height: 1.5rem;
  margin: 0;
}
.devicemanage .device_item .state {
  text-align: left;
  font-size: 1rem;
  /* height: 7rem;
  line-height: 7rem; */
  word-wrap: break-word;
  /* color: #0dbc79; */
  font-weight: bold;
}

.devicemanage .device_item  .alarmstate{
   color: #EB6379;
}
.devicemanage .device_item .nomalstate{
color: #0dbc79;
}

.devicemanage .device_item .nostate{
color:#848484;
}



.search-item{
  padding-left:  1rem;
  padding-right:1rem;
}

.search-item .van-search__action{
/* background-color:  #F7F8FA; */
border-radius: 1rem;
/* border: 1px solid #f0f0f0; */
width: 12%;
text-align: center;
margin-left: 0.1rem;
color: #1989FA;
}

.speci{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 1rem;

}

.van-pagination{
  padding: 0 1rem;
    margin: 0 0 2rem 0;
}


/* .footer{
  height: 2rem;
  width: 100;
} */
</style>
