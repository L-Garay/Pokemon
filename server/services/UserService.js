import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
// @ts-ignore
import axios from "axios";

class UserService {
  async create(body) {
    let data = await dbContext.User.findOneAndUpdate(u => (u = {}), body);
    if (!data) {
      return await dbContext.User.create(body);
    }
    return data;
  }
  async get() {
    return await dbContext.User.findOne(u => (u = {}));
  }
  // async find(query = {}) {
  //   let values = await dbContext.Values.find(query);
  //   return values;
  // }
  // async findById(id) {
  //   let value = await dbContext.Values.findById(id);
  //   if (!value) {
  //     throw new BadRequest("Invalid Id");
  //   }
  //   return value;
  // }
}

export const userService = new UserService();
