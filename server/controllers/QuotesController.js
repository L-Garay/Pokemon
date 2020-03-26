import express from "express";
import BaseController from "../utils/BaseController";
import { quoteService } from "../services/QuoteService";

export class QuotesController extends BaseController {
  constructor() {
    super("api/quotes");
    this.router
      .get("", this.getQuote)
      .get("/all", this.getSaved)
      .post("", this.saveQuote);
  }

  async getQuote(req, res, next) {
    try {
      let data = await quoteService.getQuote();
      return res.status(200).send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async saveQuote(req, res, next) {
    try {
      let data = await quoteService.saveQuote(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getSaved(req, res, next) {
    try {
      let data = await quoteService.getSaved();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}
