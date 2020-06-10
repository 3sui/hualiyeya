<template>
  <div class="login">
    <div class="title">登录</div>
    <van-divider style="margin:0" />
    <div class="content">
      <div class="vactor">
        <div class="icon_container">
          <van-icon class="icon_vactor" size="5rem" color="#CCCCCC" name="manager" />
        </div>
      </div>
      <van-form @submit="onSubmit">
        <van-field
          left-icon="phone"
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          left-icon="lock"
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
         
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Form,Field , Button, Icon, Divider } from "vant";
export default {
  name: "Login",
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Field.name]:Field 
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    }
  }
};
</script>

<style>
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
  padding: 30% 25%;
  margin: auto;
  width: 26%;

  /* border-radius: 50%;
  background-color: white; */
}

.icon_container {
  border-radius: 50%;
  background-color: white;
}

.icon_vactor{
  margin-left:0.5rem ;
}
</style>
