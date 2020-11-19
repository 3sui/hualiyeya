<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in rightitems">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <!-- <el-submenu :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu> -->
                            <el-menu-item :index="subItem.index" :key="subItem.index">
                                <template>{{ subItem.title }}</template>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            role: 1,
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '主页',
                    auth: []
                },
                {
                    icon: 'el-icon-lx-location',
                    index: 'map',
                    title: '用户地图',
                    auth: []
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '1devicebook',
                    title: '设备档案',

                    auth: [],
                    subs: [
                        {
                            index: 'DeviceList',
                            title: '设备列表',
                            auth: []
                        },
                        {
                            index: 'MaintenanceRecords',
                            title: '维修记录',
                            auth: [2, 3, 4]
                        }
                    ]
                },
                {
                    icon: 'el-icon-monitor',
                    index: 'remotemonitor',
                    title: '远程监控',

                    auth: [2, 3, 4],
                    subs: [
                        {
                            index: 'EquipmentMonitoring',
                            // index: 'DeviceList',

                            title: '设备监控',
                            auth: [2, 3, 4]
                        },
                        {
                            index: 'AlarmRecord',
                            title: '报警记录',
                            auth: [2, 3, 4]
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-data',
                    index: 'analysiscenter',
                    title: '分析中心',

                    auth: [2, 3, 4],
                    subs: [
                        {
                            index: 'DeviceAnalysis',
                            title: '设备分析',
                            auth: [2, 3, 4]
                        },
                        {
                            index: 'IndustryAnalysis',
                            title: '行业分析',
                            auth: [2, 3, 4]
                        },
                        {
                            index: 'FaultAnalysis',
                            title: '故障分析',
                            auth: [2, 3, 4]
                        }
                    ]
                },
                {
                    icon: 'el-icon-setting',
                    index: 'datasetting',
                    title: '基础数据管理',
                    auth: [2, 3, 4],

                    subs: [
                        {
                            index: 'Industry',
                            title: '行业设置',
                            auth: [2, 3, 4]
                        },
                        {
                            index: 'DeviceType',
                            title: '设备类型',
                            auth: [2, 3, 4]
                        },
                        {
                            index: 'FaultType',
                            title: '故障类型',
                            auth: [2, 3, 4]
                        },
                        {
                            index: 'Enterprise',
                            title: '企业管理',
                            auth: [2, 3, 4]
                        },
                        {
                            index: 'RoleInfo',
                            title: '角色管理',
                            auth: [2, 3, 4]
                        },

                        {
                            index: 'Authority',
                            title: '用户管理',
                            auth: [2, 3, 4]
                        }
                    ]
                }
            ],
            rightitems: [],
            rights: []
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        this.role = window.localStorage.role;
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        console.log(this.role);

        this.getRights();
    },

    methods: {
        getRights() {
            let data = {
                id: this.role
            };
            this.$axios
                .post('/dataSettings/getRights', { id: this.role })
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
                         if (this.items[i].subs) {
                            let result=JSON.parse(JSON.stringify(this.items[i]));
                            console.log(result);
                            let sub= this.items[i].subs.filter((subitem) => {
                                if (this.rights.includes(subitem.index)) {
                                    return subitem;
                                }
                            });
                            console.log(sub);
                            if(sub.length != 0){
                                result.subs =sub;
                                this.rightitems.push(result) ;
                            }else{
                                break ;
                            }
                            

                            
                        } else {
                            if (this.rights.includes(this.items[i].index)) {
                               this.rightitems.push(this.items[i]) ;
                            }
                        }

                    }

             
                       
                   
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
