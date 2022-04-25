const path = require('path');
const router = require('express').Router();

// Route to index page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Route to note page
router.get('notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// Route to catch routes that aren't defined
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;