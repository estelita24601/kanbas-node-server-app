import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
    //find all courses
    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses.filter(c => c !== null));
    });

    //create new course
    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        console.log(`created new course ${JSON.stringify(course, null, 2)}`);
        const currentUser = req.session["currentUser"];
        console.log(`\tcurrent user = ${currentUser}`);
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
            console.log(`\tenrolled user ${currentUser._id} into new course`);
        }
        res.json(course);
    });

    const findCoursesForEnrolledUser = async (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = await dao.findCoursesForEnrolledUser(userId);
        res.json(courses.filter(c => c !== null));
    };
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users.filter(u => u !== null));
    };
    app.get("/api/courses/:cid/users", findUsersForCourse);

    //delete course
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const result = await dao.deleteCourse(courseId);
        if (result.acknowledged) {
            const n = result.deletedCount;
            if (n > 0) {
                res.status(200).send(`deleted ${n} courses`)
            } else {
                res.status(404).send("unable to find courses to delete");
            }
        } else {
            res.status(500).send("unable to acknowledge request to delete course");
        }
    });

    //update course
    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    //find modules for course
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        console.log(`COURSES API - looking for modules from course ${JSON.stringify(courseId)}`)
        const modules = await modulesDao.findModulesForCourse(courseId);
        console.log(`\t${JSON.stringify(modules, null, 2)}`);
        res.json(modules.filter(m => m !== null));
    });

    //new module
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });
}