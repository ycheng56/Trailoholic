const express = require("express");
 const userRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/connect");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


const collectionName = "usercollections";
 
 
// list of all the users.
userRoutes.route("/users").get(function (req, res) {
 let db_connect = dbo.getDb("TrailoholicDatabse");
 db_connect
   .collection(collectionName)
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// get a single user by id
userRoutes.route("/users/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: req.params.id};
 db_connect
     .collection(collectionName)
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// create a new user
userRoutes.route("/users/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   _id: req.body._id,
   description: "",
   lists: [],
 };
 db_connect.collection(collectionName).insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});


// update a user's description by id.
userRoutes.route("/users/update/profile/:id").post(function (req, response) {
  let db_connect = dbo.getDb(); 
  let myquery = { _id: req.params.id }; 
  let newvalues = {   
    $set: {     
      description: req.body.description,
      avatar_name:req.body.avatar_name
    }, 
   }
   db_connect.collection(collectionName).updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     response.json(res);
   });
 });

// update a user's lists by id.
userRoutes.route("/users/update/lists/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: req.params.id }; 
 let newvalues = {   
   $set: {     
    lists: req.body.lists
   }, 
  }
  db_connect.collection(collectionName).updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
 
// delete a user
// userRoutes.route("/users/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId( req.params.id )};
//  db_connect.collection(collectionName).deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });
 
module.exports = userRoutes;