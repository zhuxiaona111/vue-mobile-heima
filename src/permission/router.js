import router from '@/router'
import store from '@/store'

router.beforEach(function (to, from, next) {
  if (to.path.startWith('/user') && !store.state.user.token) {
    let topath = { path: '/login', query: { redirectUrl: to.path } }
    next(topath)
  }
  next()
})
export default router
