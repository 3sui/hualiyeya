<template>
  <div class="menu">
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item
        v-for="item,index in items"
        :key="index"
        :icon="item.icon"
        :to="item.index"
        v-if="item.show"
      >{{item.title}}</van-tabbar-item>
      <!-- <van-tabbar-item icon="bell" v-if="true">设备报警</van-tabbar-item>
      <van-tabbar-item icon="notes-o" v-if="true">维修记录</van-tabbar-item>
      <van-tabbar-item icon="plus" v-if="false">新建工单</van-tabbar-item>-->
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Notify } from "vant";
export default {
  name: "Menu",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Notify.name]: Notify
  },

  watch: {
    //监听路由变化
    $route(to) {
      this.tabbarActive(to.index);
    }
  },

 
  data() {
    return {
      active: 0,
      items: [
        {
          index: "DeviceManage",
          title: "设备管理",
          icon: "wap-home",
          show: true
        },
        {
          index: "DeviceAlarm",
          title: "设备报警",
          icon: "bell",
          show: true
        },
        {
          index: "RepairRecord",
          title: "维修记录",
          icon: "notes-o",
          show: true
        },
        {
          index: "NewRepairRecord",
          title: "新建工单",
          icon: "plus",
          show: true
        },
        {
          index: "Settings",
          title: "设置",
          icon: "setting-o",
          show: true
        }
      ]
    };
  },
  methods: {
    tabbarActive(path) {
      var index = this.items.map(item => item.index).indexOf(path);
      if (index != -1) {
        this.active = index;
      }
    },
    
  }
};
</script>

<style>
.menu {
  height: 5vh;
  /* background-color: #DFDFDF; */
}
</style>