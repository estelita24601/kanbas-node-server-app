import Database from "../Database/index.js";

//get assignments for this course
export function getAssignments(courseID) {
    return Database.assignments.filter((assignment) => assignment.course === courseID);
}

//get one specific assignment
export function getAssignment(assignmentID) {
    return Database.assignments.find((assignment) => assignment._id === assignmentID);
}

//create new assignment for this course
export function createAssignment(assignment) {
    const newAssignment = {
        _id: Date.now().toString(),
        title: "",
        available_date: "",
        available_time: "",
        due_by_date: "",
        due_by_time: "",
        until_date: "",
        until_time: "",
        description: "",
        points: "",
        group: "ASSIGNMENTS",
        grade_display: "",
        submission_type: "",
        entry_options: [],
        assigned_to: "Everyone",
        ...assignment
    };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

//update an assignment
export function updateAssignment(assignmentID, assignmentUpdates) {
    const oldAssignment = Database.assignments.find((assignment) => assignment._id === assignmentID);

    Object.assign(oldAssignment, assignmentUpdates);

    console.log(`\tAFTER EDITS:\n${JSON.stringify(oldAssignment, null, 4)}`)
    return oldAssignment;
}

//delete assignment from this course
export function deleteAssignment(assignmentID) {
    const { assignments } = Database;

    const assignmentIndex = assignments.findIndex((assignment) => assignment._id === assignmentID);

    //if we were able to find the assignment inside of the db then delete it
    if (assignmentIndex !== -1) {
        assignments.splice(assignmentIndex, 1);
    }

    return assignmentIndex;
}