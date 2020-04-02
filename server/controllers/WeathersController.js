import express from "express";
import BaseController from "../utils/BaseController";
import { weatherService } from "../services/WeatherService";

export class WeathersController extends BaseController {
  constructor() {
    super("api/weather");
    this.router.post("", this.getWeather).post("/change", this.getNewWeather);
  }

  async getWeather(req, res, next) {
    try {
      let data = await weatherService.getWeather(req.body);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getNewWeather(req, res, next) {
    try {
      let data = await weatherService.getNewWeather(req.body);
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
}
