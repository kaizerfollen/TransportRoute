import Vue from 'vue';
import Vuex from 'vuex';
import data from './modules/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    errors: {},
    zoomMap: 5,
    centerMap: [64.2113182, 39.5523854],
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    activeTab: 'routes',
    activeRoute: {},
  },

  getters: {
    isLoading: (state) => state.isLoading,
    errors: (state) => state.errors,
    activeTab: (state) => state.activeTab,
    activeRoute: (state) => state.activeRoute,
  },

  mutations: {
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },

    SET_ERRORS(state, payload) {
      state.errors = payload;
    },

    SET_ACTIVE_TAB(state, payload) {
      state.activeTab = payload;
    },

    SET_ACTIVE_ROUTE(state, payload) {
      state.activeRoute = payload;
    },
  },

  modules: {
    data,
  },
});
