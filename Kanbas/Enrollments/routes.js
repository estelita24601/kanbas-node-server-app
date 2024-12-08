import * as dao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    //get enrollments
    app.get("/api/enrollments/:userId", async (req, res) => {
        const { userId } = req.params;
        console.log(`ENROLLMENTS API - getRequest, userId = ${JSON.stringify(userId)}`);

        const userEnrollments = await dao.getUserEnrollments(userId);
        console.log(`\t${JSON.stringify(userEnrollments, null, 2)}`);
        res.json(userEnrollments);
    })

    //add enrollment
    app.post("/api/enrollments/enroll/:userId/:courseId", async (req, res) => {
        const { courseId, userId } = req.params;
        console.log(`ENROLLMENTS API - post request, courseId = ${JSON.stringify(courseId)} and userId = ${JSON.stringify(userId)}`);

        const newEnrollment = await dao.enrollUserInCourse(userId, courseId);
        res.json(newEnrollment);
    });

    //delete enrollment
    app.delete("/api/enrollments/un-enroll/:userId/:courseId", async (req, res) => {
        const { courseId, userId } = req.params;
        console.log(`ENROLLMENTS API - delete request, courseId = ${JSON.stringify(courseId)} and userId = ${JSON.stringify(userId)}`);

        const result = await dao.removeEnrollment(userId, courseId);

        if(result.acknowledged){
            const numDeleted = result.deletedCount;
            if(numDeleted > 0){
                res.sendStatus(200).send(`deleted ${numDeleted} enrollments`);
            }else{
                res.sendStatus(404).send("unable to find enrollment to delete")
            }
        }else{
            res.sendStatus(500).send("delete enrollment request not acknowledged");
        }
    });

}