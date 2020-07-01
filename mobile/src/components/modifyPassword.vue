<template>
  <div class="settings">
    <div class="login">
      <div class="title">修改密码</div>

      <div class="content">
      
        <van-form @submit="onSubmit">
          <van-field
          disabled
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="旧密码"
            label="旧密码"
            placeholder="旧密码"
            :rules="[{ required: true, message: '请填写旧密码' }]"
          />
           <van-field
            v-model="newpassword"
            type="password"
            name="新密码"
            label="新密码"
            placeholder="新密码"
            :rules="[{ required: true, message: '请填写新密码' }]"
          />

            <div class="sub">
          <van-button round block type="info" class="quit" native-type="submit">确认</van-button>
         
        </div>
        </van-form>

        <div class="sub">
        
          <van-button round block type="default" class="quit" @click="back">返回</van-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import imgUrl from "../assets/img/img.jpg";
import { Button, Icon, Form ,Field,Toast} from "vant";
export default {
  name: "modifyPassword",
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]:Field,
    [Toast.name]:Toast
  },
  data() {
    return {
   
      username:'',
      password:'',
      newpassword:''
    };
  },
  computed: {
    // userAvatar() {
    //   let userAvatar =
    //     axios.defaults.baseURL.slice(0, -4) + localStorage.getItem("avatar");
    //   // console.log(localStorage.avatar == null);
    //   // console.log(imgUrl);
    //   console.log(userAvatar);
    //   return localStorage.avatar == null ? imgUrl : userAvatar;
    // }
  },
  mounted() {
    this.username = localStorage.username;
  },
  methods: {
    back() {
      // console.log();
      //   localStorage.clear();
      this.$router.go(-1);
    },
    onSubmit() {
        let data={
            username:this.username,
            password:this.password,
            newpassword:this.newpassword
        }
        console.log(data);
        
        this.$axios.post('/mobile/ModifyPassword',data)
        .then(res=>{
            console.log(res.data);
            
            
            if(res.data==='success'){
                // console.log(1111);
                
                Toast.success('修改成功,重新登录') 
                localStorage.clear()
                this.$router.push('/Login')
            
            }else{
                 Toast.error('修改失败');
               this.password=''
               this.newpassword=''
            }
           
            
        })
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
  margin-bottom: 0.2rem;
}

.content {
  background-color: #f0f0f0;
  width: 100%;
  height: 87vh;
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

.sub {
  width: 80%;
  margin: 1rem auto 0 auto;
}
</style>