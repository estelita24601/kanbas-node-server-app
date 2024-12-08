import * as dao from "./dao.js";
const API = "/api/assignments"

export default function AssignmentRoutes(app) {
    //TODO: add async and await for all of these
    //get assignments
    app.get(`${API}/:courseId`, (request, response) => {
        const { courseId } = request.params;
        const assignments = dao.getAssignments(courseId);
        console.log(`ASSIGNMENTS API - get request, courseId = ${JSON.stringify(courseId)}`);
        response.json(assignments);
    });

    //get one assignment
    app.get(`${API}/:courseId/:assignmentId`, (request, response) => {
        const { assignmentId } = request.params;
        const assignment = dao.getAssignment(assignmentId);
        response.json(assignment);
    })

    //create assignment
    app.post(`${API}`, (request, response) => {
        const assignment = request.body;
        const newAssignment = dao.createAssignment(assignment);
        console.log(`ASSIGNMENTS API - post request`)
        response.json(newAssignment);
    });

    //update assignment
    app.put(`${API}/:assignmentId`, (request, response) => {
        const { assignmentId } = request.params;
        const assignment = request.body;
        console.log(`ASSIGNMENTS API -\n\tput request, assignmentId = ${JSON.stringify(assignmentId)}\n\t${JSON.stringify(assignment, null, 2)}`);
        const updatedAssignment = dao.updateAssignment(assignmentId, assignment);
        response.json(updatedAssignment);
    });

    //delete assignment
    app.delete(`${API}/:assignmentId`, (request, response) => {
        const { assignmentId } = request.params;
        console.log(`ASSIGNMENTS API - delete request, assignmentId = ${JSON.stringify(assignmentId)}`);

        const deleteIndex = dao.deleteAssignment(assignmentId);

        if (deleteIndex === -1) {
            response.status(404).json({ message: `Unable to delete assignment with ID ${JSON.stringify(assignmentId)}` });
        } else {
            response.sendStatus(200);
        }
    });
}