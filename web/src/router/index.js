import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/ChangePassword',
                    component: () => import( /* webpackChunkName: "dashboard" */ '../components/common/ChangePassword.vue'),
                    meta: {
                        title: '修改密码',
                        auth: []
                    }
                }, {
                    path: '/dashboard',
                    component: () => import( /* webpackChunkName: "dashboard" */ '../components/home/Dashboard.vue'),
                    meta: {
                        title: '系统首页',
                        auth: []
                    }
                },
                {
                    path: '/map',
                    component: () => import( /* webpackChunkName: "map" */ '../components/Map/map.vue'),
                    meta: {
                        title: '设备地图',
                        auth: []
                    }
                },
                {
                    path: '/DeviceList',
                    component: () => import( /* webpackChunkName: "DeviceList" */ '../components/deviceRecord/DeviceList.vue'),
                    meta: {
                        title: '设备列表',
                        auth: []

                    }
                },
                {
                    path: '/productDetails',
                    component: () => import( /* webpackChunkName: "ProductDetails" */ '../components/deviceRecord/ProductDetails.vue'),
                    meta: {
                        title: '设备详情',
                        auth: []

                    }
                },
                {
                    path: '/DevicePointSet',
                    component: () => import( /* webpackChunkName: "ProductDetails" */ '../components/deviceRecord/DevicePointSet.vue'),
                    meta: {
                        title: '测点设置',
                        auth: [3]

                    }
                },
                {
                    path: '/addnewproduct',
                    component: () => import( /* webpackChunkName: "ProductDetails" */ '../components/deviceRecord/AddNewProduct.vue'),
                    meta: {
                        title: '添加设备',
                        auth: [3]
                    }
                },
                {
                    path: '/deviceSettings',
                    component: () => import( /* webpackChunkName: "ProductDetails" */ '../components/deviceRecord/DeviceSettings.vue'),
                    meta: {
                        title: '测点配置',
                        auth: [3]
                    }
                },
                {
                    path: '/maintenancerecords',
                    component: () => import( /* webpackChunkName: "MaintenanceRecords" */ '../components/deviceRecord/MaintenanceRecords.vue'),
                    meta: {
                        title: '维修记录'
                    }
                },
                {
                    path: '/maintenancedetails',
                    component: () => import( /* webpackChunkName: "MaintenanceDetails" */ '../components/deviceRecord/MaintenanceDetails.vue'),
                    meta: {
                        title: '维修详情'
                    }
                },
                {
                    path: '/AddNewMaintenance',
                    component: () => import( /* webpackChunkName: "AddNewMaintenance" */ '../components/view/AddNewMaintenance.vue'),
                    meta: {
                        title: '添加维修记录'
                    }
                },
                {
                    path: '/EquipmentMonitoring',
                    component: () => import( /* webpackChunkName: "EquipmentMonitoring" */ '../components/maintain/EquipmentMonitoring.vue'),
                    meta: {
                        title: '设备监控'
                    }
                },
                {
                    path: '/MeasuringPointDetails',
                    component: () => import( /* webpackChunkName: "MeasuringPointDetails" */ '../components/maintain/MeasuringPointDetails.vue'),
                    meta: {
                        title: '测点详情'
                    }
                },
                {
                    path: '/AlarmRecord',
                    component: () => import( /* webpackChunkName: "AlarmRecord" */ '../components/maintain/AlarmRecord.vue'),
                    meta: {
                        title: '报警记录'
                    }
                },
                {
                    path: '/ServiceBooklet',
                    component: () => import( /* webpackChunkName: "ServiceBooklet" */ '../components/view/ServiceBooklet.vue'),
                    meta: {
                        title: '服务手册'
                    }
                },
                {
                    path: '/AddBooklet',
                    component: () => import( /* webpackChunkName: "AddBooklet" */ '../components/view/AddBooklet.vue'),
                    meta: {
                        title: '添加服务手册'
                    }
                },
                {
                    path: '/ImportingBooklet',
                    component: () => import( /* webpackChunkName: "ImportingBooklet" */ '../components/view/ImportingBooklet.vue'),
                    meta: {
                        title: '导入服务手册'
                    }
                },
                {
                    path: '/EnterpriseView',
                    component: () => import( /* webpackChunkName: "EnterpriseView" */ '../components/view/EnterpriseView.vue'),
                    meta: {
                        title: '企业视图'
                    }
                },
                {
                    path: '/AdminView',
                    component: () => import( /* webpackChunkName: "AdminView" */ '../components/view/AdminView.vue'),
                    meta: {
                        title: '管理员视图'
                    }
                },




                //基础数据管理
                //行业设置
                {
                    path: '/Industry',
                    component: () => import( /* webpackChunkName: "Industry" */ '../components/DataSettings/Industry.vue'),
                    meta: {
                        title: '行业设置'
                    }

                },

                //企业管理
                {
                    path: '/Enterprise',
                    component: () => import( /* webpackChunkName: "Enterprise" */ '../components/DataSettings/Enterprise.vue'),
                    meta: {
                        title: '企业管理'
                    }
                },

                //用户信息
                {
                    path: '/UserInfo',
                    component: () => import( /* webpackChunkName: "UserInfo" */ '../components/DataSettings/UserInfo.vue'),
                    meta: {
                        title: '用户信息'
                    }
                },
                {
                    path: '/DeviceType',
                    component: () => import( /* webpackChunkName: "DeviceType" */ '../components/DataSettings/DeviceType.vue'),
                    meta: {
                        title: '设备类型'
                    }
                },
                {
                    path: '/FaultType',
                    component: () => import( /* webpackChunkName: "FaultType" */ '../components/DataSettings/FaultType.vue'),
                    meta: {
                        title: '故障种类'
                    }
                },
                {
                    path: '/Authority',
                    component: () => import( /* webpackChunkName: "Authority" */ '../components/DataSettings/Authority.vue'),
                    meta: {
                        title: '用户管理'
                    }
                },

                //角色设置
                // {
                //     path: '/RoleList',
                //     component: () => import( /* webpackChunkName: "RoleList" */ '../components/view/RoleList.vue'),
                //     meta: {
                //         title: '角色设置'
                //     }
                // },


                //分析中心
                //设备分析
                {
                    path: '/DeviceAnalysis',
                    component: () => import( /* webpackChunkName: "DeviceAnalysis" */ '../components/Analysis/DeviceAnalysis.vue'),
                    meta: {
                        title: '设备分析'
                    }
                },
                //行业分析
                {
                    path: '/IndustryAnalysis',
                    component: () => import( /* webpackChunkName: "IndustryAnalysis" */ '../components/Analysis/IndustryAnalysis.vue'),
                    meta: {
                        title: '行业分析'
                    }
                },
                //设备分析
                {
                    path: '/FaultAnalysis',
                    component: () => import( /* webpackChunkName: "FaultAnalysis" */ '../components/Analysis/FaultAnalysis.vue'),
                    meta: {
                        title: '故障分析'
                    }
                },

                //dome
                {
                    path: '/icon',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: {
                        title: '自定义图标'
                    }
                },
                {
                    path: '/table',
                    component: () => import( /* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: {
                        title: '基础表格'
                    }
                },
                {
                    path: '/tabs',
                    component: () => import( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: {
                        title: 'tab选项卡'
                    }
                },
                {
                    path: '/form',
                    component: () => import( /* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: {
                        title: '基本表单'
                    }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import( /* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: {
                        title: 'markdown编辑器'
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import( /* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: {
                        title: '文件上传'
                    }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import( /* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: {
                        title: 'schart图表'
                    }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import( /* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: {
                        title: '拖拽列表'
                    }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import( /* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: {
                        title: '拖拽弹框'
                    }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import( /* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: {
                        title: '国际化'
                    }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: {
                        title: '权限测试',
                        permission: true
                    }
                },
                {
                    path: '/404',
                    component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: {
                        title: '403'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '../components/login/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});