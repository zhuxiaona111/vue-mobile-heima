import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.less'
import App from './App.vue'
import router from './permission/router'
import store from './store'
import 'amfe-flexible'
import '@/styles/index.less'
import plug from '@/utils/plug'
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(plug)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
