import { make } from "vuex-pathify";
import moment from "moment";

const state = {
  newBookingDate: moment().format("YYYY-MM-DD"),
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
};
