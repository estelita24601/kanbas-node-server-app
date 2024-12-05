import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema(
 {
   course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
   user:   { type: mongoose.Schema.Types.ObjectId, ref: "UserModel"   },
   grade: Number,
   letterGrade: String,
   enrollmentDate: Date,
   status: {
     type: String,
     enum: ["ENROLLED", "DROPPED", "COMPLETED"],
     default: "ENROLLED",
   },
 },
 { collection: "enrollments" }
);
export default enrollmentSchema;