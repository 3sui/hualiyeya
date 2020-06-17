import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/axios'
import './plugins/vant.js'
import { Toast} from "vant";


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 设备远程管理系统`;
  const role = localStorage.getItem('role');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission===1) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === '1' || role === '4'? next() : next('/403');
  } else if (to.meta.permission === 2){
    role === '2' || role === '3'? next() : next('/403');
  }else
  {
      next();
    }
  
});




Vue.use(Toast);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
