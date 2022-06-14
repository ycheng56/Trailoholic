const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const trailRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/connect");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


const collectionName = "testcollections";
 
 
// This section will help you get a list of all the records.
trailRoutes.route("/trails").get(function (req, res) {
 let db_connect = dbo.getDb("TrailoholicDatabse");
 db_connect
   .collection(collectionName)
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
trailRoutes.route("/trails/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection(collectionName)
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you create a new record.
trailRoutes.route("/trails/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   start: req.body.start,
   destination: req.body.destination,
   mode: req.body.mode
 };
 db_connect.collection(collectionName).insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
trailRoutes.route("/trails/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )}; 
 let newvalues = {   
   $set: {     
    start: req.body.start,
    destination: req.body.destination,
    mode: req.body.mode
   }, 
  }
  db_connect.collection(collectionName).updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
 
// This section will help you delete a record
trailRoutes.route("/trails/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection(collectionName).deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = trailRoutes;