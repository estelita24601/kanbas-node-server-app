//TODO: add enums?
import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
    {
        title: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        points: Number,
        available_date: String,
        due_by_date: String,
        until_date: String,
        available_time: String,
        due_by_time: String,
        until_time: String,
        description: String,
        group: String,
        grade_display: String,
        submission_type: String,
        entry_options: [String]
    },
    {collection: "assignments"}

);
export default assignmentSchema;