import { createStore } from 'vuex';
import UserSessionManager from '../UserSessionManager';

export default createStore({
  state: {
    isAuthenticated: UserSessionManager.isAuthenticated(),
    userEmail: UserSessionManager.getSessionData()?.email || ''
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value;
    },
    SET_USER_EMAIL(state, email) {
      state.userEmail = email;
    }
  },
  actions: {
    authenticate({ commit }, { isAuthenticated, email }) {
      commit('SET_AUTHENTICATED', isAuthenticated);
      commit('SET_USER_EMAIL', email);
    },
    logout({ commit }) {
      UserSessionManager.clearSessionData();
      commit('SET_AUTHENTICATED', false);
      commit('SET_USER_EMAIL', '');
    }
  }
});
