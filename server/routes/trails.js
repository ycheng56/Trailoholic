const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const trailRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/connect");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const collectionName = "trailcollections";

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
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection(collectionName)
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// // This section will help you create a new record.
// trailRoutes.route("/trails/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     start: req.body.start,
//     destination: req.body.destination,
//     mode: req.body.mode,
//   };
//   db_connect.collection(collectionName).insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

trailRoutes.route("/trails/add").post( async function (req, res) {
  try {
    let db_connect = dbo.getDb();
    let myobj = {
      mode: req.body.mode,
      difficulty: req.body.difficulty,
      start: req.body.start,
      destination: req.body.destination,
      route: req.body.route,
      duration: req.body.duration,
      distance: req.body.distance,
      instruction: req.body.instruction,
      image:req.body.image,
      like:req.body.like,
    };
    const data = await db_connect.collection(collectionName).insertOne(myobj);
    res.json(data);
  } catch (err) {
    console.log(err);   
  }


});

// This section will help you increase the like number by trail id.
trailRoutes.route("/trails/like/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      like: req.body.like
    },
  };
  db_connect
    .collection(collectionName)
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// This section will help you decrease the like number by trail id.
trailRoutes.route("/trails/unlike/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      like: req.body.like
    },
  };
  db_connect
    .collection(collectionName)
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// This section will help you delete a record
trailRoutes.route("/trails/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection(collectionName).deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

// search a trail
trailRoutes.route("/search/trails").get(function (req, res) {
  let db_connect = dbo.getDb();
  let query = req.query;
  db_connect.collection(collectionName).createIndex( { "start.geometry": "2dsphere" } );
  db_connect
    .collection(collectionName)
    .aggregate([
      {
        $geoNear: {
           near: { type:"Point", coordinates: [Number(query.lng), Number(query.lat)] },
           distanceField: "dist.calculated",
           maxDistance: 10000,
           includeLocs: "dist.location",
           spherical: true,
           key: 'start.geometry'
        }
      }
   ])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// get trails by mode
trailRoutes.route("/trails/search/mode/:mode").get(function (req, res) {
  let db_connect = dbo.getDb();
  let query = { mode: req.params.mode };
  db_connect
    .collection(collectionName)
    .find(query)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = trailRoutes;
