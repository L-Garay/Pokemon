import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Quote = new Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Quote;
