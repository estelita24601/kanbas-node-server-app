import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

// create instance of express
const app = express();

//set policy for http requests
app.use(
    cors({
        credentials: true, //cookies
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

//default session options for local sessions
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "lax",
        secure: false,
    },
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(
    session(sessionOptions)
);

//let us receive data from client inside of the request body
app.use(express.json());

UserRoutes(app); //4.2 - 4.3 User Sessions
CourseRoutes(app); //4.4 Courses API
ModuleRoutes(app); //4.5 Modules API
AssignmentRoutes(app); //4.6 Assignments API
Lab5(app);
Hello(app);

//if there is a remote port variables use that, otherwise default to port 4000
app.listen(process.env.PORT || 4000);
