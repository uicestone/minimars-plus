import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";

import booking from "./booking";

Vue.use(Vuex);

pathify.options.mapping = "simple";

const state = {
  loading: false,
};

const mutations = make.mutations(state);

const getters = {};

const store = new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  getters,
  mutations,
  modules: { booking },
});

Vue.prototype.$store = store;

export default store;
