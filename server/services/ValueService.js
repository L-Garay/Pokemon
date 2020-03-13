import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
// @ts-ignore
import axios from "axios";

let pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/"
});

class ValuesService {
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
  async getAll() {
    return await pokeAPI.get("pokemon?limit=20");
  }
}

export const valuesService = new ValuesService();
