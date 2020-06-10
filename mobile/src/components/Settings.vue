<template>
  <div class="settings">
    <div class="login">
      <div class="title">设置</div>
    
      <div class="content"> 
           <van-divider style="margin:0" />
        <div class="vactor">
          <div class="icon_container">
            <van-icon class="icon_vactor" size="5rem" color="#CCCCCC" name="manager" />
          </div>
        </div>
        <van-button round block type="danger" class="quit" @click="quit">退出</van-button>
      </div>
    </div>
  </div>
</template>


<script>
import { Button, Icon, Divider } from "vant";
export default {
  name: "Settings",
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Divider.name]: Divider
  },
  methods:{
    quit(){
      // console.log();
      
      this.$router.push('/Login')
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
  padding: 30% 0;

  height: 6rem;

  
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

.quit{
    width: 95%;
    margin: auto;
}
</style>