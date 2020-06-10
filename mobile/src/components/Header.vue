<template>
  <div class="header">
    <van-row >
      <van-col span="12">
        <span class="title">设备管理</span>
      </van-col>
      <van-col span="3" offset="9">
        <span class="alarm">
          <van-icon  name="bell" dot />
        </span>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { Col, Row } from "vant";
export default {
  name: "Header",

 
};
</script>

<style>
.header {
  background-color: white;
  height: 8vh;
 
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
  color: #1989FA;
}
</style>