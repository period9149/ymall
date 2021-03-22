import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/',
        name: 'Index',
        component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
      },
      {
        path: '/categories',
        name: 'Category',
        component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
      },      
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/productDetail',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "productDetail" */ '../views/product/ProductDetail.vue')
  },  
]

const router = new VueRouter({
  routes
})

export default router
