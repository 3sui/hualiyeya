<template>
  <div class="editrepairrecord">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">工单编辑</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <van-icon name="bell" dot />
          </span>
        </van-col>
      </van-row>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="picker"
        :value="enterprise"
        label="企业名称"
        placeholder="点击选择企业名称"
        @click="showPicker_enterprise = true"
      />
      <van-popup v-model="showPicker_enterprise" position="bottom">
        <van-picker
          show-toolbar
          :columns="enterpriselist"
          @confirm="onConfirm"
          @cancel="showPicker_enterprise = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="eq"
        label="设备编号"
        placeholder="点击选择设备编号"
        @click="showPicker_eq = true"
      />
      <van-popup v-model="showPicker_eq" position="bottom">
        <van-picker
          show-toolbar
          :columns="eqlist"
          @confirm="onConfirm"
          @cancel="showPicker_eq = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="fault_type"
        label="故障类型"
        placeholder="点击选择故障类型"
        @click="showPicker_fault_type = true"
      />
      <van-popup v-model="showPicker_fault_type" position="bottom">
        <van-picker
          show-toolbar
          :columns="fault_typelist"
          @confirm="onConfirm"
          @cancel="showPicker_fault_type = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="phenomenon"
        label="故障现象"
        placeholder="点击选择故障现象"
        @click="showPicker_phenomenon = true"
      />
      <van-popup v-model="showPicker_phenomenon" position="bottom">
        <van-picker
          show-toolbar
          :columns="fault_typelist"
          @confirm="onConfirm"
          @cancel="showPicker_phenomenon = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="person"
        label="维修人员"
        placeholder="点击选择维修人员"
        @click="showPicker_person = true"
      />
      <van-popup v-model="showPicker_person" position="bottom">
        <van-picker
          show-toolbar
          :columns="personlist"
          @confirm="onConfirm"
          @cancel="showPicker_person = false"
        />
      </van-popup>
      <van-field v-model="tel" type="tel" label="手机号" />
      <van-field
        readonly
        clickable
        name="calendar"
        :value="time"
        label="维修日期"
        placeholder="点击选择维修日期"
        @click="showPicker_time = true"
      />
      <van-calendar v-model="showPicker_time" @confirm="onConfirm" />
      <van-field
        readonly
        clickable
        name="picker"
        :value="state"
        label="维修状态"
        placeholder="点击选择维修状态"
        @click="showPicker_state = true"
      />
      <van-popup v-model="showPicker_state" position="bottom">
        <van-picker
          show-toolbar
          :columns="statelist"
          @confirm="onConfirm"
          @cancel="showPicker_state = false"
        />
      </van-popup>

      <van-field
      class="area"
        v-model="cause"
        rows="2"
        autosize
        label="故障原因"
        type="textarea"
        maxlength="100"
        placeholder="请输入"
        show-word-limit
      />

      <van-field
       class="area"
        v-model="methods"
        rows="2"
        autosize
        label="排除办法"
        type="textarea"
        maxlength="100"
        placeholder="请输入"
        show-word-limit
      />
      <div class="sub">
        <van-button round block type="info" native-type="submit">提交</van-button>
        <!-- <van-button round block type="default" native-type="cancel">返回</van-button> -->
      </div>
       <div class="sub">
        <!-- <van-button round block type="info" native-type="submit">提交</van-button> -->
        <van-button round block type="default" native-type="cancel" @click="back">返回</van-button>
      </div>
    </van-form>
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
  Calendar
} from "vant";
export default {
  name: "NewRepairRecord",
  components: {
    [Form.name]: Form,
    [Icon.name]: Icon,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Calendar.name]: Calendar
    // [Tag.name]:Tag
  },
  data() {
    return {
      enterpriselist: ["华立液压", "远方动力", "天地自动化", "阿里巴巴"],
      showPicker_enterprise: false,
      eqlist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker_eq: false,
      fault_typelist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker_fault_type: false,
      phenomenonlist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker_phenomenon: false,

      personlist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker_person: false,

      showPicker_time: false,
      statelist: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker_state: false,

      enterprise: "",
      eq: "",
      fault_type: "",
      phenomenon: "",
      person: "",
      time: "",
      state: "",
      tel: "",
      cause: "",
      methods: ""
    };
  },
  methods: {
    onSubmit() {},

    onConfirm() {},
     back(){
      this.$router.push('/DeviceManage')
    }
  }
};
</script>

<style scoped>
.editrepairrecord {
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

.area{
    margin: 1rem 0 ;
    
}

.sub{
  width: 80%;
  margin: 1rem auto;
}
</style>