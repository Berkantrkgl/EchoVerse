const express = require('express');
const router = express.Router();

// Base index for user endpoints
router.get('/', (req, res) => {
    res.send("GET - User index endpoint, redirect to login page!")
})

router.get('/login', (req, res) => {
    res.send("GET - Login get endpoint!");
});

router.post('/login', (req, res) => {
    res.send("POST -  Login post endpoint!");
});

router.get('/register', (req, res) => {
    res.send("GET - Regsiter get endpoint!");
});

router.post('/register', (req, res) => {
    res.send("POST - Register post endpoint!");
});

router.post('/logout', (req, res) => {
    res.send("POST - Logout endpoint!");
});

module.exports = router;