import express from "express";
import BaseController from "../utils/BaseController";
import { valuesService } from "../services/ValueService";

export class ValuesController extends BaseController {
  constructor() {
    super("api/values");
    this.router
      .get("", this.getAll)
      .get("/photo", this.getPhoto)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      let data = await valuesService.getAll();
      return res.send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async getPhoto(req, res, next) {
    valuesService.getPhoto();
  }
  async create(req, res, next) {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
