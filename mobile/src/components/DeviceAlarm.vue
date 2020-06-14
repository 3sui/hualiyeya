<template>
  <div class="devicealarm">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">报警记录</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <van-icon name="bell" dot />
          </span>
        </van-col>
      </van-row>
    </div>

    <van-search v-model="value" shape="round" background="#F0F0F0" placeholder="请输入搜索关键词" />
   
        <div class="record_container">
          <div class="record_item" v-for="(record) in recordlist" @click="handel(record.id)">
            <div class="item-title">
              <van-row :gutter="20">
                <van-col span="2">
                  <div class="record-icon">
                    <van-icon size="2rem" name="records" />
                  </div>
                </van-col>
                <van-col span="6">
                  <div class="record-title">{{record.device_name}}</div>
                </van-col>
                <van-col span="16">
                  <div class="record-date">1小时前</div>
                </van-col>
              </van-row>
            </div>
            <div class="item-content">
              <van-row :gutter="20">
                <van-col span="16">
                  <p>设备型号：{{record.person}}</p>
                  <p>测点名称：{{record.cp_name}}</p>
                  <p>测点值：{{record.cp_value}}</p>
                  <p>报警时间：{{record.date}}</p>
                </van-col>
                <van-col span="8">
                  <div class="mark">{{record.state}}</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
    
<!--      
        <div class="record_container">
          <div class="record_item" v-for="(record) in recordlist_0" @click="handel(record.id)">
            <div class="item-title">
              <van-row :gutter="20">
                <van-col span="2">
                  <div class="record-icon">
                    <van-icon size="2rem" name="records" />
                  </div>
                </van-col>
                <van-col span="6">
                  <div class="record-title">{{record.device_name}}</div>
                </van-col>
                <van-col span="16">
                  <div class="record-date">1小时前</div>
                </van-col>
              </van-row>
            </div>
            <div class="item-content">
              <van-row :gutter="20">
                <van-col span="16">
                  <p>设备型号：{{record.person}}</p>
                  <p>测点名称：{{record.cp_name}}</p>
                  <p>测点值：{{record.cp_value}}</p>
                  <p>报警时间：{{record.date}}</p>
                </van-col>
                <van-col span="8">
                  <div class="mark">{{record.state}}</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
  -->


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
  Image as VanImage,
  Tab,
  Tabs
} from "vant";
export default {
  name: "DeviceAlarm",
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Form.name]: Form,
    [Search.name]: Search,
    [VanImage.name]: VanImage,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      value: "",
      recordlist: [
        {
          id: 1,
          device_name: "设备1",
          eq: "12345",
          cp_name: "张三",
          cp_value: "液压设备",
          date: "2020-06-10 10:10:10",
          state: "未处理"
        },
        {
          id: 4,
          device_name: "设备1",
          eq: "12345",
          cp_name: "张三",
          cp_value: "液压设备",
          date: "2020-06-10 10:10:10",
          state: "未处理"
        },
        {
          id: 3,
          device_name: "设备1",
          eq: "12345",
          cp_name: "张三",
          cp_value: "液压设备",
          date: "2020-06-10 10:10:10",
          state: "未处理"
        }
      ],
   
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
    },
    handel(id) {
      let param = {
        id: id
      };
      this.$router.push("/AlarmHandle", param);
    }
  }
};
</script>

<style scoped>
.devicealarm {
  background-color: #f0f0f0;
  min-height: 95vh;
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

.record_container {
  padding: 0.5rem 1rem;
  /* background-color: white; */
  /* margin-bottom: 1rem; */
  /* height: 6rem; */
}
.record_item {
  margin-bottom: 1rem;
}

.item-title {
  height: 3rem;
  /* border: 1px solid #f0f0f0; */
  background: white;
  color: #cccccc;
  margin-bottom: 0.1rem;
  padding: 0 0.5rem;
}
.item-title .record-icon {
  width: 2rem;
  height: 3rem;
  margin: auto;
  padding: 0.5rem 0;
}
.item-title .record-title {
  height: 3rem;
  line-height: 3rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.item-title .record-date {
  height: 3rem;
  line-height: 3rem;
  font-size: 0.8rem;
  text-align: right;
}

.item-content {
  height: 8rem;
  background-color: white;
  padding: 1rem;
}
.record_item p {
  color: #747474;
  font-size: 0.8rem;
  height: 2rem;
  line-height: 2rem;
  margin: 0;
}
/* .item-content p{
    margin: 0;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
    
} */
.item-content .mark {
  height: 8rem;
  line-height: 8rem;
  color: red;
  font-size: 1.3rem;
  font-weight: bold;
}
</style>
