const express = require('express');
const uuid = require('uuid');
const db_utils = require('./utils/db');

const app = express();
app.use(express.json());

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
app.post('/question', async (req, res) => {
    if (verify_auth_token(req, res)) {

        console.log(req.body);

        const question_text = req.body.question_text;           // The question to be asked
        const question_options = req.body.answer_options;       // semi-colon delimited options
        const gps_coordinates = req.body.gps_coordinates;       // GPS coordinate of center of radius
        const answer_radius_km = req.body.answer_radius_km;     // Answer radius in KM

        await db_utils.poseQuestion(question_text, question_options, gps_coordinates, answer_radius_km);

        res.send({
            success: true, 
            question: question_text, 
            options: question_options, 
            gps_coordinates: gps_coordinates, 
            answer_radius_km: 
            answer_radius_km
        });
    }
})

// Submitting an answer to a question within radius
app.post('/answer', async (req, res) => {
    if (verify_auth_token(req, res)) {

        const question_id = req.body.question_id;
        const answer_chosen = req.body.answer_chosen;
        
        await db_utils.voteOnQuestion(question_id, answer_chosen);

        res.send({success: true});
    }
})

// Grabbing the list of available questions (and where they are - their coordinates)
app.get('/questions', async (req, res) => {
    if (verify_auth_token(req, res)) {
        const questions_in_db = await db_utils.retrieveQuestions();
        res.send({questions: questions_in_db})
    }
})

app.get('/auth', function (req, res) {
    const token = uuid.v4();
    session_tokens = session_tokens.concat(token);
    res.send({user_token: token});
})

// Serve the built frontend out of the static folder.
app.use('/', express.static('static'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});