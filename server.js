var express = require("express");
var path = require("path");
var bodyparser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;
const Bugs = require('./bugsModel')
const mongoose = require('mongoose')

var app = express();
var db;

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/bugs/", (request, response) => {
    var filter = {};
    if (request.query.priority) {
        filter.priority = request.query.priority;
    }
    if (request.query.status) {
        filter.status = request.query.status;
    }
    Bugs.find(filter).exec((err, result) => {
        if (err) return response.status(400).json({ err })
        if (result) return response.json(result);
    })
});

app.use(bodyparser.json());
app.post("/api/bugs", async (request, response) => {
    const { owner, title, status, priority } = request.body
    const newBugs = new Bugs({
        owner, title, status, priority
    })
    await newBugs.save()
    response.json({ msg: "New Bugs Add!" })
});

app.put('/api/bugs/:id', async function (req, res) {
    var bug = req.body
    var _id = req.params.id
    const updatedBugs = await Bugs.findOneAndUpdate({ _id }, bug, {new: true});
    return res.status(201).json({ updatedBugs });
});

mongoose.connect("mongodb+srv://root:root@cluster0.a0xhf.mongodb.net/bugtracker?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Connected to mongodb")
})

app.listen(app.get("port"), () => {
    console.log("I am listening at " + app.get("port"));
});