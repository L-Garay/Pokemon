import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import fetch from "node-fetch";
import axios from "axios";

// @ts-ignore
global.fetch = fetch;
class QuoteService {
  // async getQuote() {
  //   try {
  //     let data = await fetch("https://type.fit/api/quotes");
  //     let formated = await data.json();
  //     return formated;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async getQuote() {
    // let data = await axios({
    //   method: "GET",
    //   url: "https://150000-quotes.p.rapidapi.com/keyword/Life",
    //   headers: {
    //     "content-type": "application/octet-stream",
    //     "x-rapidapi-host": "150000-quotes.p.rapidapi.com",
    //     "x-rapidapi-key": "8226d777c0mshfb5b9fdd88ded49p1ff2f6jsn3512d714e680"
    //   }
    // });
    let data = await axios({
      method: "POST",
      url: "https://andruxnet-random-famous-quotes.p.rapidapi.com/",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com",
        "x-rapidapi-key": "8226d777c0mshfb5b9fdd88ded49p1ff2f6jsn3512d714e680"
      },
      params: {
        count: "1",
        cat: "famous"
      },
      data: {}
    });
    return data;
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
