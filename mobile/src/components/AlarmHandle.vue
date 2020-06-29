<template>
  <div class="alarmhandle">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">报警处理</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <!-- <van-icon name="bell" dot /> -->
          </span>
        </van-col>
      </van-row>
    </div>
    <div class="container">
      <van-cell-group title="报警信息">
        <van-cell title="设备名称" :value="point.device_name" />
        <van-cell title="设备编号" :value="point.device_eq" />
        <van-cell title="报警时间" :value="getDate(point.ts)" />
      </van-cell-group>

      <div class="point-title">报警测点</div>
      <div class="point-item">
        <van-row>
          <van-col span="10">
            <div class="point-detail">
              <p>
                <van-icon color="#E54323" name="points" size="1rem" />
                <span class="point-name">{{point.cp_name}}</span>
              </p>
              <p>
                <span class="limit">
                  <van-icon color="blue" size="1rem" name="arrow-up" />上限值
                </span>
                {{point.limit_up}}
              </p>
              <p>
                <span class="limit">
                  <van-icon color="blue" size="1rem" name="arrow-down" />下限值
                </span>
                {{point.limit_down}}
              </p>
            </div>
          </van-col>
          <van-col span="14">
            <div class="point-detail">
              <p class="current">{{Number(point.cp_value).toFixed(1)}}</p>
              <p class="current-label">实际值</p>
              <!-- <p style="text-align:center">
                <span class="timestemp"></span>
                {{point.timestemp}}
              </p>-->
            </div>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="sub">
      <van-button
        round
        block
        type="info"
        v-if="point.is_handled==='0'"
        style="margin-top:1rem"
        @click="handle(point.id,'1')"
      >处理报警信息</van-button>
    </div>
    <div class="sub">
      <van-button
        round
        block
        type="info"
        v-if="point.is_handled==='1'"
        style="margin-top:1rem"
        @click="handle(point.id,'0')"
      >标记为未处理</van-button>
    </div>
    <div class="sub">
      <van-button round block type="default" style="margin-top:1rem" @click="back">返回</van-button>
    </div>
  </div>
</template>

<script>
import Timefomat from "../time/time";
import { Icon, Col, Row, Button, Cell, CellGroup, Dialog, Toast } from "vant";
export default {
  name: "AlarmHandle",
  components: {
    [Icon.name]: Icon,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog

    // [Tag.name]:Tag
  },
  data() {
    return {
      point: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //时间转化
    getDate(date) {
      return Timefomat.Todate(Number(date));
    },

    getData() {
      let id = this.$route.query.id;
      let query = {
        id: id
      };
      this.$axios.post("/mobile/AlarmRecordDetail", query).then(res => {
        if (res.data !== null || res.data.length0) {
          this.point = res.data[0];
        }
      });
    },

    //修改处理状态
    Updatestate(query) {
      this.$axios.post("/mobile/UpdateAlarmRecord", query).then(res => {
        if (res.data != null || res.data.length > 0) {
          Toast.success("成功");
        }
      });
    },

    handle(id, state) {
      //将未处理变为已处理
      Dialog.confirm({
        title: "提示",
        message: "请确认？"
      })
        .then(() => {
          let query = {
            id: id,
            state: state
          };
          // on confirm
          this.Updatestate(query);
          //console.log(123);
        })
        .catch(() => {
          // on cancel
        });
      //跳转回报警记录页面
      // this.$router.push("/DeviceAlarm");
    },

    back() {
      //跳转回报警记录页面
      this.$router.push({
        path: "/DeviceAlarm"
      });
      // this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.alarmhandle {
  background-color: #f0f0f0;
  /* padding: 0 0 1rem 0; */
  height: 95vh;
  overflow-y: auto;
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

.container {
  padding: 0 1rem;
}

.point-title {
  background-color: white;
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem 0 0 0;
  height: 2.5rem;
  line-height: 2.5rem;
  font-weight: bold;
}
/* 
.device_item .state {
  text-align: center;
  font-size: 1.4rem;
  height: 9rem;
  line-height: 9rem;
  word-wrap: break-word;
  color: #0dbc79;
  font-weight: bold;
} */

.point-item {
  background: white;
  border-bottom: 1px solid #e4e4e4;
  padding: 1rem 1rem;
}

.point-detail p {
  color: #a3a3a3;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  padding: 0;
  line-height: 2rem;
}
.limit {
  /* color: #A3A3A3; */
  margin-right: 1rem;
  /* font-size: 1rem; */
}
.point-detail .current {
  color: #eb6379;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  /* margin: 1rem 0 0 0; */
  line-height: 4.6rem;
}

.point-detail .current-label {
  text-align: center;
  font-size: 1rem;
  color: #7f7f7f;
  font-weight: bold;
  line-height: 2rem;
}
.point-detail .timestemp {
  font-size: 0.8rem;
}
.point-name {
  font-size: 1rem;
  color: black;
  font-weight: bold;
}

/* .area {
  margin: 1rem 0;
} */

.sub {
  width: 80%;
  margin: auto;
}
</style>