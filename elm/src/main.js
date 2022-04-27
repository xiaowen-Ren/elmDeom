import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/resert.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import "./axios/axios"
// import api from './request/api'

// Vue.prototype.$api = api;
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
