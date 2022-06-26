const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const reviewRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/connect");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const collectionName = "reviewcollections";

// This section will help you get a list of all the records.
reviewRoutes.route("/reviews").get(function (req, res) {
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
reviewRoutes.route("/reviews/review/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection(collectionName)
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});



reviewRoutes.route("/reviews/add").post( async function (req, res) {
  try {
    let db_connect = dbo.getDb();
    let myobj = {
      trail_id: req.body.trail_id,
      user_id: req.body.user_id,
      rating: parseInt(req.body.rating),
      comment: req.body.comment,
      date: req.body.date
    };
    const data = await db_connect.collection(collectionName).insertOne(myobj);
    res.json(data);
  } catch (err) {
    console.log(err);   
  }


});


// This section will help you delete a record
reviewRoutes.route("/reviews/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection(collectionName).deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});


reviewRoutes.route("/reviews/review").get(function (req, res) {
    let db_connect = dbo.getDb();
    let query = req.query;
    db_connect
      .collection(collectionName)
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });



module.exports = reviewRoutes;
