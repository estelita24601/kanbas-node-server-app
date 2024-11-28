import mongoose from "mongoose";
import schema from "./schema.js";

//use schema from file to create the model
const model = mongoose.model("UserModel", schema);
export default model;