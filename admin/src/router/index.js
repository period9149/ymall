import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/about',
                name: 'About',
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
            },
            {
                path: 'goodsList',
                name: 'GoodsList',
                component: () => import(/* webpackChunkName: "GoodsList" */ '../views/Goods/GoodsList.vue'),
            },
            {
                path: 'goodsCategory',
                name: 'GoodsCategory',
                component: () => import(/* webpackChunkName: "GoodsCategory" */ '../views/Goods/GoodsCategory.vue')
            },
            {
                path: 'goodsAdd',
                name: 'GoodsAdd',
                component: () => import(/* webpackChunkName: "GoodsEdit" */ '../views/Goods/GoodsEdit.vue')
            },
            {
                path: 'goodsUpdate/:id',
                name: 'GoodsUpdate',
                component: () => import(/* webpackChunkName: "GoodsEdit" */ '../views/Goods/GoodsEdit.vue')
            },            
            {
                path: 'usersList',
                name: 'UsersList',
                component: () => import(/* webpackChunkName: "UsersList" */ '../views/User/UsersList.vue')
            },
            {
                path: 'orderList',
                name: 'OrderList',
                component: () => import(/* webpackChunkName: "OrderList" */ '../views/Order/OrderList.vue')
            },
            {
                path: 'orderUpdate/:id',
                name: 'OrderUpdate',
                component: () => import(/* webpackChunkName: "OrderUpdate" */ '../views/Order/OrderUpdate.vue')
            },
            {
                path: 'statistics',
                name: 'Statistics',
                component: () => import(/* webpackChunkName: "Statistics" */ '../views/Statistics/Statistics.vue')
            },
            {
                path: 'swipesList',
                name: 'SwipesList',
                component: () => import(/* webpackChunkName: "SwipesList" */ '../views/Index/SwipesList.vue')
            },            
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: { isPublic: true },
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if(!to.meta.isPublic && !localStorage.token){
      return next('/login')
    }
    next()
  })

export default router
