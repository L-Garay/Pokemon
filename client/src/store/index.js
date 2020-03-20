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
    savedPhotos: []
  },
  mutations: {
    setUser(state, user) {
      state.userPreferences = user;
    },
    setPhoto(state, photo) {
      state.photo = photo;
      console.log("state.photo", state.photo);
    },
    setSavedPhotos(state, photos) {
      state.savedPhotos = photos;
      console.log(state.savedPhotos);
    }
  },
  actions: {
    async setUser({ commit, dispatch }, user) {
      await api.post("users", user);
      dispatch("getUser");
    },
    async getUser({ commit, dispatch }) {
      let res = await api.get("users");
      commit("setUser", res.data);
      return res.data;
    },
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
    }
  },
  modules: {}
});
