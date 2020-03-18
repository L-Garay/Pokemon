import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, required: true },
    militaryTimeSelected: { type: Boolean, required: true },
    setName: { type: Boolean, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default User;
