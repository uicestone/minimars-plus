import Vue from "vue";
import App from "./App";
import axios from "./utils/request.js";
import store from "./store";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

Vue.prototype.$onLaunched = new Promise((resolve) => {
  Vue.prototype.$launched = resolve;
});

Vue.filter("round", (v, digits) => {
  if (v === undefined || v === null || !v.toFixed) return "-";
  return +v.toFixed(digits);
});

App.mpType = "app";

const app = new Vue({
  store,
  ...App,
});
app.$mount();
