<template>
  <div class="review">
    <div class="title">文档查看</div>

    <div class="content">
      <pdf class="document" :src="pdfPath" ></pdf >

     
<!-- 
      <canvas id="the-canvas"></canvas>
      <div class="foot" v-if='pdfDoc'>
        <button class='left' v-if="pageNum>1" @click="onPrevPage">上一页</button>
        <button class='right' v-if="pageNum<pdfDoc.numPages" @click="onNextPage">下一页</button>
        </div>
 -->

    </div>

    <div class="sub">
      <van-button round block type="info" class="quit" @click="back">返回</van-button>
    </div>
    <a href="../../static/xxx.xlsx" download="xxx.xlsx">下载</a>
  </div>
</template>


<script>
// import pdfPath from '../assets/pdf/1111.pdf';
import { Button } from "vant";
import pdf from '@/components/pdf'
// import pdf from 'pdfjs-dist';
export default {
  name: "Review",
  components: {
    pdf,
    [Button.name]: Button
  },
  data() {
    return {
    
    };
  },

  mounted () {
   this.$showPDF('/media/up/2018/3/9/494079c7ec333bd371798dd0a73c0a0b.pdf')
  

},

  methods: {
      userAvatar(){},


    back() {  
      console.log(1111);
      
      window.history.back()
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
.document{
  height: 96%;
  width: 96%;
  margin: 2%;
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