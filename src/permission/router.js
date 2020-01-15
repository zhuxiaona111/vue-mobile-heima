import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    let topath = { path: '/login', query: { redirectUrl: to.path } }
    next(topath)
  }
  next()
})
export default router
