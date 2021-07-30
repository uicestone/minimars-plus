import { make } from "vuex-pathify";
import config from "../utils/config.js";
import axios from "../utils/request.js";

const token = uni.getStorageSync("token");
config.token = token;

let mobileSet;
const onMobileSet = new Promise((resolve) => {
  mobileSet = resolve;
});

const state = {
  user: {},
  token: token || "",
  openid: "",
  session_key: "",
  atStore: null,
  onMobileSet,
  isNew: false,
};

const actions = {
  async get() {
    if (!state.token) return;
    state.user = await axios.getRequest("/auth/user");
  },
  mobileSet,
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
