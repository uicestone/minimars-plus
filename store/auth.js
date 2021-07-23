import { make } from "vuex-pathify";

const token = uni.getStorageSync("token");

const state = {
  user: {},
  token: token || "",
  openid: "",
  session_key: "",
  atStore: null,
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
};
