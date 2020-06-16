<template>
  <div class="login">
    <div class="title">登录</div>
    <div class="content">
      <van-divider style="margin:0" />
      <div class="vactor">
        <div class="icon_container">
          <van-icon class="icon_vactor" size="5rem" color="#CCCCCC" name="manager" />
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
import { Form, Field, Button, Icon, Divider,Toast } from "vant";
export default {
  name: "Login",
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Field.name]: Field,
    [Toast.name]:Toast
  },
  data() {
    return {
      query: {
        username: "",
        password: ""
      }
    };
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
            if (res.data.success) {
              // this.$message.success('登录成功');
              localStorage.ms_username = res.data.ms_username;
              localStorage.token = res.data.token;
              localStorage.role = res.data.role;
              localStorage.avatar = res.data.avatar;
              // localStorage.enterprise_id = res.data.enterprise_id;

              console.log(res.data);

              this.$router.push("/DeviceManage");
            } else {
              this.query = {};
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

<style scoped>
.login {
  height: 100vh;
}

.title {
  text-align: center;
  line-height: 8vh;
}
.divider {
  margin: 0;
}
.content {
  background-color: #f0f0f0;
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

.loginform{
  padding: 0 1rem;
}

.sub{
  width: 80%;
  margin: 1rem auto;
}
</style>
