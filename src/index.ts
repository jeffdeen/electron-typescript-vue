import * as vueelectron from "vue-electron";
import Vue from "vue";

import AppComponent from "./App.vue";
import router from "./router";
import store from "./store";

if (! process.env.IS_WEB) Vue.use(vueelectron);
Vue.config.productionTip = false;

export default new Vue({
  components: { AppComponent },
  render: h => h(AppComponent),
  router,
  store
} as any).$mount("#app");
