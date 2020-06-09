<!--
 * @Author: your name
 * @Date: 2020-06-08 10:09:22
 * @LastEditTime: 2020-06-08 14:00:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mobile\src\App.vue
--> 
<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <div>
      <p>
        If iView is successfully added to this project, you'll see an
        <code v-text="'<Button>'"></code>
        below
      </p>
      <van-button type="primary">Button</van-button>
      <van-count-down :time="time" />
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      time: 30 * 60 * 60 * 1000
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
