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
        <h3>4</h3>
        <p>设备数</p>
      </van-col>
      <van-col span="8" class="second">
        <div class="img">
          <div class="img_icon">
            <van-icon size="1.5rem" name="bar-chart-o" />
          </div>
        </div>
        <h3>2</h3>
        <p>运行数</p>
      </van-col>
      <van-col span="8">
        <div class="img">
          <div class="img_icon">
            <van-icon size="1.5rem" name="bar-chart-o" />
          </div>
        </div>
        <h3>2</h3>
        <p>报警数</p>
      </van-col>
    </van-row>

    <van-search v-model="value" shape="round" background="#F0F0F0" placeholder="请输入搜索关键词" />

    <div class="device_container">
      <div class="device_item" v-for="device in devicelist" @click="goDeviceDetail">
        <van-row :gutter="20">
          <van-col span="10">
            <div class="img">
              <van-image width="100%" height="100%" fit="cover" :src="device.img_url" />
            </div>
          </van-col>
          <van-col span="10">
            <h3><van-icon color="#007ACC" size="1.2rem" name="user-circle-o" /> {{device.device_name}}</h3>
            <p>出厂编号:{{device.eq}}</p>
            <p>测点数:{{device.pointnum}}</p>
          </van-col>
          <van-col span="4"><div class="state">{{device.state}}</div></van-col>
        </van-row>
      </div>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>
<script>
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
      value: "",
      devicelist: [
        {
          id: 1,
          device_name: "设备1",
          eq: "12345",
          img_url: "https://img.yzcdn.cn/vant/cat.jpeg",
          state: '正常',
          pointnum: 4
        },
        {
          id: 2,
          device_name: "设备1",
          eq: "12345",
          img_url: "https://img.yzcdn.cn/vant/cat.jpeg",
          state: '正常',
          pointnum: 4
        },
        {
          id: 3,
          device_name: "设备1",
          eq: "12345",
          img_url: "https://img.yzcdn.cn/vant/cat.jpeg",
          state: '故障',
          pointnum:  5
        },{
          id: 3,
          device_name: "设备1",
          eq: "12345",
          img_url: "https://img.yzcdn.cn/vant/cat.jpeg",
          state: '故障',
          pointnum:  5
        }
      ],
      devices:[]
    };
  },
  created(){
    this.getData()
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
    },
    goDeviceDetail(){
      this.$router.push(
        {path:'/DeviceDetail',
        query:{
          id:1
        }})
    },
         // 获取设备列表数据
        getData() {
            axios({
                method: 'get',
                url: '/device/fetchDevices'
            })
                .then(res => {
                  console.log(res);
                    if (res.data.success) {
                        this.devices = res.data.data;
                        this.devicelist=res.data.data;
                        // this.pageTotal = res.data.data.length;
                       console.log(res.data);
                    } else {
                       console.log('服务器错误');
                    }
                })
                .catch(err =>{
                  console.log(err);
                });
        },
  }
};
</script>

<style scoped>
.devicemanage {
  background-color: #f0f0f0;
  
  
}
.header {
  background-color: white;
  height: 8vh;
  margin-bottom: 0.5vh;
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
  padding-left: 1rem;
  line-height: 8vh;
}

.alarm {
  font-size: 1.5rem;
  font-weight: bold;
  padding-right: 1rem;
  line-height: 8vh;
  color: #1989fa;
}
.main {
 
  background-color: white;
  margin-bottom: 0.5vh;
  padding: 1rem 0;
}
.main img {
  width: 20%;
  margin: auto;
  text-align: center;
   
}

.main h3 {
  font-weight: normal;
  text-align: center;
  margin: 0.3rem auto;
  font-size: 1.5rem;
}

.main p {
  text-align: center;
  margin: 0.2rem auto;
}

.main .img{
  height: 1.5rem;
}
.main .second {
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
}

.main .img_icon {
  width: 1.5rem;
  margin: 1rem auto;
  line-height: 1rem;
  text-align: center;
}
.device_container{
  padding: 0 0 2rem 0;
}

.device_item {
  padding: 0.5rem;
  background-color: white;
  margin-bottom: 1rem;
  height: 6rem;
}

.device_item img {
  width: 85%;
  height: 7rem;
  margin: auto;
  /* padding: 2rem 0; */
}

.device_item h3 {
  height: 3rem;
  line-height: 3rem;
  margin: 0;
}

.device_item p {
  color: #747474;
  font-size: 0.8rem;
  height: 1.5rem;
  line-height: 1.5rem;
  margin: 0;
}
.device_item .state{
  text-align: center;
  font-size: 1.3rem;
  height: 7rem;
  line-height: 7rem;
  word-wrap: break-word;
  color: #0DBC79;
  font-weight: bold;
}

/* .footer{
  height: 2rem;
  width: 100;
} */
</style>
