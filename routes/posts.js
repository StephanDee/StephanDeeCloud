const express = require('express');
const router = express.Router();

// routes
router.get('/', (req, res) => {
    res.send('It posts!');
})
    .get('/id', (req, res) => {
        res.send('ID!');
    });

module.exports = router;