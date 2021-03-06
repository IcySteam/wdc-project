import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultHome from '../views/Default/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
  },
  {
    path: '/LoremIpsum',
    name: 'LoremIpsum',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoremIpsum.vue')
  },
  {
    path: '/Default/Home',
    name: 'DefaultHome',
    component: DefaultHome
  },
  {
    path: '/Default/About',
    name: 'DefaultAbout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Default/About.vue')
  },
  {
    path: '/User/Home',
    name: 'UserHome',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserHome.vue')
  },
  {
    path: '/User/Account',
    name: 'UserAccount',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserAccount.vue')
  },
  {
    path: '/Auth/SignUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "new_users" */ '../views/Auth/SignUp.vue')
  },
  {
    path: '/Auth/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login_users" */ '../views/Auth/Login.vue')
  },
  {
    path: '/Manager/Home',
    name: 'ManagerHome',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManagerHome.vue')
  },
  {
    path: '/Manager/Account',
    name: 'ManagerAccount',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManagerAccount.vue')
  },
  {
    path: '/Admin/Home',
    name: 'AdminHome',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminHome.vue')
  },
  {
    path: '/Admin/Account',
    name: 'AdminAccount',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminAccount.vue')
  },
  {
    path: '/Admin/Administration',
    name: 'AdminAdministration',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminAdministration.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
