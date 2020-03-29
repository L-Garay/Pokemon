import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
// @ts-ignore
import axios from "axios";

class WeatherService {
  async get(coord) {
    let data = axios({
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "8226d777c0mshfb5b9fdd88ded49p1ff2f6jsn3512d714e680"
      },
      params: {
        units: "metric",
        lat: `"${coord.lat}"`,
        lon: `"${coord.lon}"`
      }
    });
    return data;
  }
}

export const weatherService = new WeatherService();
