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
                name: 'goodsList',
                component: () => import(/* webpackChunkName: "GoodsList" */ '../views/Goods/GoodsList.vue')
            },
            {
                path: 'goodsCategory',
                name: 'goodsCategory',
                component: () => import(/* webpackChunkName: "GoodsCategory" */ '../views/Goods/GoodsCategory.vue')
            },
            {
                path: 'usersList',
                name: 'usersList',
                component: () => import(/* webpackChunkName: "UsersList" */ '../views/User/UsersList.vue')
            },
            {
                path: 'orderList',
                name: 'orderList',
                component: () => import(/* webpackChunkName: "UsersList" */ '../views/Order/OrderList.vue')
            },
            {
                path: 'statistics',
                name: 'statistics',
                component: () => import(/* webpackChunkName: "Statistics" */ '../views/Statistics/Statistics.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
