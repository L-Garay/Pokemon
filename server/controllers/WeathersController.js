import express from "express";
import BaseController from "../utils/BaseController";
import { weatherService } from "../services/WeatherService";

export class WeathersController extends BaseController {
  constructor() {
    super("api/weather");
    this.router.get("", this.get);
  }

  async get(req, res, next) {
    try {
      let data = await weatherService.get(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}
