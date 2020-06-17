<template>
  <div class="devicemanage">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">设备管理</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <van-icon name="bell" dot />
          </span>
        </van-col>
      </van-row>
    </div>
    <van-row class="main">
      <van-col span="8">
        <div class="img">
          <div class="img_icon">
            <van-icon size="1.5rem" name="bar-chart-o" />
          </div>
        </div>
        <h3>{{deviceNum}}</h3>
        <p>设备数</p>
      </van-col>
      <van-col span="8" class="second">
        <div class="img">
          <div class="img_icon">
            <van-icon size="1.5rem" name="bar-chart-o" />
          </div>
        </div>
        <h3>{{device_isonNum}}</h3>
        <p>运行数</p>
      </van-col>
      <van-col span="8">
        <div class="img">
          <div class="img_icon">
            <van-icon size="1.5rem" name="bar-chart-o" />
          </div>
        </div>
        <h3>{{device_alarmNum}}</h3>
        <p>报警数</p>
      </van-col>
    </van-row>

    <van-search
      v-model="value"
      shape="round"
      background="white"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
    />

    <div class="device_container">
      <div class="device_item" v-for="device in devicelist" @click="goDeviceDetail(device.device_id)">
        <van-row :gutter="20">
          <van-col span="10">
            <div class="img">
              <van-image width="100%" height="100%" fit="cover" :src="Iamge(device.file_path)" />
            </div>
          </van-col>
          <van-col span="10">
            <h3>
              <van-icon color="#007ACC" size="1.2rem" name="user-circle-o" />
              {{device.device_name}}
            </h3>
            <p>出厂编号:{{device.eq}}</p>
            <p>测点数:{{device.count}}</p>
          </van-col>
          <van-col span="4">
            <div class="state">{{device.state}}</div>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>
<script>
import imgUrl from "../assets/img/img.jpg";
import {
  Col,
  Row,
  Toast,
  Icon,
  Divider,
  Form,
  Search,
  Image as VanImage
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
    [VanImage.name]: VanImage
  },
  data() {
    return {
      enterprise_id: 1,
      value: "",
      devicelist: [],
      deviceNum:0,
      device_isonNum:0,
      device_alarmNum:0,
      
    };
  },
  created() {
    this.getEnterprise();
  },
  mounted() {
    this.getData();
  },

  methods: {
    Iamge(path) {
      let userAvatar =''
      if(path){
        userAvatar =axios.defaults.baseURL.slice(0, -4)+ path.slice(0, -4) ;
      }
      
      // console.log(localStorage.avatar == null);
      // console.log(imgUrl);
      // console.log(userAvatar);
      return path !== null ?  userAvatar: imgUrl;
    },
    //获取企业id
    getEnterprise() {
      let username = localStorage.getItem("ms_username");
      console.log(username);
    },

    // 获取设备列表数据
    getData() {
      axios({
        method: "get",
        url: "/mobile/devicelist",
        // params: {
        //   enterprise_id: this.enterprise_id
        // }
      })
        .then(res => {
          console.log(res);
          if (res.data.length) {
            this.devicelist = res.data;

            // console.log(res.data);
          } else {
            console.log("服务器错误");
          }
        })
        .then(()=>{
          this.devicelist.forEach(element => {
            this.deviceNum ++;
            if(element.is_on==='1'){
              this.device_isonNum++
            }
            if(element.status!=='正常'){
              this.device_alarmNum++
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    //搜索
    onSearch(val) {
      this.devicelist=this.devicelist.filter(array=>{
      return  array.device_name.match(val) || array.eq.match(val) 
     })
    },

    //取消
    onCancel() {
      this.value="";
      this.getData()
    },

    //查看设备详情
    goDeviceDetail(id) {
      this.$router.push({
        path: "/DeviceDetail",
        query: {
          id:id 
        }
      });
    },


  }
};
</script>

<style scoped>
.devicemanage {
  background-color: #f0f0f0;
  min-height:95vh ;
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
  font-weight: normal;
  text-align: center;
  margin: 0.3rem auto;
  font-size: 1.5rem;
}

.devicemanage .main p {
  text-align: center;
  margin: 0.2rem auto;
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
}

.devicemanage .device_item p {
  color: #747474;
  font-size: 0.8rem;
  height: 1.5rem;
  line-height: 1.5rem;
  margin: 0;
}
.devicemanage .device_item .state {
  text-align: center;
  font-size: 1.3rem;
  height: 7rem;
  line-height: 7rem;
  word-wrap: break-word;
  color: #0dbc79;
  font-weight: bold;
}

/* .footer{
  height: 2rem;
  width: 100;
} */
</style>
