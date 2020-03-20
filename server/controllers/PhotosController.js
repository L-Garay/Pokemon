import express from "express";
import BaseController from "../utils/BaseController";
import { photoService } from "../services/PhotoService";

export class PhotosController extends BaseController {
  constructor() {
    super("api/photos");
    this.router
      .get("", this.getPhoto)
      .get("/all", this.getAllPhotos)
      .post("", this.savePhoto);
  }

  async getPhoto(req, res, next) {
    try {
      let data = await photoService.getPhoto();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAllPhotos(req, res, next) {
    try {
      let data = await photoService.getAllPhotos();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async savePhoto(req, res, next) {
    try {
      let data = await photoService.savePhoto(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}
