<template>
  <div class="repairrecord">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">维修记录</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <!-- <van-icon name="bell" dot /> -->
          </span>
        </van-col>
      </van-row>
    </div>
    <!-- <van-row class="main">
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
    </van-row>-->
    <van-search
      class="search-item"
      v-model="value"
      shape="round"
      background="#ffffff"
      placeholder="搜索企业、设备编号、状态、时间"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="record_container">
      <div class="record_item" v-for="record in recordlist" @click="goRecordDetail(record.id)">
        <van-swipe-cell>
          <div class="item-title">
            <van-row :gutter="20">
              <van-col span="2">
                <div class="record-icon">
                  <van-icon size="2rem" name="records" />
                </div>
              </van-col>
              <van-col span="10">
                <div class="record-title">{{record.device_eq}}</div>
              </van-col>
              <van-col span="12">
                <div class="record-date">维修时间：{{record.date}}</div>
              </van-col>
            </van-row>
          </div>
          <div class="item-content">
            <van-row :gutter="20">
              <van-col span="16">
                <p>企业名称：{{record.enterprise_name}}</p>
                <p>维修人员：{{record.repair_person}}</p>
                <p>故障类型：{{record.type}}</p>
              </van-col>
              <van-col span="8">
                <div class="mark" :style="{'color':getColor(record.state)}">{{record.state}}</div>
              </van-col>
            </van-row>
          </div>
          <template #right>
            <van-button
              square
              text="编辑"
              type="danger"
              class="edit-button"
              v-if="rolecheck"
              @click="goEditRepairRecord(record.id)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <van-empty v-if="recordlist.length===0?true:false" description="未获取维修记录信息" />
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
  Button,
  Image as VanImage,
  SwipeCell,
  Empty
} from "vant";
export default {
  name: "RepairRecord",
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Form.name]: Form,
    [Search.name]: Search,
    [VanImage.name]: VanImage,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Empty.name]: Empty
  },
  data() {
    return {
      rolecheck: false,
      value: "",
      recordlist: [],

      colors: [
        "#EB6379",
        "#69D3AB",

        "#EEA03C",
        "#39CCCC",
        "#75649B",
        "#23A9F2",
        "#53CFE9"
      ],
      state: []
    };
  },

  created() {
    this.getData();

    this.getRole();
  },
  methods: {
    //获取列表数据
    getData() {
      this.$axios
        .get("/mobile/Repair")
        .then(res => {
          if (res.status === 200) {
            this.recordlist = res.data;
            // console.log(this.recordlist);
          }
        })
        // .then(err => {
        //   console.log(err);
        // })
        .then(() => {
          this.paint();
        });
    },
    paint() {
      this.$axios.get("/mobile/states").then(res => {
        if (res) {
          let result = res.data;
          console.log(result);

          for (let i = 0; i < result.length; i++) {
            let typeItem = {};
            typeItem["color"] = this.colors[i];

            typeItem["state"] = result[i].state;

            this.state.push(typeItem);
          }
        }
      });
    },

    //返回状态的颜色
    getColor(value) {
      // console.log(this.state.indexOf(value));
      for (let i = 0; i < this.state.length; i++) {
        if (value === this.state[i].state) {
          return this.state[i].color;
          break;
        }
      }

      //  return 'black'
    },
    //搜索
    onSearch(val) {
      this.recordlist = this.recordlist.filter(array => {
        return (
          array.state.match(val) ||
          // array.type.match(val) ||
          array.device_eq.match(val) ||
          array.date.match(val) ||
          array.enterprise_name.match(val)
        );
      });
    },

    //取消
    onCancel() {
      this.value = "";
      this.recordlist = [];
      this.getData();
      // location.reload()
    },

    //获取用户权限

    getRole() {
      if (localStorage) {
        let user_role = localStorage.getItem("role");
        if (user_role === "4") {
          this.rolecheck = true;
        } else {
          return;
        }
      } else {
        return;
      }
    },
    //企业用户进入维修记录详情，只能查看
    goRecordDetail(id) {
      this.$router.push({
        path: "/RepairDetail",
        query: {
          id: id
        }
      });
    },

    //维修工进入编辑页面
    goEditRepairRecord(id) {
      this.$router.push({
        path: "/EditRepairRecord",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
.repairrecord {
  background-color: #f0f0f0;
  height: 95vh;
  overflow-y: auto;
}
.header {
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
  height: 3rem;
  line-height: 3rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: #23a9f2;
}

.item-title .record-date {
  height: 3rem;
  line-height: 3rem;
  font-size: 0.8rem;
  text-align: right;
}

.item-content {
  height: 6rem;
  background-color: white;
  padding: 1rem;
}
.record_item p {
  color: #747474;
  font-size: 0.8rem;
  height: 2rem;
  line-height: 2rem;
  margin: 0;
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: ellipsis;
}
/* .item-content p{
    margin: 0;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
    
} */
.item-content .mark {
  height: 6rem;
  line-height: 6rem;
  color: #747474;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.edit-button {
  height: 100%;
}

.search-item {
  padding-left: 1rem;
  padding-right: 1rem;
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
</style>
