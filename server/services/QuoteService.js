import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import axios from "axios";

class QuoteService {
  async getQuote() {
    let data = await axios({
      method: "GET",
      url: "https://quotable-quotes.p.rapidapi.com/randomQuotes",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotable-quotes.p.rapidapi.com",
        "x-rapidapi-key": "8226d777c0mshfb5b9fdd88ded49p1ff2f6jsn3512d714e680"
      }
    });
    // let data = await axios({
    //   method: "POST",
    //   url: "https://andruxnet-random-famous-quotes.p.rapidapi.com/",
    //   headers: {
    //     "content-type": "application/x-www-form-urlencoded",
    //     "x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com",
    //     "x-rapidapi-key": "8226d777c0mshfb5b9fdd88ded49p1ff2f6jsn3512d714e680"
    //   },
    //   params: {
    //     count: "1",
    //     cat: "famous"
    //   },
    //   data: {}
    // });
    return data;
  }
  async saveQuote(quote) {
    return await dbContext.Quote.create(quote);
  }
  async getSaved() {
    return await dbContext.Quote.find(q => (q = {}));
  }
}

export const quoteService = new QuoteService();
