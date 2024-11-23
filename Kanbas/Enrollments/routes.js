import * as dao from "./dao.js";
const API = "/api/enrollments"

export default function EnrollmentsRoutes(app) {

    app.post(`${API}/enroll/:userId/:courseId`, (req, res) => {
        const { courseId, userId } = req.params;
        console.log(`ENROLLMENTS API - post request, courseId = ${courseId} and userId = ${userId}`);

        dao.enrollUserInCourse(userId, courseId);
        res.status(200);
    });

    app.delete(`${API}/un-enroll/:userId/:courseId`, (req, res) => {
        const { courseId, userId } = req.params;
        console.log(`ENROLLMENTS API - delete request, courseId = ${courseId} and userId = ${userId}`);

        const deletedIndex = dao.unenrollUserFromCourse(userId, courseId);

        if (deletedIndex === -1) {
            res.status(404).json({ message: `unable to remove user ${userId} from course ${courseId}` });
        } else {
            res.sendStatus(200);
        }
    });

    app.get(`${API}/:userId`, (req, res) => {
        const { userId } = req.params;
        console.log(`ENROLLMENTS API - getRequest, userId = ${userId}`);

        const userEnrollments = dao.getUserEnrollments(userId);
        res.json(userEnrollments);
    })
}