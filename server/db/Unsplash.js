import mongoose from "mongoose";
import fetch from "node-fetch";
import Unsplash, { toJson } from "unsplash-js";
// @ts-ignore
global.fetch = fetch;

let unsplashKey = process.env.API_KEY;

// let unsplashApi =
//   "https://api.unsplash.com/photos/random?query=nature&client_id=" +
//   unsplashKey;

// NOTE Only needed if first getPhoto() method is used
const unsplash = new Unsplash({
  accessKey: unsplashKey
});

class UnsplashMethods {
  // NOTE A different method
  async getPhoto() {
    try {
      let data = await unsplash.photos.getRandomPhoto({ query: "nature" });
      let formatted = await data.json();
      return formatted;
    } catch (error) {
      console.log(error);
    }
  }
  // async getPhoto() {
  //   try {
  //     let data = await fetch(unsplashApi);
  //     let formatted = await data.json();
  //     return formatted;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  async savePhoto(body) {
    unsplash.photos.downloadPhoto(body);
  }
}

export const unsplashMethods = new UnsplashMethods();
