import ValueSchema from "../models/Value";
import mongoose from "mongoose";
import fetch from "node-fetch";
import Unsplash, { toJson } from "unsplash-js";

let unsplashKey = process.env.API_KEY;

let unsplashApi =
  "https://api.unsplash.com/photos/random?query=nature&client_id=" +
  unsplashKey;

const unsplash = new Unsplash({
  accessKey: unsplashKey
});
global.fetch = fetch;

// (function() {
//   if (typeof globalThis === "object") return;
//   Object.defineProperty(Object.prototype, "__magic__", {
//     get: function() {
//       return this;
//     },
//     configurable: true
//   });
//   __magic__.globalThis = __magic__;
//   delete Object.prototype.__magic__;
// })();
// console.log(globalThis);
class UnsplashMethods {
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
