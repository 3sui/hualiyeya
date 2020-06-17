<template>
  <div class="home">
    <div id="content-box">
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
    Menu
  }
};
</script>

<style>

.home{
  background: #f0f0f0;
}


.content-box {
  background-color: #f0f0f0;
  min-height: 95vh;
}
</style>