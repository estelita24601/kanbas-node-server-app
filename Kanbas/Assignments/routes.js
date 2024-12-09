import * as dao from "./dao.js";
const API = "/api/assignments"

export default function AssignmentRoutes(app) {
    //get assignments for a given course
    app.get(`${API}/:courseId`, async (request, response) => {
        const { courseId } = request.params;
        console.log(`ASSIGNMENTS API - get request, courseId = ${courseId}`);
        const assignments = await dao.getAssignments(courseId);
        response.json(assignments);
    });

    //get one assignment by id
    app.get(`${API}/:courseId/:assignmentId`, async (request, response) => {
        const { assignmentId } = request.params;
        const assignment = await dao.getAssignment(assignmentId);
        response.json(assignment);
    })

    //create assignment
    app.post(`${API}`, async (request, response) => {
        console.log(`ASSIGNMENTS API - post request`)
        const assignment = request.body;
        const newAssignment = await dao.createAssignment(assignment);
        response.json(newAssignment);
    });

    //update assignment
    app.put(`${API}/:assignmentId`, async (request, response) => {
        const { assignmentId } = request.params;
        const assignment = request.body;
        console.log(`ASSIGNMENTS API -\n\tput request, assignmentId = ${assignmentId}\n\t${JSON.stringify(assignment, null, 2)}`);

        const result = await dao.updateAssignment(assignmentId, assignment);
        if (result.acknowledged) {
            response.status(200).send(`updated ${result.modifiedCount} assignments`);
        } else {
            response.sendStatus(500);
        }
        return;
    });

    //delete assignment
    app.delete(`${API}/:assignmentId`, async (request, response) => {
        const { assignmentId } = request.params;
        console.log(`ASSIGNMENTS API - delete request, assignmentId = ${JSON.stringify(assignmentId)}`);

        const result = await dao.deleteAssignment(assignmentId);
        if (result.acknowledged) {
            response.status(200).send(`deleted ${result.deletedCount} assignments`);
        } else {
            response.sendStatus(500);
        }
        return;
    });
}