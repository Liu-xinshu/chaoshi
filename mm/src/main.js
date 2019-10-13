import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from '@/store/store.js'
import axios from 'axios'
import Swiper from 'swiper/js/swiper'
import 'swiper/css/swiper.css'
Vue.prototype.Swiper = Swiper;
Vue.config.productionTip = false
Vue.prototype.$http = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')