<template>
  <div class="menu">
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item
        v-for="item,index in items"
        :key="item.index"
        :icon="item.icon"
        :to="item.index"
        v-show="item.show"
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
    // $route(to) {
    //   this.tabbarActive(to.index);
      
    // },
    $route(){
    
      
      this.tabbarActive();
      }



  },
  created(){
       this.tabbarActive();
  },
  mounted() {
      this.getRole();
  
  },

  data() {
    return {
      active: 0,
      items: [
        {
          index: "DeviceManage",
          title: "设备管理",
          icon: "wap-home-o",
          show: true
        },
        {
          index: "DeviceAlarm",
          title: "设备报警",
          icon: "warning-o",
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
          title: "注销",
          icon: "setting-o",
          show: true
        }
      ]
    };
  },
  
  methods: {
    tabbarActive() {
      let path=this.$route.name;
    
      var index = this.items.map(item => item.index).indexOf(path);
      if (index != -1) {
        this.active = index;
        localStorage.active=index
      }
      // console.log(index);
      
    },

    //获取用户权限
    getRole() {
      if (localStorage) {
        let user_role = localStorage.getItem("role");
        if(user_role === "1") {
          this.items[3].show=false;
        }
        else
         if (user_role === "2" || user_role === "3") {
          // this.items[2].show = false; 
          this.items[1].show = false;
          this.items[3].show = false;
            
        }else {
        this.items[0].show = false;
        this.items[1].show = false;
      }
      } 
    }
  }
};
</script>

<style>
.menu {
  height: 5vh;
  /* background-color: #DFDFDF; */
}
</style>