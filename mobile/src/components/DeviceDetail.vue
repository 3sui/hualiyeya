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
            <p>设备编号: {{device.eq}}</p>
            <p>设备类型: {{device.typename}}</p>
            <p>设备型号: {{device.device_model}}</p>
            <p>
              设备状态:
              <van-tag
                round
                :type="device.status==='正常'?'success':(device.status==='报警'?'danger':'default')"
                size="medium"
              >{{device.status}}</van-tag>
            </p>
          </van-col>
          <van-col span="12">
            <div class="img">
              <van-image width="100%" height="100%" fit="fill" :src="Iamge(imgpath)" />
            </div>
          </van-col>
        </van-row>
      </div>

      <div class="point-title">测点详情</div>
      <div class="point-item" v-for="point in pointlist" :key="point">
        <van-row>
          <van-col span="12">
            <div class="point-detail">
              <p>
                <van-icon color="blue" name="points" size="1rem" />
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
          <van-col span="12">
            <div class="point-detail">
              <p
                class="current"
                :class="Number(point.current)>=Number(point.down_limit)&&Number(point.current)<=Number(point.up_limit)?'success':'danger'"
              >{{point.current}}</p>
              <p class="current-label">实际值</p>
              <p style="text-align:center">
                <span class="timestemp"></span>
                {{point.timestemp}}
              </p>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="sub">
        <van-button type="info" round block @click="review(device.id)">查看设备手册</van-button>
      </div>
      <div class="sub">
        <van-button type="default" round block @click="back">返回</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import imgUrl from "../assets/img/device.jpg";
import { Tag, Col, Row, Icon, Button, Image as VanImage } from "vant";
export default {
  name: "DeviceDetail",
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Button.name]: Button,
    [Tag.name]: Tag
  },
  data() {
    return {
      device: {},
      pointlist: [],
      //   {
      //     id: 1,
      //     point_name: "电压",
      //     up_limit: 24,
      //     down_limit: 0,
      //     current: 12,
      //     timestemp: "2020年6月9日 15:30:30"
      //   },
      //   {
      //     id: 1,
      //     point_name: "电压",
      //     up_limit: 24,
      //     down_limit: 0,
      //     current: 12,
      //     timestemp: "2020年6月9日 15:30:30"
      //   },
      //   {
      //     id: 1,
      //     point_name: "电压",
      //     up_limit: 24,
      //     down_limit: 0,
      //     current: 12,
      //     timestemp: "2020年6月9日 15:30:30"
      //   },
      //   {
      //     id: 1,
      //     point_name: "电压",
      //     up_limit: 24,
      //     down_limit: 0,
      //     current: 12,
      //     timestemp: "2020年6月9日 15:30:30"
      //   }
      // ],
      data: [],
      list: [],
      imgpath: ""
    };
  },
  created() {
    this.getData();
  },
  // mounted() {
  //   this.getPoint();
  //   this.getCurrentPoint();
  // },
  methods: {
    //获取设备详情
    getData() {
      this.imgpath = this.$route.query.file_path;
      let data = {
        params: {
          id: this.$route.query.id
        }
      };
      this.$axios
        .get("/mobile/devicedetail", data)
        .then(res => {
          if (res.data.length > 0) {
            this.device = res.data[0];
          }
        })
        .then(() => {
          this.getPoint();
        });
    },

    //获取测点
    getPoint() {
      this.$axios
        .post("/mobile/devicedetailpoint", { eq: this.device.eq })
        .then(res => {
          if (res.data.length) {
            this.list = res.data;
            console.log(this.list);
          }
        })
        .then(() => {
          this.getCurrentPoint();
        });
    },
    //获取最近一次的测点
    getCurrentPoint() {
      this.$axios
        .post("/mobile/currentpoint", { eq: this.device.eq })
        .then(res => {
          // console.log(typeof(res.data));

          if (res.data !== null && res.data.length > 0) {
            // console.log(res.data);

            let result = res.data[0];
            // console.log(result);
            let array = Object.values(result);
            let time = result.created_time;
            // console.log(time);

            this.data = array.slice(4, 4 + this.list.length);
            this.data.push(time);
            // console.log(this.data);
          } else {
            for (let i = 0; i < this.list.length; i++) {
              this.data.push("-");
            }
            this.data.push("最近没有测点数据");
          }
          // console.log(this.data);
        })
        .then(() => {
          this.dispaly();
        });
    },

    //整理数据
    dispaly() {
      this.list.forEach((element, index) => {
        let item = {};
        item.point_name = element.cp_name;
        item.up_limit = element.limit_up;
        item.down_limit = element.limit_down;
        item.current = (this.data[index] * (element.up - element.down)) / 4095;
        item.current = item.current.toFixed(1);
        item.timestemp = this.data[this.data.length - 1];
        this.pointlist.push(item);
      });
    },

    //获取图片路径
    Iamge(path) {
      let userAvatar = "";
      if (path) {
        userAvatar =
          axios.defaults.baseURL.slice(0, -4) +
          path.substring(0, path.lastIndexOf("."));
      }
      return path !== null ? userAvatar : imgUrl;
    },

    //下载手册
    review(id) {
      this.$router.push({
        path: "/Review",
        query: {
          id: id
        }
      });
    },

    //返回
    back() {
      this.$router.push({
        path: "/DeviceManage"
      });
    }
  }
};
</script>

<style >
.devicemanage {
  background-color: #f0f0f0;
  height: 95vh;
  overflow-y: auto;
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
  color: #a3a3a3;
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

.point-item {
  background: white;
  border-bottom: 1px solid #e4e4e4;
  padding: 1rem 1rem;
}

.point-detail p {
  color: #a3a3a3;
  /* margin: 0.5rem 0; */
  font-size: 0.9rem;
  /* padding: 0; */
  line-height: 1.5rem;
}
.limit {
  /* color: #A3A3A3; */
  margin-right: 1rem;
  /* font-size: 1rem; */
}
.point-detail .current {
  /* color: #0dbc79; */
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: bold;
  margin-top: 0.4rem;
}
.point-detail .success {
  color: #0dbc79;
}
.point-detail .danger {
  color: #dd4f42;
}

.point-detail .current-label {
  text-align: center;
  font-size: 1rem;
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

.sub {
  width: 80%;
  margin: 1rem auto;
}
</style>