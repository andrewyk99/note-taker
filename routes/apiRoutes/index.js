const router = require('express').Router();
const { notes } = require('../../db/db.json');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

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
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    );

    res.json(req.body);
});

router.delete('/note/:id', (req, res) => {
    
})

module.exports = router;