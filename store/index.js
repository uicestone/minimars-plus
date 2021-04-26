import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";

import config from "./config";
import auth from "./auth";
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
  modules: { config, auth, booking },
});

Vue.prototype.$store = store;

global.store = store;

export default store;
