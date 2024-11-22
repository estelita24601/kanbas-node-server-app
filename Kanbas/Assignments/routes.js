import assignments from "../Database/assignments.js";
import * as dao from "./dao.js";
const API = "api/assignments"

export default function AssignmentRoutes(app) {
    app.get(`${API}/:courseId`, (request, response) => {
        const { courseId } = request.params;
        const assignments = dao.getAssignments(courseId);
        response.json(assignments);
    });

    app.post(`${API}`, (request, response) => {
        const { assignment } = request.body;
        const newAssignment = dao.createAssignment(assignment);
        response.json(newAssignment);
    });

    app.put(`${API}/:assignmentId`, (request, response) => {
        const { assignmentId } = request.params;
        const { assignment } = request.body;
        const updatedAssignment = dao.updateAssignment(assignmentId, assignment);
        response.json(updatedAssignment);
    });

    app.delete(`${API}/:assignmentId`, (request, response) => {
        const { assignmentId } = request.params;
        const numDeleted = dao.deleteAssignment(assignmentId);

        if (numDeleted > 0) {
            response.status(200);
        } else {
            response.status(400);
        }
    });
}