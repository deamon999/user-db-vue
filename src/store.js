import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: []
    },
    mutations: {
        ADD_USER(state, payload) {
            state.users.unshift(payload);
        }
    },
    actions: {
        addUser(state, payload) {
            state.commit('ADD_USER', payload);
        }
    },
    getters: {
        getUsers(state) {
            return state.users;
        }
    }
})
