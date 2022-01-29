const express = require('express');
const uuid = require('uuid');

const app = express();
var session_tokens = [];
const production = false;

function verify_auth_token(req, res) {
    const token = req.header('Authorization').split("Bearer ")[0];

    console.log(token);

    if (production && (session_tokens.indexOf(token) == -1)) {
        res.status(401);
        res.send({success: false});

        return false;
    }

    return true;
}

// Submitting a question (including the GPS coordinates and answer radius)
app.post('/question', function (req, res) {
    if (verify_auth_token(req, res)) {

        const question_text = req.body.question_text;       // The question to be asked
        const question_options = req.body.answer_options;   // semi-colon delimited options

        res.send({success: true, question: question_text, options: question_options});

    }
})

// Submitting an answer to a question within radius
app.post('/answer', function (req, res) {
    if (verify_auth_token(req, res)) {
        res.send({success: true});
    }
})

// Grabbing the list of available questions (and where they are - their coordinates)
app.get('/questions', function (req, res) {
    if (verify_auth_token(req, res)) {
        res.send({questions: []})
    }
})

app.get('/auth', function (req, res) {
    const token = uuid.v4();
    session_tokens = session_tokens.concat(token);
    res.send({user_token: token});
})
// Serve the built frontend out of the static folder.
app.use('/', express.static('static'));

app.listen(3000)