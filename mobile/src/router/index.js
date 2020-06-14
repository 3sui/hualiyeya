import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
  path: '/Login',
  name: 'Login',
  component: () => import('../components/Login'),
  meta: {
    title: '登录'
  }
},
{
  path: '/',
  redirect: '/Login'
},
{
  path: '/Home',
  name: 'Home',
  component: () => import('../components/Home'),
  meta: {
    title: '主页'
  },
  children: [

    {
      path: '/DeviceManage',
      name: 'DeviceManage',
      component: () => import('../components/DeviceManage'),
      meta: {
        title: '设备管理'
      },
     },
        {
          path: '/DeviceDetail',
          name: 'DeviceDetail',
          component: () => import('../components/DeviceDetail'),
          meta: {
            title: '设备详情'
          }

        },
    {
      path: '/DeviceAlarm',
      name: 'DeviceAlarm',
      component: () => import('../components/DeviceAlarm'),
      meta: {
        title: '设备报警'
      }
    },
    {
      path: '/AlarmHandle',
      name: 'AlarmHandle',
      component: () => import('../components/AlarmHandle'),
      meta: {
        title: '报警处理'
      }
    },
    {
      path: '/RepairRecord',
      name: 'RepairRecord',
      component: () => import('../components/RepairRecord'),
      meta: {
        title: '维修记录'
      }
    },
    {
      path: '/RepairDetail',
      name: 'RepairDetail',
      component: () => import('../components/RepairDetail'),
      meta: {
        title: '维修记录详情'
      }
    },
    {
      path: '/NewRepairRecord',
      name: 'NewRepairRecord',
      component: () => import('../components/NewRepairRecord'),
      meta: {
        title: '新建工单'
      }
    },
    {
      path: '/EditRepairRecord',
      name: 'EditRepairRecord',
      component: () => import('../components/EditRepairRecord'),
      meta: {
        title: '工单编辑'
      }
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: () => import('../components/Settings'),
      meta: {
        title: '设置'
      }
    }

  ]
},
{
  path: '*',
  redirect: '/404'
}

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
