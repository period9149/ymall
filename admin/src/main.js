import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import router from './router'
import http from './http'
import store from './store'

Vue.use(ViewUI);

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
