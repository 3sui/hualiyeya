import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/axios'
import './plugins/vant.js'
import { Toast} from "vant";

Vue.config.productionTip = false
Vue.use(Toast);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
