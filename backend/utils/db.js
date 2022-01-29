
  
const { MongoClient, ObjectId } = require('mongodb');
const { MongoObjectID } = require('mongodb').ObjectId;
const fs = require('fs');

let config = JSON.parse(fs.readFileSync('config.json'));
const credentials = config.mongodb_permission_file;
const url = config.mongodb_url;
const client = new MongoClient(url, {
  sslKey: credentials,
  sslCert: credentials
});

// Lookup in the collection a client with the given name and secret word.
async function retrieveQuestions() {
    await client.connect();
    console.log("Retrieving questions.");

    var tmp = await client.db("votingApp").collection("polls").find({})
    
    return new Promise((resolve, reject) => {
        tmp.toArray(function(err, blah) {
            resolve(blah);
        });
    })
    
}

async function poseQuestion(question_text, options, gps_coordinates, radius) {
    await client.connect();
    console.log("Posing question.");

    var answer_options = [];
    console.log("options.length", options.length);

    for (var i = 0; i < options.length; i++)
    {
        answer_options = answer_options.concat({"option": options[i], "votes": 0});
    }

    const new_doc = {
        "question_text": question_text, 
        "answer_options": answer_options,
        "gps_coordinates": gps_coordinates,
        "answer_radius_km": radius
    };

    console.log("Sendding new doc to mongodb", new_doc);
    await client.db("votingApp").collection("polls").insertOne(new_doc);
    console.log("Updated.")
    return;
}

async function voteOnQuestion(question_id, option) {
    await client.connect();
    
    var this_poll = await client.db("votingApp").collection("polls").findOne( {"_id": new ObjectId(question_id)} );
    console.log(this_poll)
    var new_answer_options = this_poll.answer_options;
    for (var i = 0; i < new_answer_options.length; i++) {
        if (new_answer_options[i].option == option) {
            console.log("Voting");
            new_answer_options[i].votes += 1;
            console.log(new_answer_options);
        }
    }


    const updateDoc = { $set: {"answer_options": new_answer_options}, };

    return await client.db("votingApp").collection("polls").updateOne({"_id": new ObjectId(question_id)}, updateDoc);
}


module.exports = {retrieveQuestions, poseQuestion, voteOnQuestion};