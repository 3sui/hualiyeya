<template>
  <div class="repairdetail">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">工单详情</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <!-- <van-icon name="bell" dot /> -->
          </span>
        </van-col>
      </van-row>
    </div>

    <div class="area">
      <van-cell
        title="企业名称"
        :value="query.enterprise_name"
        size="large"
        title-class="titleclass"
        value-class="valueclass"
      />
      <van-cell
        title="设备编号"
        :value="query.device_eq"
        size="large"
        title-class="titleclass"
        value-class="valueclass"
      />
      <van-cell
        title="故障类型"
        :value="query.type"
        size="large"
        title-class="titleclass"
        value-class="valueclass"
      />
      <van-cell
        title="故障现象"
        :value="query.phenomenon"
        size="large"
        title-class="titleclass"
        value-class="valueclass"
      />
      <van-cell
        title="维修人员"
        :value="query.repair_person"
        size="large"
        title-class="titleclass"
        value-class="valueclass"
      />
      <van-cell
        title="手机号"
        :value="query.repair_person_phone"
        size="large"
        title-class="titleclass"
        value-class="valueclass"
      />
      <van-cell
        title="维修日期"
        :value="query.date"
        size="large"
        title-class="titleclass"
        value-class="valueclass"
      />
      <van-cell
        title="维修状态"
        :value="query.state"
        size="large"
        title-class="titleclass"
        value-class="valueclass"
      />
      <van-field
        v-model="query.cause"
        rows="4"
        autosize
        label="故障原因"
        type="textarea"
        readonly
        label-class="fieldclass"
        class="fieldcontentclass"
      />
      <van-field
        v-model="query.methods"
        rows="4"
        autosize
        label="排除办法"
        type="textarea"
        readonly
        label-class="fieldclass"
        class="fieldcontentclass"
      />
      <div class="sub">
        <van-button
          round
          block
          type="info"
          native-type="cancel"
          style="margin-top:1rem"
          @click="back"
        >返回</van-button>
      </div>
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
  Cell
} from "vant";
export default {
  name: "RepairDetail",
  components: {
    [Form.name]: Form,
    [Icon.name]: Icon,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Calendar.name]: Calendar,
    [Cell.name]: Cell

    // [Tag.name]:Tag
  },
  data() {
    return {
      query: {
        //   enterprise_name: "1111",
        //   eq: "",
        //   type: "",
        //   phenomenon: "",
        //   repair_person: "",
        //   date: "",
        //   state: "",
        //  repair_person_phone: "",
        //   cause: "",
        //   methods: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("mobile/RepairInfo", { params: { id: this.$route.query.id } })
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            this.query = res.data[0];
          }
        });
    },

    back() {
      this.$router.push("/RepairRecord");
    }
  }
};
</script>

<style scoped>
.repairdetail {
  background-color: #f0f0f0;
  /* padding: 0 0 1rem 0; */
  height: 95vh;
  overflow-y:auto
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

/* .area {
  padding: 0 1.5rem ;
} */
.repairdetail .titleclass {
  font-size: 1rem;
  padding-left: 0.5rem;
  /* text-align-last: justify */
  /* width: 30%; */
}
.repairdetail .valueclass {
  font-size: 1rem;
  color: #747474;
  padding-right: 0.5rem;
  /* width: 70%; */
}

/* .repairdetail .fieldclass{
  
  font-size: 1rem;
  color: #747474;
} */
.fieldcontentclass{
    font-size: 1rem;
  padding-left: 1.5rem;
}
.repairdetail .van-field__value {
   font-size: 1rem;
  color: #747474;
  padding-right: 0.5rem;
}


.sub {
  width: 80%;
  margin: 1rem auto;
  height: 4rem;
}
</style>