import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router/index"
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});
export default new Vuex.Store({
  state: {
      obj:{}
  },
  mutations: {
      func(state,a){
          state.obj = a
      },
      backRoute(){
         router.go(-1);
      },
      xx(){
        router.push('/discover')
      },
      msite(){
          router.push("/msite")
      }
  },
  actions: {
  },
  modules: {
  },
    plugins: [vuexLocal.plugin],
})
