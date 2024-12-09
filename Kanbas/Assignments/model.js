import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("AssignmentsModel", schema);
export default model;