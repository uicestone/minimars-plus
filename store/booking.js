import { make } from "vuex-pathify";
import moment from "moment";

const state = {
  newBookingDate: moment().format("YYYY-MM-DD"),
  foodCart: []
};

const mutations = make.mutations(state);

export default {
  namespaced: true,
  state,
  mutations,
};
