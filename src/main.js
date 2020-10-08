import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueLazyload from "vue-lazyload";
import Toast from "@/components/common/toast/Toast";

Vue.config.productionTip = false

Vue.use(Toast)
//使用懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  Toast,
  render: h => h(App)
}).$mount('#app')
