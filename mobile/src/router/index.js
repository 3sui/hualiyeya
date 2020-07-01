import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
{
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
        title: '设备管理',
        permission:[1,2]
      },
    },
    {
      path: '/DeviceDetail',
      name: 'DeviceDetail',
      component: () => import('../components/DeviceDetail'),
      meta: {
        title: '设备详情',
        permission: [1,2]
      }

    },
    {
      path: '/Review',
      name: 'Review',
      component: () => import('../components/Review'),
      meta: {
        title: '查看手册',
        permission: [1,2]
      }
    },
    {
      path: '/DeviceAlarm',
      name: 'DeviceAlarm',
      component: () => import('../components/DeviceAlarm'),
      meta: {
        title: '设备报警',
        permission: 1
      }
    },
    {
      path: '/AlarmHandle',
      name: 'AlarmHandle',
      component: () => import('../components/AlarmHandle'),
      meta: {
        title: '报警处理',
        permission: 1
      }
    },
    {
      path: '/RepairRecord',
      name: 'RepairRecord',
      component: () => import('../components/RepairRecord'),
      meta: {
        title: '维修记录',
        permission: [1,4]
      }
    },
    {
      path: '/RepairDetail',
      name: 'RepairDetail',
      component: () => import('../components/RepairDetail'),
      meta: {
        title: '维修记录详情',
        permission: [1, 4]
      }
    },
    {
      path: '/NewRepairRecord',
      name: 'NewRepairRecord',
      component: () => import('../components/NewRepairRecord'),
      meta: {
        title: '新建工单',
        permission: 4
      }
    },
    {
      path: '/EditRepairRecord',
      name: 'EditRepairRecord',
      component: () => import('../components/EditRepairRecord'),
      meta: {
        title: '工单编辑',
        permission: 4
      }
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: () => import('../components/Settings'),
      meta: {
        title: '设置'
      }
    },
    {
      path: '/modifyPassword',
      name: 'modifyPassword',
      component: () => import('../components/modifyPassword'),
      meta: {
        title: '修改密码'
      }
    },
    {
      path: '/404',
      component: () => import( /* webpackChunkName: "404" */ '../components/404.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/403',
      component: () => import( /* webpackChunkName: "403" */ '../components/403.vue'),
      meta: {
        title: '403'
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
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router