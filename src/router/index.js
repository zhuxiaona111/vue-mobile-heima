import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
