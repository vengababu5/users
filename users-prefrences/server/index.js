// init project
var express = require("express");
var db;
var app = express();
var bodyParser = require("body-parser");
// const client = new MongoClient(process.env.MONGODB_URL, {
//     useNewUrlParser: true
// });



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://venga:test%2022@cluster0.dumnm.mongodb.net/users?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const database = client.db("users");
        const foods = database.collection("themes");
        // create an array of documents to insert
        const docs = [
            { name: "cake", healthy: false },
            { name: "lettuce", healthy: true },
            { name: "donut", healthy: false }
        ];
        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        const result = await foods.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
// client.connect(err => {
//     const collection = client.db("sample_training").collection("companies");
//     // perform actions on the collection object
//     const docs = [
//         { name: "cake", healthy: false },
//         { name: "lettuce", healthy: true },
//         { name: "donut", healthy: false }
//     ];
//     console.log(collection, client)
//     const result = collection.insertMany(docs);
//     //console.log(`${result.insertedCount} documents were inserted`);
//     client.close();
// });


var defaultUsers = [{ userName: 'user1', theme: '' }, { userName: 'user2', theme: '' }, { userName: 'user3', theme: '' }];



// Send user data - used by client.js
app.get("/users", function (request, response) {
    db.collection("users")
        .find()
        .toArray(function (err, users) {
            // finds all entries in the users collection
            response.send(users); // sends users back to the page
        });
});

// Create a new entry in the users collection
app.post("/new", function (request, response) {
    db.collection("users").insert([{ name: request.body.user }], function (
        err,
        r
    ) {
        console.log("Added a user");
        response.redirect("/");
    });
});


// Listen on port 8080
var listener = app.listen(8081, function () {
    console.log("Listening on port " + listener.address().port);
});
