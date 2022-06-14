const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("TrailoholicDatabase");
        console.log("Successfully connected to TrailoholicDatabase."); 
        // _db.listCollections().toArray(function(err, collInfos) {
        //   console.log("Collections:")
        //   for (const coll of collInfos) {
        //     console.log(coll.name);
        //   }
        // })
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};