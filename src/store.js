import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searched: false,
    query: "",
    pageToken: null,
    videos: [],
    loading: false
  },
  mutations: {
    query(state, payload) {
      state.query = payload;
    },
    searched(state, payload) {
      state.searched = payload;
    },
    pageToken(state, payload) {
      state.pageToken = payload;
    },
    videos(state, payload) {
      state.videos = payload;
    },
    loading(state, payload) {
      state.loading = payload;
    },
    pageScroll(state, payload) {
      state.pageScroll = payload;
    }
  },
  actions: {}
});
