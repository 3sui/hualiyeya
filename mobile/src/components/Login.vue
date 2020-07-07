<template>
  <div class="login" :style="note">
    <div class="title">设备远程管理系统</div>
    <div class="content">
      <!-- <van-divider style="margin:0" /> -->
      <div class="vactor">
        <div class="icon_container">
          <van-image round width="6rem" height="6rem" :src="userAvatar" />
        </div>
      </div>
      <van-form @submit="onSubmit" class="loginform">
        <van-field
          left-icon="phone"
          v-model="query.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          left-icon="lock"
          v-model="query.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />

        <div class="sub">
          <van-button round block type="info" native-type="submitForm">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {
  Form,
  Field,
  Button,
  Icon,
  Divider,
  Toast,
  Image as VanImage
} from "vant";
import imgUrl from "../assets/img/vactar.jpg";
export default {
  name: "Login",
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [VanImage.name]: VanImage
  },
  data() {
    return {
      query: {
        username: "",
        password: ""
      },
      note: {
        background: "url(" + require("../assets/img/bg.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize:'100% 100%' 
        
        
      }
    };
  },
  computed: {
    userAvatar() {
      let userAvatar =
        axios.defaults.baseURL.slice(0, -4) + localStorage.getItem("avatar");
      // console.log(localStorage.avatar == null);
      // console.log(imgUrl);
      console.log(userAvatar);
      return localStorage.avatar == null ? imgUrl : userAvatar;
    }
  },
  methods: {
    onSubmit() {
      if (this.query.username && this.query.password) {
        axios({
          method: "post",
          url: "/login",
          data: this.query
        })
          .then(res => {
            // console.log(res);

            if (res.data.success) {
              // this.$message.success('登录成功');
              localStorage.ms_username = res.data.ms_username;
              localStorage.phone = res.data.phone;
              localStorage.token = res.data.token;
              localStorage.role = res.data.role;
              localStorage.avatar = res.data.avatar;
              localStorage.username = res.data.username;

              console.log(res.data);
              if (localStorage.role !== '4') {
                this.$router.push("/DeviceManage");
              } else {
                this.$router.push("/RepairRecord");
              }
            } else {
              console.log('密码错误请重输');
              
              this.query = {};
              Toast.fail("用户名密码错误");
              return;
            }
          })
          .catch(err => {
            window.console.log(err);
          });
      } else {
        this.$toast("不能为空");
      }
    }
  }
};
</script>

<style scoped >
.login {
  height: 100vh;
  /* background:  url( ../assets/img/bg.jpg) 100% 100% cover no-repeat; */
}

.title {
  text-align: center;
  line-height: 8vh;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  /* background-color: white; */
}

.content {
  /* background-color: #f0f0f0; */
  width: 100%;
  height: 92vh;
}

.vactor {
  padding: 30% 0;

  height: 6rem;

  /* border-radius: 50%;
  background-color: white; */
}

.icon_container {
  border-radius: 50%;
  background-color: white;
  width: 6rem;
  height: 6rem;
  margin: auto;
}

.icon_vactor {
  margin-left: 0.5rem;
}

.loginform {
  padding: 0 1rem;
  /* background-color: rgba(255, 255, 255, 0.6); */
}

.loginform .van-field {
  background-color: rgba(255, 255, 255, 0.5);
}

.sub {
  width: 80%;
  margin: 1rem auto;
}
</style>
