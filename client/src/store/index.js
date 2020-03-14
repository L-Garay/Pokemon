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
    name: ""
  },
  mutations: {
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setName(state, name) {
      state.name = name;
    }
  },
  actions: {
    async getAll({ commit, dispatch }) {
      let res = await api.get("values");
      debugger;
      commit("setPokemon", res.data);
    },
    async setName({ commit, dispatch }) {
      let res = await api.post("user");
      commit("setName", res.data);
    }
  },
  modules: {}
});
