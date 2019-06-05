const express = require('express');
const app = express();

// routes
app.get('/', (req, res) => {
    res.send('It works!');
});

app.listen(3000, function(err) {
    if (err !== undefined) {
        console.log('Error on startup,', err);
    } else {
        console.log('Listening on port 3000');
    }
});