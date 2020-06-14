<template>
  <div class="repairdetail">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">工单详情</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <van-icon name="bell" dot />
          </span>
        </van-col>
      </van-row>
    </div>
    <van-cell title="企业名称" :value="query.enterprise" size="large" />
    <van-cell title="设备编号" :value="query.eq" size="large" />
    <van-cell title="故障类型" :value="query.fault_type" size="large" />
    <van-cell title="故障现象" :value="query.phenomenon" size="large" />
    <van-cell title="维修人员" :value="query.person" size="large" />
    <van-cell title="手机号" :value="query.tel" size="large" />
    <van-cell title="维修日期" :value="query.time" size="large" />
    <van-cell title="维修状态" :value="query.state" size="large" />
    <van-field v-model="query.cause" rows="4" autosize label="故障原因" type="textarea" readonly />
    <van-field v-model="query.methods" rows="4" autosize label="排除办法" type="textarea" readonly />
<div class="sub"> <van-button round block type="info" native-type="cancel" style="margin-top:1rem"  @click="back">返回</van-button></div>
   
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
    //   enterpriselist: ["华立液压", "远方动力", "天地自动化", "阿里巴巴"],
    //   showPicker_enterprise: false,
    //   eqlist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    //   showPicker_eq: false,
    //   fault_typelist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    //   showPicker_fault_type: false,
    //   phenomenonlist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    //   showPicker_phenomenon: false,

    //   personlist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    //   showPicker_person: false,

    //   showPicker_time: false,
    //   statelist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    //   showPicker_state: false,
      query: {
        enterprise: "11",
        eq: "11",
        fault_type: "11",
        phenomenon: "11",
        person: "11",
        time: "11",
        state: "11",
        tel: "11",
        cause: "11",
        methods: "11"
      }
    };
  },
  methods: {
    onSubmit() {},

    onConfirm() {},
    back(){
      this.$router.push('/RepairRecord')
    }
  }
};
</script>

<style scoped>
.repairdetail {
  background-color: #f0f0f0;
  padding: 0 0 1rem 0;
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

.area {
  margin: 1rem 0;
}

.sub{
  width: 80%;
  margin: auto;
}
</style>