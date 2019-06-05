const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Import Routes
const postsRoute = require('./routes/posts');


// Middlewares
app.use('/posts', postsRoute);

// Routes
app.get('/', (req, res) => {
    res.send('it works!');
});

// Connect To DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
        console.log('connected to the DB.');
});

app.listen(3000, function (err) {
    if (err !== undefined) {
        console.log('Error on startup,', err);
    } else {
        console.log('Listening on port 3000');
    }
});