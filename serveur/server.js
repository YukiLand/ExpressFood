const express = require("express"); // import express
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
require("crypto").randomBytes(64).toString("hex");
let cors = require("cors");

const dotenv = require("dotenv");

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

const Users = require("./core/route/Users");
// const UserLocation = require('./core/route/UserLocation');
// const UserPicture = require('./core/route/UserPicture');

const app = express(); // initialize express

// Connexion BDD
const connectDB = require("./db/connexion");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

connectDB();

app.use("/user", Users); // main route and after the /users we add the route from the Users.js file
app.use("/meal");
// app.use('/location', UserLocation); // main route and after the /location we add the route from the UserLocation.js file
// app.use('/picture', UserPicture); // main route and after the /picture we add the route from the UserPicture.js file

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
