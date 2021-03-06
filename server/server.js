const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/build')));



app.use("/api", require("./routes/trails"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/reviews"));


// get driver connection
const dbo = require("./db/connect");


app.get('*', (req, res) => res.sendFile(path.resolve('public/build', 'index.html')));

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});