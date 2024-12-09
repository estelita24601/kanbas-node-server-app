import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    app.post("/api/users", createUser);

    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;

        if (role && name) {
            //if they queried by both filter by role and name
            const usersByRole = await dao.findUsersByRole(role);

            const usersByName = await dao.findUserByPartialName(role);
            const usersByNameJson = usersByName.map(u => JSON.stringify(u));

            const filteredUsers = usersByRole.filter(u => {
                if (usersByNameJson.includes(JSON.stringify(u))) {
                    return true;
                } else {
                    return false;
                }
            });
            res.json(filteredUsers);
        }
        else if (role) {
            //if they queried by role only return users with the correct role
            const filteredUsers = await dao.findUsersByRole(role);
            res.json(filteredUsers);
        } else if (name) {
            //if they queried by name only return users that match
            const filteredUsers = await dao.findUserByPartialName(name);
            res.json(filteredUsers);
        } else {
            //otherwise return all the users
            const allUsers = await dao.findAllUsers();
            res.json(allUsers);
        }
    };
    app.get("/api/users", findAllUsers);

    const signup = async (request, response) => {
        const user = await dao.findUserByUsername(request.body.username);
        if (user) {
            response.status(400).json(
                { message: "Username already in use" });
            return;
        }
        const currentUser = await dao.createUser(request.body);
        request.session["currentUser"] = currentUser;
        response.json(currentUser);
    };
    app.post("/api/users/signup", signup);

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);

        if (currentUser) {
            req.session["currentUser"] = currentUser;
            console.log(`logging in as user ${JSON.stringify(currentUser, null, 2)}`);
            res.status(200);
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login. Try again later." });
        }

    };
    app.post("/api/users/signin", signin);

    const signout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/users/signout", signout);

    const getProfile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            //send error status if current user doesn't exist
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };
    app.post("/api/users/profile", getProfile);

    const createCourse = async (req, res) => {
        const currentUser = req.session["currentUser"];

        const newCourse = await courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);

        res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    app.delete("/api/users/:userId", deleteUser);

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    app.get("/api/users/:userId", findUserById);

    const updateUser = async (req, res) => {
        //update the user we were given
        const userId = req.params.userId;
        const userUpdates = req.body;
        await dao.updateUser(userId, userUpdates);

        //see if user currently logged in is the same as user we just updated
        const currentUser = req.session["currentUser"];
        if (currentUser && currentUser._id === userId) {
            //update the current user in the session as well as the db
            req.session["currentUser"] = { ...currentUser, ...userUpdates };
        }

        res.json(currentUser);
    };
    app.put("/api/users/:userId", updateUser);

    const findCoursesForUser = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        if (currentUser.role === "ADMIN") {
            const courses = await courseDao.findAllCourses();
            res.json(courses);
            return;
        }
        let { uid } = req.params;
        if (uid === "current") {
            uid = currentUser._id;
        }
        const courses = await enrollmentsDao.findCoursesForUser(uid);
        res.json(courses.filter(c => c !== null));
    };
    app.get("/api/users/:uid/courses", findCoursesForUser);

    const enrollUserInCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
        res.send(status);
    };
    app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);

    const unenrollUserFromCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
        res.send(status);
    };
    app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}