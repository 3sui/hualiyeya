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
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu
                        :index="item.index"
                        :key="item.index"
                        v-if="!item.auth.includes(+role)"
                    >
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs && subItem.auth.includes(+role)"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else-if="!subItem.auth.includes(+role)"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template>{{ subItem.title }}</template>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item
                        :index="item.index"
                        :key="item.index"
                        v-if="!item.auth.includes(role)"
                    >
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
                    index: '1',
                    title: '设备档案',

                    auth: [],
                    subs: [
                        {
                            index: 'DeviceList',
                            title: '设备列表',
                            auth: []
                            // subs: [
                            //     {
                            //         index: 'productlist',
                            //         title: '设备列表'
                            //     },
                            //     {
                            //         index: '',
                            //         title: '设备导入模板'
                            //     },
                            //     {
                            //         index: 'productDetails',
                            //         title: '设备详情'
                            //     },
                            //     {
                            //         index: 'addnewproduct',
                            //         title: '设备添加/编辑'
                            //     }
                            // ]
                        },
                        {
                            index: 'MaintenanceRecords',
                            title: '维修记录',
                            auth: [2, 3 ,4]
                        }
                        // {
                        //     index: 'EquipmentMonitoring',
                        //     // index: 'DeviceList',

                        //     title: '设备监控'
                        // },
                    ]
                },
                {
                    icon: 'el-icon-monitor',
                    index: '2',
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
                // {
                //     icon: 'el-icon-lx-calendar',
                //     index: 'ServiceBooklet',
                //     title: '服务手册'
                // },
                {
                    icon: 'el-icon-s-data',
                    index: '4',
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
                    index: '5',
                    title: '基础数据管理',
                    auth: [2, 3, 4],

                    subs: [
                        {
                            index: 'Industry',
                            title: '行业设置',
                            auth: [2, 3, 4]
                            // subs: [
                            //     {
                            //         index: '',
                            //         title: '新增'
                            //     }
                            // ]
                        },
                        {
                            index: 'Enterprise',
                            title: '企业管理',
                            auth: [2, 3, 4]
                        },
                        // {
                        //     index: 'UserInfo',
                        //     title: '用户信息',
                        //     auth: []
                        // },
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
                            index: 'Authority',
                            title: '用户管理',
                            auth: [2, 3, 4]
                        }
                    ]
                }

                //dome

                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'table',
                //     title: '基础表格'
                // },
                // {
                //     icon: 'el-icon-lx-copy',
                //     index: 'tabs',
                //     title: 'tab选项卡'
                // },
                // {
                //     icon: 'el-icon-lx-calendar',
                //     index: '6',
                //     title: '表单相关',
                //     subs: [
                //         {
                //             index: 'form',
                //             title: '基本表单'
                //         },
                //         {
                //             index: '6-2',
                //             title: '三级菜单',
                //             subs: [
                //                 {
                //                     index: 'editor',
                //                     title: '富文本编辑器'
                //                 },
                //                 {
                //                     index: 'markdown',
                //                     title: 'markdown编辑器'
                //                 }
                //             ]
                //         },
                //         {
                //             index: 'upload',
                //             title: '文件上传'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-emoji',
                //     index: 'icon',
                //     title: '自定义图标'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'charts',
                //     title: 'schart图表'
                // },
                // {
                //     icon: 'el-icon-rank',
                //     index: '7',
                //     title: '拖拽组件',
                //     subs: [
                //         {
                //             index: 'drag',
                //             title: '拖拽列表'
                //         },
                //         {
                //             index: 'dialog',
                //             title: '拖拽弹框'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                // {
                //     icon: 'el-icon-lx-warn',
                //     index: '8',
                //     title: '错误处理',
                //     subs: [
                //         {
                //             index: 'permission',
                //             title: '权限测试'
                //         },
                //         {
                //             index: '404',
                //             title: '404页面'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-redpacket_fill',
                //     index: '/donate',
                //     title: '支持作者'
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        this.role = localStorage.role;
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        console.log(this.role);
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
