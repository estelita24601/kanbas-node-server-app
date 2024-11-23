import assignments from "../Database/assignments.js";
import * as dao from "./dao.js";
const API = "/api/assignments"

export default function AssignmentRoutes(app) {
    app.get(`${API}/:courseId`, (request, response) => {
        const { courseId } = request.params;
        const assignments = dao.getAssignments(courseId);
        console.log(`ASSIGNMENTS API - get request, courseId = ${courseId}`);
        response.json(assignments);
    });

    app.get(`${API}/:courseId/:assignmentId`, (request, response) => {
        const { assignmentId } = request.params;
        const assignment = dao.getAssignment(assignmentId);
        response.json(assignment);
    })

    app.post(`${API}`, (request, response) => {
        const assignment = request.body;
        const newAssignment = dao.createAssignment(assignment);
        console.log(`ASSIGNMENTS API - post request`)
        response.json(newAssignment);
    });

    app.put(`${API}/:assignmentId`, (request, response) => {
        const { assignmentId } = request.params;
        const assignment = request.body;
        console.log(`ASSIGNMENTS API -\n\tput request, assignmentId = ${assignmentId}\n\t${JSON.stringify(assignment, null, 2)}`);
        const updatedAssignment = dao.updateAssignment(assignmentId, assignment);
        response.json(updatedAssignment);
    });

    app.delete(`${API}/:assignmentId`, (request, response) => {
        const { assignmentId } = request.params;
        console.log(`ASSIGNMENTS API - delete request, assignmentId = ${assignmentId}`);

        const deleteIndex = dao.deleteAssignment(assignmentId);

        if (deleteIndex === -1) {
            response.status(404).json({ message: `Unable to delete assignment with ID ${assignmentId}` });
            return;
        } else {
            response.sendStatus(200);
        }
    });
}