const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
var fs = require('fs');

const cors = require("cors");

app.use(cors());
app.use(express.json());

fs.readdirSync('./routes').map( (route) => app.use(require(`./routes/${route}`)) );

// get driver connection
const database = require("./db/database");

app.listen(port, async() => {

  // perform a database connection when server starts
  await database.connectToServer(function (err) {
    if (err) console.error(err);
  });
   
  console.log(`Server is running on port: ${port}`);
  
});