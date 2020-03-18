import express from "express";
import BaseController from "../utils/BaseController";
import { userService } from "../services/UserService";

export class UsersController extends BaseController {
  constructor() {
    super("api/users");
    this.router.get("", this.getAll).post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      let data = await userService.getAll();
      return res.send(data.data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
