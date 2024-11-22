import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    const createUser = (req, res) => { };
    app.post("/api/users", createUser);

    const deleteUser = (req, res) => { };
    app.delete("/api/users/:userId", deleteUser);

    const findAllUsers = (req, res) => { };
    app.get("/api/users", findAllUsers);

    const findUserById = (req, res) => { };
    app.get("/api/users/:userId", findUserById);

    //4.2.3 and 4.3.1
    const updateUser = (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        const currentUser = dao.findUserById(userId);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    app.put("/api/users/:userId", updateUser);

    //4.2.2
    const signup = (request, response) => {
        const user = dao.findUserByUsername(request.body.username);
        if (user) {
            response.status(400).json(
                { message: "Username already in use" });
            return;
        }
        const currentUser = dao.createUser(request.body);
        request.session["currentUser"] = currentUser;
        response.json(currentUser);
    };
    app.post("/api/users/signup", signup);

    //4.3.1
    const signin = (req, res) => {
        const { username, password } = req.body;
        const currentUser = dao.findUserByCredentials(username, password);

        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login. Try again later." });
        }

    };
    app.post("/api/users/signin", signin);

    //4.2.5  and 4.3.1
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/users/signout", signout);

    //4.2.4 and 4.3.1
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            //send error status if current user doesn't exist
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    app.post("/api/users/profile", profile);

    //4.4.2
    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);

}
