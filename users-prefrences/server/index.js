
var express = require("express");
var db;
var app = express();
var bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://venga:password1234567s@cluster.dumnm.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var defaultUsers = [{ userName: 'user1', theme: '' }, { userName: 'user2', theme: '' }, { userName: 'user3', theme: '' }];

async function run() {
    try {
        await client.connect();
        const database = client.db("users");
        const users = database.collection("themes");
        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        const result = await users.insertMany(defaultUsers, options);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.get("/users", function (request, response) {
    db.collection("themes")
        .find()
        .toArray(function (err, users) {
            // finds all entries in the users collection
            response.send(users); // sends users back to the page
        });
});

app.post("/updateTheme", function (request, response) {
    defaultUsers.map(val => {
        if (val.userName === request.body.userName) {
            return val.theme = request.body.theme;
        }
    })
    db.collection("thems").update(
        {
            $set: {
                theme: request.body.theme
            }
        }
    )
    response.send(defaultUsers);
});


// Listen on port 8080
var listener = app.listen(8081, function () {
    console.log("Listening on port " + listener.address().port);
});
