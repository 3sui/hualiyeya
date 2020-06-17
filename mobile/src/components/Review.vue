<template>
  <div class="review">
    <div class="title">文档查看</div>

    <div class="content">
      <pdf :src="pdfPath" ></pdf>
    </div>

    <div class="sub">
      <van-button round block type="info" class="quit" @click="quit">返回</van-button>
    </div>
  </div>
</template>


<script>
import pdfPath from '../assets/pdf/1111.pdf';
import { Button } from "vant";
import pdf from 'vue-pdf';
export default {
  name: "Review",
  components: {
    [pdf.name]:pdf,
    [Button.name]: Button
  },
  data() {
    return {
    
    };
  },


  methods: {
      userAvatar(){},
    quit() {
      
      this.$router.push(-1);
    }
  }
};
</script>

<style scoped>
.review {
  height: 95vh;
}
.title {
  text-align: center;
  line-height: 8vh;
  background-color: white;
}

.content {
  

  height: 77vh;
}

.quit {
  width: 95%;
  /* margin: 20% auto 0 auto; */
}

.sub {
  width: 80%;
  margin: auto;
  height: 10vh;
}
</style>