import express from "express";
import BaseController from "../utils/BaseController";
import { userService } from "../services/UserService";

export class UsersController extends BaseController {
  constructor() {
    super("api/users");
    this.router.post("", this.create).get("", this.get);
  }

  async create(req, res, next) {
    try {
      let data = await userService.create(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async get(req, res, next) {
    try {
      let data = await userService.get();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
}
