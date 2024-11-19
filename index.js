// import express
import express from "express";
import cors from "cors";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

// create instance of express
const app = express();
app.use(cors()); //set policy for http requests
app.use(express.json()); //we can receive data from client inside of the request body instead of params

Lab5(app);
Hello(app);

//if there is a remote port variables use that, otherwise default to port 4000
app.listen(process.env.PORT || 4000);
