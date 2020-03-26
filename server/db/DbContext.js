import PhotoSchema from "../models/Photo";
import UserSchema from "../models/User";
import QuoteSchema from "../models/Quote";
import mongoose from "mongoose";

class DbContext {
  Photo = mongoose.model("Photos", PhotoSchema);
  User = mongoose.model("User", UserSchema);
  Quote = mongoose.model("Quote", QuoteSchema);
}

export const dbContext = new DbContext();
