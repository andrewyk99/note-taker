const router = require('express').Router();
const { notes } = require('../../db/db.json');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid'); // Creates a unique id per note

// Sends a request to a url/notes and response with the json notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// Grabs what is given from the note title and text and pushes it into 'db.json'
router.post('/notes', (req, res) => {
    // Set ID based on what the next index of the array will be
    req.body.id = uniqid();

    // Validate to prevent user from saving a note without a title an text
    if (!req.body.title) {
        res.status(400).send('The note is not properly formatted!');
    }

    if (!req.body.text) {
        res.status(400).send('The note is not propery formatted!');
    }

    notes.push(req.body);

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'), // Pushes user input into the database
        JSON.stringify({ notes: notes }, null, 2)
    );

    res.json(req.body);
});

router.delete('/notes/:id', (req, res) => {
    const index = notes.findIndex(data => {
        return data.id === req.params.id;
    });

    if(index > -1) {
        notes.splice(index, 1);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({ notes: notes }, null, 2)
        );
    }

    res.json(notes);
});

module.exports = router;