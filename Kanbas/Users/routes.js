import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => { };
    app.post("/api/users", createUser);

    const deleteUser = async (req, res) => { };
    app.delete("/api/users/:userId", deleteUser);

    //fixme
    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;

        if (role && name) {
            console.log("User Routes - trying to filter by role and name");
            const usersByRole = await dao.findUsersByRole(role);

            const usersByName = await dao.findUserByPartialName(role);
            const usersByNameJson = JSON.stringify(usersByName);

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
            console.log("User Routes - trying to filter by role");
            //if they queried by role filter the users we send back
            const filteredUsers = await dao.findUsersByRole(role);
            res.json(filteredUsers);
        } else if (name) {
            console.log("User Routes - trying to filter by name");
            const filteredUsers = await dao.findUserByPartialName(name);
            res.json(filteredUsers);
        } else {
            console.log("User Routes - returning all users");
            //otherwise return all the users
            const allUsers = findAllUsers();
            res.json(allUsers);
        }
    };
    app.get("/api/users", findAllUsers);

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    app.get("/api/users/:userId", findUserById);

    const updateUser = async (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;
        await dao.updateUser(userId, userUpdates);
        const currentUser = await dao.findUserById(userId);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    app.put("/api/users/:userId", updateUser);

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
        //TODO: add await keyword once we've connected the course dao and enrollments dao to mongodb
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);
}