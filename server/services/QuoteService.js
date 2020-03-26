import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import fetch from "node-fetch";

// @ts-ignore
global.fetch = fetch;
class QuoteService {
  async getQuote() {
    try {
      let data = await fetch("https://type.fit/api/quotes");
      let formated = await data.json();
      return formated;
    } catch (error) {
      console.log(error);
    }
  }
}

export const quoteService = new QuoteService();
// async getPhoto() {
//   try {
//     let data = await fetch(unsplashApi);
//     let formatted = await data.json();
//     return formatted;
//   } catch (error) {
//     console.log(error);
//   }
// },
