import ValueSchema from "../models/Value";
import mongoose from "mongoose";
import fetch from "node-fetch";
import Unsplash, { toJson } from "unsplash-js";
global.fetch = fetch;

let unsplashKey = process.env.API_KEY;

let unsplashApi =
  "https://api.unsplash.com/photos/random?query=nature&client_id=" +
  unsplashKey;

// NOTE Only needed if first getPhoto() method is used
// const unsplash = new Unsplash({
//   accessKey: unsplashKey
// });

class UnsplashMethods {
  // NOTE A different method, instead of .then() change to await
  // async getPhoto() {
  //   let data = await unsplash.photos
  //     .getRandomPhoto({ query: "nature" })
  //     .then(res => res.json());
  //   return data;
  // }
  async getPhoto() {
    try {
      let data = await fetch(unsplashApi);
      let formatted = await data.json();
      return formatted;
    } catch (error) {
      console.log(error);
    }
  }
}

export const unsplashMethods = new UnsplashMethods();
