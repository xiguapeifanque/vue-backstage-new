import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/app.css'
import '@/assets/font-awesome/css/font-awesome.css'
import store from './store'
import VueJsonp from 'vue-jsonp'

// 引入路由
import router from "./router/index.js"    // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错
Vue.use(VueJsonp)

new Vue({
  el: '#app',
  store,
  router,  // 注入到根实例中,变量名和属性相同 简写
  components: { App },
  template: '<App/>'
})