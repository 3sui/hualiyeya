<template>
  <div class="menu">
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item
        v-for="item,index in rightitems"
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
    this.getRights();
   
  },
  mounted() {
     this.tabbarActive();
  },

  data() {
    return {
      active: "",
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
      ],
      rights:[],
      rightitems:[],
      role:"",
    };
  },
  
  methods: {
    tabbarActive() {
      let path=this.$route.name;
      console.log(path);
      let list=this.rightitems.map(item => item.index)
      console.log(list);
      var index =list.indexOf(path);
      if (index > -1) {
        this.active = index;
        localStorage.active=index
      }
      console.log(index);
      
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
    },
      getRights() {
            let data = {
                id: window.localStorage.role
            };
            this.$axios
                .post('/dataSettings/getRights',data)
                .then((res) => {
                    console.log(res.data);
                    window.localStorage.read=res.data.read
                    if(res.data.operation.length>0){
                    window.localStorage.operation=res.data.operation.split(',')
                    }else{
                        window.localStorage.operation=[]
                    }
                    this.rights = res.data.rights.split(',') || [];
                    for(let i=0;i<this.items.length;i++){
                       
                            if (this.rights.includes(this.items[i].index)) {
                               this.rightitems.push(this.items[i]) ;
                            }
                        
                    }
                    this.tabbarActive()
                })
                // .then(()=>{
                //    this.tabbarActive()
                // })
                .catch((error) => {
                    console.log(error);
                });
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