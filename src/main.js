import Vue from 'vue'
import App from './App.vue'
import vuetify from "./plugins/vuetify";
import store from './store/index'
import PortalVue from 'portal-vue'

Vue.use(PortalVue);
Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false

export const vue = new Vue({
  el: '#app',
  store,
  vuetify,
  render: h => h(App),
})



