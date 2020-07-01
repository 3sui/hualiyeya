<template>
  <div class="settings">
    <div class="login">
      <div class="title">设置</div>

      <div class="content">
        <van-divider style="margin:0" />
        <div class="vactor">
          <div class="icon_container">
            <van-image round width="6rem" height="6rem" :src="userAvatar" />
            <!-- <van-icon class="icon_vactor" size="5rem" color="#CCCCCC" name="manager" /> -->
          </div>
        </div>

        <div class="user">{{user}}</div>
         <div class="sub">
          <van-button round block type="info" class="quit" @click="EditPassword">修改密码</van-button>
        <!-- </div>
        <div class="sub"> -->
          <van-button round block type="danger" class="quit" @click="quit">退出</van-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import imgUrl from "../assets/img/img.jpg";
import { Button, Icon, Divider, Image as VanImage } from "vant";
export default {
  name: "Settings",
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [VanImage.name]: VanImage
  },
  data() {
    return {
      user: ""
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
  mounted() {
    this.user = localStorage.ms_username;
  },
  methods: {
    quit() {
      // console.log();
      localStorage.clear();
      this.$router.push("/Login");
    },
    EditPassword(){
      this.$router.push(
        {
          path:"/modifyPassword"
        }
      )
    }
  }
};
</script>

<style scoped>
.settings {
  height: 95vh;
}
.title {
  text-align: center;
  line-height: 8vh;
  background-color: white;
}
.divider {
  margin: 0;
}
.content {
  background-color: #f0f0f0;
  width: 100%;
  height: 87vh;
}
.vactor {
  padding: 30% 0 10% 0;

  height: 6rem;
}

.icon_container {
  /* border-radius: 50%; */
  /* background-color: white; */
  width: 6rem;
  height: 6rem;
  margin: auto;
}

/* .icon_vactor {
  margin-left: 0.5rem;
} */

.quit {
  width: 95%;
  margin: 1rem auto 0 auto;
}

.user {
  text-align: center;
  font-size: 1rem;
  color: #cccccc;
  /* margin: 1rem; */
}

.sub{
  width: 80%;
  margin: 5rem auto 0 auto;
}
</style>