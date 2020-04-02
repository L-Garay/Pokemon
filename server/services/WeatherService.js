import { dbContext } from "../db/DbContext";
import { BadRequest, NotFound } from "../utils/Errors";
// @ts-ignore
import axios from "axios";

class WeatherService {
  async getWeather(coord) {
    let data = await axios({
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "8226d777c0mshfb5b9fdd88ded49p1ff2f6jsn3512d714e680"
      },
      params: {
        units: "imperial",
        lat: coord.lat,
        lon: coord.lon
      }
    });
    return data;
  }
  async getNewWeather(city) {
    let data = await axios({
      method: "GET",
      url: "https://community-open-weather-map.p.rapidapi.com/weather",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "8226d777c0mshfb5b9fdd88ded49p1ff2f6jsn3512d714e680"
      },
      params: {
        units: "imperial",
        q: city
      }
    });
    if (!data) {
      throw new NotFound("UNABLE TO FIND THAT CITY");
    } else {
      return data;
    }
  }
}

export const weatherService = new WeatherService();
