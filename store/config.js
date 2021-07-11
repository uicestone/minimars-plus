import { make } from "vuex-pathify";

const state = {
  common: {},
  stores: [],
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
};
