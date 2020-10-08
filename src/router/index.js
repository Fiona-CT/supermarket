import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/Category")
const Profile = () => import("../views/profile/Profile")
const ShoppingCart = () => import("../views/shoppingcart/ShoppingCart")
const Detail = () => import("@/views/detail/Detail")

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '',
    redirect:"/Home"

  },
  {
    path: "/home",
    component:Home
  },

  {
    path: "/category",
    component:Category
  },
  {
    path: "/profile",
    component:Profile
  },
  {
    path: "/shoppingcart",
    component:ShoppingCart
  },
  {
    path: "/detail/:iid",
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
