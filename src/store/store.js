import { createStore } from 'vuex';
import UserSessionManager from '../UserSessionManager';

export default createStore({
  state: {
    isAuthenticated: UserSessionManager.isAuthenticated()
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value;
    }
  },
  actions: {
    authenticate({ commit }, isAuthenticated) {
      commit('SET_AUTHENTICATED', isAuthenticated);
    },
    logout({ commit }) {
      UserSessionManager.clearSessionData();
      commit('SET_AUTHENTICATED', false);
    }
  }
});
