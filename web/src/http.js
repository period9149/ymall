import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';

import router from './router'
import store from './store'

Vue.use(Toast);

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

http.interceptors.request.use(config => {
    return config
})

http.interceptors.response.use(response => {
    let res = response.data
    if(res.code == 200){
        return response
    }else{
        Toast.fail(res.msg)
        return Promise.reject(res.msg)
    }
}, error => {
    if(error.response.data){
        error.message = error.response.data.msg
    }
    if(error.response.status == 401){
        store.commit('emoveInfo')
        router.push('/login')
    }
    Toast.fail(error.message)
    return Promise.reject(error)
})

export default http