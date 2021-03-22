import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/style.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
import http from './http'
import store from './store'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
