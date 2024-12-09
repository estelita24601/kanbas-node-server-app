import model from "./model.js";

//get assignments for this course
export function getAssignments(courseID) {
    return model.find({ course: courseID });
}

//get one specific assignment
export function getAssignment(assignmentID) {
    return model.findOne({ _id: assignmentID });
}

//create new assignment for this course
export function createAssignment(assignment) {
    const newAssignment = {
        title: "",
        available_date: new Date.now().toString(),
        available_time: "",
        due_by_date: "",
        due_by_time: "",
        until_date: "",
        until_time: "",
        description: "",
        points: 100,
        group: "ASSIGNMENTS",
        grade_display: "",
        submission_type: "",
        entry_options: [],
        assigned_to: "Everyone",
        ...assignment
    };
    return model.create(newAssignment);;
}

//update an assignment
export async function updateAssignment(assignmentID, assignmentUpdates) {
    const originalAssignment = await model.findOne({ _id: assignmentID });
    const newAssignment = { ...originalAssignment.toObject(), ...assignmentUpdates };
    return model.updateOne({ _id: assignmentID }, { $set: newAssignment });
}

//delete assignment from this course
export function deleteAssignment(assignmentID) {
    return model.deleteOne({ _id: assignmentID });
}