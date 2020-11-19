/*
 * @Author: your name
 * @Date: 2020-06-24 08:54:24
 * @LastEditTime: 2020-08-25 15:00:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \远程监控平台\mobile\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/axios'
import './plugins/vant.js'
import { Toast } from "vant";

Vue.use(Toast);
Vue.prototype.$Toast = Toast
    // import pdf from '@/components/pdf'
    // Vue.use(pdf)

// Vue.prototype.$axios = axios;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 设备远程诊断系统`;
    const role = localStorage.getItem('role');
    if (!role && to.path !== '/login') {
        next('/login');
    }
    // else if (to.meta.permission===4) {
    //   // 如果是维修工
    //   role === '4'? next() : next('/403');
    // } else if (to.meta.permission === 1){
    //   role === '1'? next() : next('/403');
    // } else if (to.meta.permission ===[1,4]) {
    //   role === '1' || role === '4'? next() : next('/403');
    // } else if (to.meta.permission === [1, 2]) {
    //   role === '1' || role === '2' ? next() : next('/403');
    // } else
    else {
        next();
    }

});




new Vue({
    router,
    render: h => h(App),
}).$mount('#app')