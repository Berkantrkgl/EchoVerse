const express = require('express');
const router = express.Router();
const Word = require("../models/words");

// Base index for app. 
router.get('/', async (req, res) => {
    var words = await Word.find({ is_active: true});
    res.render("home", { words: words });
})

router.post('/new', async (req, res) => {
    var { word_en } = req.body;
    var newWord = new Word({
        en_word: word_en,
        tr_word: 'Merhaba',
    })
    newWord.save();
    res.redirect('/');
});

router.post('/check', (req, res) => {
    res.send("POST - Checking entered word with db");
});

router.get('/words', (req, res) => {
    res.render('words');
});

router.get('/words/group', (req, res) => {
    res.send("GET - Show learned words by group");
});

router.delete('/words/group/:id', (req, res) => {
    res.send("DELETE - Deleting words in group page!");
});

router.put('/words/group/:id', (req, res) => {
    res.send('PUT - Update word in group page');
});

router.get("/practice", (req, res) => {
    res.render('practice');
});

router.post('/practice/check', (req, res) => {
    res.send('POST -  Check entered word!');
});

module.exports = router;