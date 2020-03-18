import ValueSchema from "../models/Value";
import UserSchema from "../models/User";
import mongoose from "mongoose";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  User = mongoose.model("User", UserSchema);
}

export const dbContext = new DbContext();
