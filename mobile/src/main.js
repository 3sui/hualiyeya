import Vue from 'vue'
import App from './App.vue'
import router from './router'

import    './plugins/axios'
import './plugins/vant.js'
import { Toast } from "vant";

Vue.use(Toast);
Vue.prototype.$Toast = Toast
// import pdf from '@/components/pdf'
// Vue.use(pdf)
 
// Vue.prototype.$axios = axios;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 设备远程管理系统`;
  const role = localStorage.getItem('role');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission===4) {
    // 如果是维修工
    role === '4'? next() : next('/403');
  } else if (to.meta.permission === 1){
    role === '1'? next() : next('/403');
  } else if (to.meta.permission ===[1,4]) {
    role === '1' || role === '4'? next() : next('/403');
  } else if (to.meta.permission === [1, 2]) {
    role === '1' || role === '2' ? next() : next('/403');
  } else
  {
      next();
    }
  
});




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
