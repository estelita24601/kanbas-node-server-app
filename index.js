// import express
import express from 'express';
import Hello from './Hello.js';
import Lab5 from "../kanbas-react-app/src/Labs/Lab5/index.js";

// create instance of express
const app = express();
app.use(express.json()) //QUESTION: what does this do?

Lab5(app);
Hello(app);

//if there is a remote port variables use that, otherwise default to port 4000
app.listen(process.env.PORT || 4000);