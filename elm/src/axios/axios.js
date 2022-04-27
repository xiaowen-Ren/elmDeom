import Vue from 'vue'
import axios from 'axios'
axios.defaults.withCredentials=true;

Vue.prototype.axios = axios;
import VueAxios from 'vue-axios'
Vue.prototype.VueAxios = VueAxios;