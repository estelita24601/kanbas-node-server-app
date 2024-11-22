import Database from "../Database/index.js";

//get assignments for this course
export function getAssignments(courseID) {
    return Database.assignments.filter((assignment) => assignment.course === courseID)
}

//create new assignment for this course
export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

//update an assignment
export function updateAssignment(assignmentID, assignmentUpdates) {
    const oldAssignment = Database.assignments.find((assignment) => assignment._id === assignmentID);
    Object.assign(oldAssignment, assignmentUpdates);
    return oldAssignment;
}

//delete assignment from this course
export function deleteAssignment(assignmentID) {
    const { assignments } = Database.assignments;
    const initialSize = assignments.length;

    Database.assignments = assignments.filter(
        (assignment) => assignment._id !== assignmentID
    )

    //return how many assignments we deleted
    return initialSize - Database.assignments.length;
}