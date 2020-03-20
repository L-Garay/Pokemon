import PhotoSchema from "../models/Photo";
import UserSchema from "../models/User";
import mongoose from "mongoose";

class DbContext {
  Photo = mongoose.model("Photos", PhotoSchema);
  User = mongoose.model("User", UserSchema);
}

export const dbContext = new DbContext();
