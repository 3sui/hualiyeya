<template>
  <div class="alarmhandle">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">报警处理</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <van-icon name="bell" dot />
          </span>
        </van-col>
      </van-row>
    </div>
    <div class="container">
      <van-cell-group title="报警信息">
        <van-cell title="设备名称" value="内容" />
        <van-cell title="报警时间" value="内容" />
      </van-cell-group>

      <div class="point-title">报警测点</div>
      <div class="point-item" >
        <van-row>
          <van-col span="10">
            <div class="point-detail">
              <p>
                <van-icon color="#E54323" name="points" size="1rem" />
                <span class="point-name">{{point.point_name}}</span>
              </p>
              <p>
                <span class="limit">
                  <van-icon color="blue" size="1rem" name="arrow-up" />上限值
                </span>
                {{point.up_limit}}
              </p>
              <p>
                <span class="limit">
                  <van-icon color="blue" size="1rem" name="arrow-down" />下限值
                </span>
                {{point.down_limit}}
              </p>
            </div>
          </van-col>
          <van-col span="14">
            <div class="point-detail">
              <p class="current">{{point.current}}</p>
              <p class="current-label">实际值</p>
              <p style="text-align:center">
                <span class="timestemp"></span>
                {{point.timestemp}}
              </p>
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
        native-type="cancel"
        style="margin-top:1rem"
        @click="back"
      >处理报警信息</van-button>
    </div>
  </div>
</template>

<script>
import {
  Form,
  Icon,
  Col,
  Row,
  Button,
  Picker,
  Field,
  Popup,
  Calendar,
  Cell,
  CellGroup
} from "vant";
export default {
  name: "AlarmHandle",
  components: {
    [Icon.name]: Icon,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup

    // [Tag.name]:Tag
  },
  data() {
    return {
        point:{
            point_name:'电压',
            up_limit:24,
            down_limit:10,
            current:26,
            timestemp:'2020-06-12 15:30:30'

        }
    };
  },
  methods: {
   
    back() {
    //将未处理变为已处理

    //跳转回报警记录页面
      this.$router.push("/RepairRecord");
    }
  }
};
</script>

<style scoped>
.alarmhandle {
  background-color: #f0f0f0;
  /* padding: 0 0 1rem 0; */
 min-height:95vh ;
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
}
.limit {
  /* color: #A3A3A3; */
  margin-right: 1rem;
  /* font-size: 1rem; */
}
.point-detail .current {
  color: #A30014;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0 0 0;
}

.point-detail .current-label {
  text-align: center;
  font-size: 1.2rem;
  color: #7f7f7f;
  font-weight: bold;
}
.point-detail .timestemp {
  font-size: 0.8rem;
}
.point-name {
  font-size: 1rem;
  color: black;
  font-weight: bold;
}

.area {
  margin: 1rem 0;
}

.sub {
  width: 80%;
  margin: auto;
}
</style>