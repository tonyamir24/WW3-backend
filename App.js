const express = require("express");
const mongoose = require('mongoose');
//Check db connection links in README file
console.log(process.env.MONGOURI)
// const MongoURI = process.env.MongoURI ;
const MongoURI = "mongodb+srv://tonton:tonton@cluster0.u0ywstm.mongodb.net/WW3" ;


//App variables
const app = express();
const port = process.env.PORT || "8000";
//const user = require('./Models/User');


// #Importing the userController

 const teamRoutes = require('./Routes/teamRoutes')
 const countryRoutes = require('./Routes/countryRoutes')
//const Route = require('./Routes/userController')

// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });


// #Routing to userController here


app.use(teamRoutes)
app.use(countryRoutes)
