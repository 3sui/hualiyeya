<template>
  <div class="home">
    <div id="conten-box">
      <router-view></router-view>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
// import Header from "./Header.vue";
import Menu from "./Menu.vue";
export default {
  name: "Home",
  components: {
    // Header,
    Menu
  }
};
</script>

<style>




.content-box {
  background-color: #f0f0f0;
  min-height: 95vh;
}
</style>