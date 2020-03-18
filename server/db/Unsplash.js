import ValueSchema from "../models/Value";
import mongoose from "mongoose";
import fetch from "node-fetch";
import Unsplash, { toJson } from "unsplash-js";

// let unsplashApi = "https://api.unsplash.com/photos/random";
// fetch(unsplashApi)
//   .then(res => res.json())
//   .then(json => console.log(json));

const unsplash = new Unsplash({
  accessKey: "pj9BRCDoTANbkzXyxQiWM_LQIgCgDcsABMxub0QwnoI"
});

class UnsplashMethods {
  getPhoto() {
    unsplash.photos
      .getRandomPhoto({ query: "nature" })
      .then(toJson)
      .then(json => console.log(json));
  }
}

export const unsplashMethods = new UnsplashMethods();
