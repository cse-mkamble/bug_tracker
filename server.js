var express = require("express");
var path = require("path");
var bodyparser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;

var app = express();
var db;

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname,"public")));

app.get("/api/bugs/",(request,response) => {

    var filter = {};
    if(request.query.priority){
        filter.priority = request.query.priority;
    }
    if(request.query.status){
        filter.status = request.query.status;
    }
    db.collection("bugs").find(filter).toArray((err,docs) => {
        console.log(docs);
        response.json(docs);
    });
});

app.use(bodyparser.json());
app.post("/api/bugs",(request,response) => {
    console.log(request.body)
    var newBug = request.body;

    db.collection("bugs").insertOne(newBug,(err,result) => {
        var newId = result.insertedId;
        console.log(newId);
        db.collection("bugs").find({_id:newId}).next((err,docs) => {
            response.json(docs);
        })
    });
});

app.put('/api/bugs/:id', function(req, res) {
  var bug = req.body;
  console.log("Modifying bug:", req.params.id, bug);
  var oid = ObjectId(req.params.id);
  db.collection("bugs").updateOne({_id: oid}, bug, function(err, result) {
    db.collection("bugs").find({_id: oid}).next(function(err, doc) {
      res.send(doc);
    });
  });
});

MongoClient.connect("mongodb://localhost/bugsdb",(err,dbConnection) => {
    db = dbConnection;
    app.listen(app.get("port"),() => {
        console.log("I am listening at " + app.get("port"));
    });
});
