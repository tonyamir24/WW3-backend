const express = require("express");
const mongoose = require("mongoose");

// Load environment variables
require('dotenv').config();

const MongoURI = process.env.DB;

//App variables
const app = express();
const port = process.env.PORT || "8000";
//const user = require('./Models/User');

// #Importing the userController

const teamRoutes = require("./Routes/teamRoutes");
const countryRoutes = require("./Routes/countryRoutes");
const ChallengeRoutes = require("./Routes/challengeRoutes");
//const Route = require('./Routes/userController')

// configurations
// Mongo DB
mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// #Routing to userController here

app.use(teamRoutes);
app.use(countryRoutes);
app.use(ChallengeRoutes);
