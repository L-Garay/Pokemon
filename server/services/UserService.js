import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
// @ts-ignore
import axios from "axios";

class UserService {
  async create(body) {
    return await dbContext.User.create(body);
  }
  async get() {
    return await dbContext.User.find({});
  }
  async find(query = {}) {
    let values = await dbContext.Values.find(query);
    return values;
  }
  async findById(id) {
    let value = await dbContext.Values.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
}

export const userService = new UserService();
