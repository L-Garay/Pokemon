import ValueSchema from "../models/Value";
import fetch from "node-fetch";
import mongoose from "mongoose";
global.fetch = fetch;
class Unsplash {}

export const unsplash = new Unsplash();
