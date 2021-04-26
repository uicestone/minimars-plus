import { make } from "vuex-pathify";

const state = {};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
};
