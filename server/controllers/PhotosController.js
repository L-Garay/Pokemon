import express from "express";
import BaseController from "../utils/BaseController";
import { photoService } from "../services/PhotoService";

export class PhotosController extends BaseController {
  constructor() {
    super("api/photos");
    this.router.get("", this.getPhoto);
  }

  async getPhoto(req, res, next) {
    try {
      let data = await photoService.getPhoto();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
