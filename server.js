const express = require('express');
const PORT = process.env.PORT || 3001; // Sets port to 3001
const app = express(); // Initializes express

// Calls routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Middleware, provided a file path to a location in this application
app.use(express.static('public'));

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());
const { notes } = require('./db/db.json');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});