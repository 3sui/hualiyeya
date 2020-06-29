<template>
  <div class="devicealarm">
    <div class="header1">
      <!-- <van-row>
        <van-col span="12"> -->
          <span class="title">报警记录</span>
        <!-- </van-col>
        <van-col span="3" offset="9">
          <span class="alarm"> -->
            <!-- <van-icon name="bell" dot /> -->
          <!-- </span>
        </van-col>
      </van-row> -->
    </div>

    <van-search
      class="search-item"
      v-model="value"
      shape="round"
      background="#ffffff"
      placeholder="搜索设备名称、设备编号、报警时间"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
    />
   

    <div class="record_container">
      <div class="record_item" v-for="record in recordlist" @click="handel(record.id)" :key='record'>
        <div class="item-title">
          <van-row :gutter="20">
            <van-col span="2">
              <div class="record-icon">
                <van-icon size="2rem" name="records" />
              </div>
            </van-col>
            <van-col span="16">
              <div class="record-title">{{record.device_name}}</div>
            </van-col>
            <van-col span="6">
              <div class="record-date">{{record.timebefore}}前</div>
            </van-col>
          </van-row>
        </div>
        <div class="item-content">
          <van-row :gutter="20">
            <van-col span="18">
              <p>设备编号：{{record.device_eq}}</p>
              <p>测点名称：{{record.cp_name}}</p>
              <p>测点值：{{Number(record.cp_value).toFixed(1)}}</p>
              <p>报警时间：{{getDate(record.ts)}}</p>
            </van-col>
            <van-col span="6">
              <div
                class="mark"
                :class="record.is_handled==='1'?'success':'danger'"
              >{{record.is_handled==='1'?'已处理':'未处理'}}</div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  <van-empty v-if="recordlist.length!==0?false:true" description="未获取报警记录信息" />
    <van-pagination
      v-model="currentPage"
      :total-items="totalitems"
      :show-page-size="3"
      force-ellipses
      @change="HandleChange"
    />

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
  Tabs,
  Pagination,
  Empty
} from "vant";
import Timefomat from '../time/time';
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
    [Tabs.name]: Tabs,
    [Pagination.name]: Pagination,
    [Empty.name]:Empty

  },
  data() {
    return {
      value: "",
      list: [],
      recordlist: [],
      currentPage: 0,
      totalitems: 0,
    
    };
  },
  watch:{
    $route(){
      this.getCurrentPage()
      this.getCount();
      this.getData();
    }
  },

  created() {
    this.getCurrentPage();
    this.getCount();
    
  },
  mounted() {
    this.getData();
  },
  methods: {
    handel(id) {
      this.$router.push({
        path: "/AlarmHandle",
        query: {
          id: id,
          page: this.currentPage
        }
      });
    },
    //时间转化
    getDate(date){
           
       return Timefomat.Todate(Number(date)) 
    },
    

    //获取当前页面
    getCurrentPage(){
    console.log("page" in this.$route.query)
    this.currentPage = "page" in this.$route.query ? Number(this.$route.query.page) : 1;
    console.log(this.currentPage);
    
    },

    //获取报警总数

    getCount() {
         this.$axios.get("/mobile/AlarmRecordCount").then(res => {
        // console.log(res.data);
        if (res.data !== null || res.data.length > 0) {
          this.totalitems = res.data[0].count;
        }
      });
    },
    //获取报警信息
    getData() {
      let startid = (this.currentPage - 1) * 10;
      let data={
        startid: startid,
        // keyword:this.vlaue
      }

      this.$axios
        .post("/mobile/AlarmRecord",data)
        .then(res => {
          // console.log(res.data);
          if (res.data !== null || res.data.length > 0) {
            this.list = res.data;
          }
        })
        .then(() => {
          this.list.forEach(element => {
            let timebefore = "";
            let datenow = new Date().getTime();
            let datealarm = Number(element.ts)
            // console.log(datenow)
            // console.log(datealarm)
            let minites = parseInt((datenow - datealarm) / 60000);
            let hours = parseInt((datenow - datealarm) / 3600000);
            let days = parseInt((datenow - datealarm) / (3600000 * 24));
            timebefore =
              days >= 1
                ? days + "天"
                : hours >= 1
                ? hours + "小时"
                : minites >= 1
                ? minites + "分钟"
                : "1分钟";
            // console.log(timebefore);
            element.timebefore = timebefore;
            this.recordlist.push(element);
          });
        });
    },

    //搜索
    onSearch(val) {
      this.recordlist = this.recordlist.filter(array => {
        return (
          array.device_name.match(val) ||
          array.device_eq.match(val) ||
          this.getDate(array.ts).match(val) 

         

        );
      });
    },

    //取消
    onCancel() {
      this.value = "";
      this.currentPage=1
      this.recordlist = [];
      this.getData();
      // location.reload()
    },

    //换页
    HandleChange() {
      this.$router.push({
        path:'/DeviceAlarm',
        query:{
        page:this.currentPage
        }
      })
      this.recordlist=[]
      this.getData()
    }
  }
};
</script>

<style scoped>
.devicealarm {
  background-color: #f0f0f0;
  height: 95vh;
  overflow-y: auto;
}
.devicealarm .header1 {
  background-color: white;
  height: 8vh;
  /* margin-bottom: 0.5vh; */
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
  color: #23a9f2;
}
.item-title .record-title {
  color: #23a9f2;
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
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
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.item-content .success {
  color: #69d3ab;
}
.item-content .danger {
  color: #eb6379;
}

.search-item {
  padding-left: 1rem;
  padding-right: 1rem;
  /* background-color:  #f0f0f0; */
}

.search-item .van-search__action {
  /* background-color:  #F7F8FA; */
  border-radius: 1rem;
  /* border: 1px solid #f0f0f0; */
  width: 12%;
  text-align: center;
  margin-left: 0.1rem;
  color: #1989fa;
}

.devicealarm .van-pagination {
  margin: 0 0 2rem 0;
  /* height: 5rem; */
}

.devicealarm .van-empty{
height: 69%;
}

.van-pagination{
  padding: 0 1rem;
  
}
/* .van-pagination__item{
  border: 1px solid #f0f0f0;
} */
</style>
