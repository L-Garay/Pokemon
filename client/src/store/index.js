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
    userPreferences: {
      name: "",
      militaryTimeSelected: false,
      setName: true
    },
    photo: null,
    savedPhotos: [],
    quote: null
  },
  mutations: {
    // User methods
    setUser(state, user) {
      state.userPreferences = user;
    },

    // Photo methods
    setPhoto(state, photo) {
      state.photo = photo;
      console.log("state.photo", state.photo);
    },
    setSavedPhotos(state, photos) {
      state.savedPhotos = photos;
      console.log(state.savedPhotos);
    },

    // Quote methods
    setQuote(state, quote) {
      state.quote = quote;
      console.log(quote);
    }
  },
  actions: {
    // User methods
    async setUser({ commit, dispatch }, user) {
      await api.post("users", user);
      dispatch("getUser");
    },
    async getUser({ commit, dispatch }) {
      let res = await api.get("users");
      commit("setUser", res.data);
      return res.data;
    },

    // Photo methods
    async getPhoto({ commit, dispatch }) {
      let res = await api.get("photos");
      commit("setPhoto", res.data);
    },
    async savePhoto({ commit, dispatch, state }, photo) {
      let combo = {
        old: state.photo,
        updated: photo
      };
      await api.post("photos", combo);
      dispatch("getSavedPhotos");
    },
    async getSavedPhotos({ commit, dispatch }) {
      let res = await api.get("photos/all");
      commit("setSavedPhotos", res.data);
    },

    // Quote methods
    async getQuote({ commit, dispatch }) {
      let res = await api.get("quotes");
      commit("setQuote", res.data);
    },
    async saveQuote({ commit, dispatch }) {
      let res = await api.post("quotes");
      dispatch("getSavedQuotes");
    },
    async getSavedQuotes({ commit, dispatch }) {
      let res = await api.get("quotes/all");
      commit("setSavedQuotes", res.data);
    }
  },
  modules: {}
});
