import axios from 'axios'
import ViewUI from 'view-design'
import router from './router'
import store from './store'

const http = axios.create({
    baseURL: 'http://localhost:8081'
})

http.interceptors.request.use(config => {
    return config
})

http.interceptors.response.use(response => {
    let res = response.data
    if(res.code == 200){
        return response
    }else{
        ViewUI.Message.error(res.msg)
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
    ViewUI.Message.error(error.message)
    return Promise.reject(error)
})

export default http