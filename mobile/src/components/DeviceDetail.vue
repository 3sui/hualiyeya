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

    <div class="device_container">
      <div class="top">
        <van-row>
          <van-col span="2">
            <div class="top-icon">
              <van-icon size="2rem" color="#FEA145" name="desktop-o" />
            </div>
          </van-col>
          <van-col span="10" offset="1">
            <h2 class="top-title">{{device.device_name}}</h2>
          </van-col>
        </van-row>
      </div>
      <div class="device_item">
        <van-row>
          <van-col span="12">
            <p>出厂编号: {{device.eq}}</p>
            <p>设备类型: {{device.devicetype}}</p>
            <p>设备型号: {{device.devicemodel}}</p>
            <p>设备状态: <van-tag round type="success" size="medium">{{device.state}}</van-tag></p>
          </van-col>
          <van-col span="12">
            <div class="img">
              <van-image width="100%" height="100%" fit="fill" :src="device.img_url" />
            </div>
          </van-col>
        </van-row>
      </div>

      <div class="point-title">测点详情</div>
      <div class="point-item" v-for="point in pointlist">
        <van-row>
          <van-col span="10">
              <div class="point-detail">
                  <p><van-icon color="#E54323" name="points" size="1rem" /> <span class="point-name">{{point.point_name}}</span></p>
                   <p><span class="limit"><van-icon color="blue" size="1rem" name="arrow-up" /> 上限值</span>{{point.up_limit}}</p>
                    <p><span class="limit"><van-icon color="blue" size="1rem"  name="arrow-down" /> 下限值</span>{{point.down_limit}}</p>
              </div>
          </van-col>
          <van-col span="14">
               <div class="point-detail">
                  <p class="current">{{point.current}}</p>
                   <p class="current-label">实际值</p>
                    <p style="text-align:center"><span class="timestemp"></span>{{point.timestemp}}</p>
              </div>
          </van-col>
        </van-row>
      </div>
<div class="sub"><van-button type="info" class="look" round  block>查看设备手册</van-button></div>
      
    </div>
  </div>
</template>
<script>
import {
  Tag,
  Col,
  Row,
  Icon,
  Button ,
  Image as VanImage
} from "vant";
export default {
  name: "DeviceDetail",
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Button.name]:Button,
    [Tag.name]:Tag
  },
  data() {
    return {
      value: "",
      device: {
        id: 1,
        device_name: "设备1",
        eq: "12345",
        img_url: "https://img.yzcdn.cn/vant/cat.jpeg",
        state: "正常",
        pointnum: 4,
        devicetype:'液压设备',
        devicemodel:'KSJD001'
      },
      pointlist:[{
          id:1,
          point_name:'电压',
          up_limit:24,
          down_limit:0,
          current:12,
          timestemp:'2020年6月9日 15:30:30',
      },
      {
          id:1,
          point_name:'电压',
          up_limit:24,
          down_limit:0,
          current:12,
          timestemp:'2020年6月9日 15:30:30',
      },
      {
          id:1,
          point_name:'电压',
          up_limit:24,
          down_limit:0,
          current:12,
          timestemp:'2020年6月9日 15:30:30',
      },{
          id:1,
          point_name:'电压',
          up_limit:24,
          down_limit:0,
          current:12,
          timestemp:'2020年6月9日 15:30:30',
      }]
    }
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
    }
  }
};
</script>

<style >
.devicemanage {
  background-color: #f0f0f0;
  min-height:95vh ;
}
.header {
  background-color: white;
  height: 8vh;
  margin-bottom: 0.5rem;
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

.device_container {
  padding: 1rem 0.5rem;
}

.top {
  background-color: white;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #e4e4e4;
}

.top-icon {
  width: 2rem;
  height: 2rem;
  margin: auto;
}
.top-title {
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
  margin: 0;
  color: #666666;
}

.device_item {
  padding: 1rem 0.5rem;
  background-color: white;
  /* margin-bottom: 1rem; */
  height: 6rem;
  border-bottom: 1px solid #e4e4e4;
}

.device_item img {
  width: 90%;
  height: 6rem;
  margin: auto;
}

.device_item p {
  color:#A3A3A3;
  font-size: 0.9rem;
  height: 1.5rem;
  line-height: 1.5rem;
  margin: 0;
}

.point-title {
  background-color: white;
  text-align: center;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  height: 2.5rem;
  line-height: 2.5rem;
  font-weight: bold;
}

.device_item .state {
  text-align: center;
  font-size: 1.4rem;
  height: 9rem;
  line-height: 9rem;
  word-wrap: break-word;
  color: #0dbc79;
  font-weight: bold;
}

.point-item
{background: white;
border-bottom: 1px solid #e4e4e4;
padding: 1rem 1rem;
}

.point-detail p{
    color: #A3A3A3;
    margin:0.5rem 0;
    font-size: 0.9rem;
    padding: 0;
    

}
.limit{
    /* color: #A3A3A3; */
    margin-right: 1rem;
    /* font-size: 1rem; */
}
.point-detail .current{
    color: #0DBC79;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0 0 0;
}

.point-detail .current-label{
     text-align: center;
    font-size: 1.2rem;
     color: #7F7F7F;
       font-weight: bold;
}
.point-detail .timestemp{
      font-size: 0.8rem;
}
.point-name{
    font-size: 1rem;
    color: black;
    font-weight: bold;
}

.look{
    margin: 1rem 0;
}

.sub{
  width: 80%;
  margin: auto;
}
</style>