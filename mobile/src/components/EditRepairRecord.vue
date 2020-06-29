<template>
  <div class="editrepairrecord">
    <div class="header">
      <van-row>
        <van-col span="12">
          <span class="title">工单编辑</span>
        </van-col>
        <van-col span="3" offset="9">
          <span class="alarm">
            <!-- <van-icon name="bell" dot /> -->
          </span>
        </van-col>
      </van-row>
    </div>  
     <van-form @submit="onSubmit">
 <van-field v-model="query.enterprise_name" type="tel" required label="企业名称" placeholder="点击输入企业名称"/>
      <van-field v-model="query.device_eq" type="tel" required label="设备编号" placeholder="点击输入设备编号"/>
 
      <!-- 选择企业 -->
      <!-- <van-field
        readonly
        clickable
        required
        name="picker_enterprise"
        :value="enterprise_name"
        label="企业名称"
        placeholder="点击选择企业名称"
        @click="showPicker_enterprise = true"
      />
      <van-popup v-model="showPicker_enterprise" position="bottom">
        <van-picker
          show-toolbar
          :columns="enterprises"
          @confirm="EnterpriseonConfirm"
          @cancel="showPicker_enterprise = false"
          @change="EnterpriseonChange"
        />
      </van-popup> -->

      <!-- 选择设备编号 -->
      <!-- <van-field
        readonly
        clickable
        required
        name="picker_eq"
        :value="eq"
        label="设备编号"
        placeholder="点击选择设备编号"
        @click="showPicker_eq = true"
      />
      <van-popup v-model="showPicker_eq" position="bottom">
        <van-picker
          show-toolbar
          :columns="eqlist"
          @confirm="eqonConfirm"
          @cancel="showPicker_eq = false"
        />
      </van-popup> --->
      <van-field
        readonly
        clickable
        required
        name="picker_faultType"
        :value="query.type"
        label="故障类型"
        placeholder="点击选择故障类型"
        @click="showPicker_fault_type = true"
      />
      <van-popup v-model="showPicker_fault_type" position="bottom">
        <van-picker
          show-toolbar
          :columns="faultType"
          @confirm="faultTypeonConfirm"
          @cancel="showPicker_fault_type = false"
        />
      </van-popup> 
      <van-field
        readonly
        clickable
        required
        name="picker_phenomenon"
        :value="query.phenomenon"
        label="故障现象"
        placeholder="点击选择故障现象"
        @click="showPicker_phenomenon = true"
      />
      <van-popup v-model="showPicker_phenomenon" position="bottom">
        <van-picker
          show-toolbar
          :columns="phenomenons"
          @confirm="phenomenononConfirm"
          @cancel="showPicker_phenomenon = false"
        />
      </van-popup>
      <!-- <van-field
        readonly
        clickable
        required
        name="picker_person"
        :value="query.repair_person"
        label="维修人员"
        placeholder="点击选择维修人员"
        @click="showPicker_person = true"
      />
      <van-popup v-model="showPicker_person" position="bottom">
        <van-picker
          show-toolbar
          :columns="personlist"
          @confirm="persononConfirm"
          @cancel="showPicker_person = false"
        />
      </van-popup> -->
        <van-field v-model="query.repair_person" type="text" required label="维修人员" disabled/>
      <van-field v-model="query.repair_person_phone" type="text" required label="手机号" disabled />
      <van-field
        readonly
        clickable
        default-date
        required
        name="calendar"
        :value="query.date"
        label="维修日期"
        placeholder="点击选择维修日期"
        @click="showPicker_time = true"
      />
      <van-calendar
        v-model="showPicker_time"
        @confirm="dateonConfirm"
        :min-date="new Date(2020,0,1)"
      />
      <van-field
        readonly
        clickable
        required
        name="picker_state"
        :value="query.state"
        label="维修状态"
        placeholder="点击选择维修状态"
        @click="showPicker_state = true"
      />
      <van-popup v-model="showPicker_state" position="bottom">
        <van-picker
          show-toolbar
          :columns="statelist"
          @confirm="stateonConfirm"
          @cancel="showPicker_state = false"
        />
      </van-popup>

      <van-field
        required
        class="area"
        v-model="query.cause"
        rows="2"
        autosize
        label="故障原因"
        type="textarea"
        maxlength="100"
        placeholder="请输入"
        show-word-limit
      />

      <van-field
        required
        class="area"
        v-model="query.methods"
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
       
      </div> 
      </van-form>
      <div class="back">
       
        <van-button round block type="default"  @click="back">返回</van-button>
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
  Toast
} from "vant";
export default {
  name: "EditRepairRecord",
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
    [Toast.name]: Toast
  },
  data() {
    return {
      //企业
      // enterprises: [],
      // enterprises_id: [],
      // showPicker_enterprise: false,
      // enterprise_id: "",
      // enterprise_name: "",
      //设备
      // eqlist: [],
      // eq: "",
      // devices_id: [],
      // device_id: "",
      // showPicker_eq: false,
      //故障及原因
      faultType: [],
      // type: "",
      choosefault: [],
      phenomenons: [],
      // phenomenon: "",
      showPicker_fault_type: false,
      showPicker_phenomenon: false,

      //维修人员
      // personlist: [],
      // phonelist: [],
      // repair_person: "",
      // showPicker_person: false,

      //时间
      // time: "",
      showPicker_time: false,

      //状态
      statelist: [],
      showPicker_state: false,

      query: {
        id:'',
        enterprise_name:"",
        device_eq: "",
        type: "",
        phenomenon: "",
        repair_person: "",
        repair_person_phone: "",
        date: "",
        state: "",
        cause: "",
        methods: ""
      }
    };
  },
  created() {
    // this.getEnterprises();
    this.getFaultType();
    // this.getPersons();
    this.getStates();
    this.getDatas();
  },
  methods: {
    //获取数据
    getDatas() {
      this.enterprise_name = this.$route.query.enterprise_name;
      this.eq = this.$route.query.eq;
      let data = {
        params: {
          id: this.$route.query.id
        }
      };
      this.$axios
        .get("mobile/RepairInfo", data)
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            this.query.id= res.data[0].id
            this.query.enterprise_name = res.data[0].enterprise_name;
            this.query.type = res.data[0].type;
            this.query.device_eq = res.data[0].device_eq;
            // this.enterprise_id = res.data[0].enterprise_id;
            this.query.device_id= res.data[0].device_id
            // this.query.type = res.data[0].type;

            this.query.phenomenon = res.data[0].phenomenon;
            this.query.repair_person = res.data[0].repair_person;
            this.query.repair_person_phone = res.data[0].repair_person_phone;
            this.query.date = res.data[0].date;

            this.query.state = res.data[0].state;
            this.query.cause = res.data[0].cause;
            this.query.methods = res.data[0].methods;
            let index = this.faultType.indexOf(this.query.type);
            this.phenomenons = this.choosefault[index];
          }
        })
        // .then(() => {
        //   this.getDevices();
        // });
    },

    //提交按钮
    onSubmit() {
      if (
        !this.query.enterprise_name ||
        !this.query.device_eq ||
        !this.query.type ||
        !this.query.phenomenon ||
        !this.query.repair_person ||
        !this.query.repair_person_phone ||
        !this.query.date ||
        !this.query.state ||
        !this.query.cause ||
        !this.query.methods
      ) {
        Toast.fail("请输入必填项");
      } else {
        this.$axios
          .post("/mobile/UpdateRepair", this.query)
          .then(res => {
            if (res.status === 200) {
              Toast.success("修改成功");
              this.$router.push("/RepairRecord");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    //返回
    back() {
      this.$router.push("/RepairRecord");
    },

    //获取企业选项
    // getEnterprises() {
    //   this.$axios
    //     .get("/dataSettings/Enterprise")
    //     .then(res => {
    //       console.log(res.data);
    //       let list = res.data;
    //       list.forEach(element => {
    //         this.enterprises_id.push(element.id);
    //         this.enterprises.push(element.enterprise_name);
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    //选择企业确认
    // EnterpriseonConfirm(value) {
    //   this.enterprise_name = value;
    //   let index = this.enterprises.indexOf(value);
    //   this.enterprise_id = this.enterprises_id[index];
    //   this.showPicker_enterprise = false;
    //   this.devices_id=[];
    //   this.eqlist=[]
    //   this.getDevices();
    //   this.eq = "";
    // },

    //企业选择改变
    // EnterpriseonChange() {
      
    // },

    //获取设备ID
    // getDevices() {
    //   this.$axios
    //     .post("/mobile/Devices", { enterprise_id: this.enterprise_id })
    //     .then(res => {
    //       // console.log(res.data);
    //       let results = res.data;
    //       results.forEach(item => {
    //         this.eqlist.push(item.value);
    //         this.devices_id.push(item.id);
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    //获取维修人员
    // getPersons() {
    //   this.$axios.get("/mobile/persons").then(res => {
    //     let results = res.data;
    //     results.forEach(item => {
    //       this.personlist.push(item.nickname);
    //       this.phonelist.push(item.phone);
    //     });
    //   });
    // },

    //获取维修状态
    getStates() {
      this.$axios.get("/mobile/states").then(res => {
        let results = res.data;
        results.forEach(item => {
          this.statelist.push(item.state);
        });
      });
    },

    //选择设备编号确认
    // eqonConfirm(value) {
    //   this.eq = value;

    //   let index = this.eqlist.indexOf(value);
    //   this.query.device_id = this.devices_id[index];
    //   this.showPicker_eq = false;
    // },

    //获取故障类型、故障现象选项
    getFaultType() {
      this.$axios
        .get("/mobile/FaultTypeChoose")
        .then(res => {
          console.log(res.data);
          let results = res.data;
          results.forEach(item => {
            this.faultType.push(item.types);
            this.choosefault.push(item.phenomenons);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    //选择故障类型确认
    faultTypeonConfirm(value) {
      this.query.type = value;
      let index = this.faultType.indexOf(value);
      this.phenomenons = this.choosefault[index];
      this.showPicker_fault_type = false;
      this.query.phenomenon = "";
    },
    //选择故障现象确认
    phenomenononConfirm(value) {
      this.query.phenomenon = value;
      this.showPicker_phenomenon = false;
    },
    //选择维修人员确认
    // persononConfirm(value) {
    //   this.query.repair_person = value;
    //   this.showPicker_person = false;
    //   let index = this.personlist.indexOf(value);
    //   this.query.repair_person_phone = this.phonelist[index];
    // },

    //日期格式化
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1>=10?date.getMonth() + 1: '0'+ (date.getMonth() + 1)}-${date.getDate()>=10?date.getDate() : '0'+ date.getDate() }`;
    },

    //选择日期确认
    dateonConfirm(date) {
      this.showPicker_time = false;
      this.query.date = this.formatDate(date);
    },

    //选择维修状态确认
    stateonConfirm(value) {
      this.query.state = value;
      this.showPicker_state = false;
    }
  }
};
</script>

<style scoped>
.editrepairrecord {
  background-color: #f0f0f0;
   height:95vh ;
   overflow-y:auto;
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

.editrepairrecord .sub {
  width: 80%;
  margin:  auto
 
}

.back{
   width: 80%;
  margin: 1rem auto 2rem auto;
}
</style>