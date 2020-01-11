import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/home')
const Layout = () => import('@/views/layout')
const Question = () => import('@/views/question')
const Video = () => import('@/views/video')
const User = () => import ('@/views/user')
const Profile = () => import ('@/views/user/profile')
const Chat = () => import ('@/views/user/chat')
const Login = () => import ('@/views/login')
const Search = () => import ('@/views/search')
const SearchResult = () => import ('@/views/search/result')
const Article = () => import ('@/views/article')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/question',
        component: Question
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/user',
        component: User
      }
    ]
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/user/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/search/result',
    name: 'result',
    component: SearchResult
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  }

]

// eslint-disable-next-line no-undef
const router = new Router({
  routes
})

export default router
