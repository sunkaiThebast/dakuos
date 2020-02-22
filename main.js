import Vue from 'vue'
import App from './App'
import hxNavbar from "./components/hx-navbar/hx-navbar.vue"
import uniIcons from "./components/uni-icons/uni-icons.vue"
import store from './store'  
Vue.prototype.$store = store  
Vue.component('hx-navbar',hxNavbar)
Vue.component('uni-icons',uniIcons)
Vue.config.productionTip = false
App.mpType = 'app'
//返回上一层
Vue.prototype.Goback = function (obj) {  
    uni.navigateBack(1)
}; 
//loding
//反馈组件
import yangrMsg from "./components/yangr-msg/yangr-msg.vue"
Vue.component('yangrMsg',yangrMsg)
const app = new Vue({
    ...App	
})
app.$mount()
