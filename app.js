const express = require('express');
const app = express();

// Middlewares
app.use('/posts', () => {
    // check auth
    console.log('middleware is running');
});

// routes
app
    .get('/', (req, res) => {
        res.send('It works!');
    })
    .get('/posts', (req, res) => {
        res.send('It posts!');
    });

// Connect To DB
mongoose.connect('mongodb+srv://StephanDee:<cOnKBpiuvBsBOQVF>@stephandeecluster-nv4z9.mongodb.net/test?retryWrites=true&w=majority');

app.listen(3000, function (err) {
    if (err !== undefined) {
        console.log('Error on startup,', err);
    } else {
        console.log('Listening on port 3000');
    }
});