import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = axios.create({ baseURL: base + "api/" });

export default new Vuex.Store({
  state: {
    pokemon: [],
    userPreferences: {}
  },
  mutations: {
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setUser(state, user) {
      state.userPreferences = user;
    }
  },
  actions: {
    async getAll({ commit, dispatch }) {
      let res = await api.get("values");
      commit("setPokemon", res.data);
    },
    async setUser({ commit, dispatch }, user) {
      debugger;
      let res = await api.post("users", user);
      commit("setUser", res.data);
    }
  },
  modules: {}
});
