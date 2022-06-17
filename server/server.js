const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/public/build')));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/trails"));
app.use("/api", require("./routes/users"));
// get driver connection
const dbo = require("./db/connect");


app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});