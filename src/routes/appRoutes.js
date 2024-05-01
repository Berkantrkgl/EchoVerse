const express = require("express");
const router = express.Router();
const Word = require("../models/words");

router.get("/", async (req, res) => {
    try {
        var words = await Word.find({ is_active: true });
        res.render("home", { words: words });
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    }
});

router.post("/new", async (req, res) => {
    try {
        let word = await Word.findOneAndUpdate(
            { en_word: req.body.word },
            // number of seen property kelimenin anlami dogru bilindikten sonra increment edilecek!
            // { is_active: true, $inc: { number_of_seen: 1 } }
            { is_active: true }
        );
        if (word === null) {
            var new_word = new Word({
                en_word: req.body.word,
                tr_word: "Google Api Cevabi",
            });
            await new_word.save();
        }
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    }
});

router.post("/check/:wordId", async (req, res) => {
    const response = req.body.check_word;
    const word = await Word.findById(req.params.wordId);
    console.log(word);

    // burada google translate api dan cevap gelecek!

    if (word.en_word === response) {
        word.is_active = false;
        await word.save();
    }

    res.redirect("/");
});

router.get("/words", (req, res) => {
    res.render("words");
});

router.get("/words/group", (req, res) => {
    res.send("GET - Show learned words by group");
});

router.delete("/words/group/:id", (req, res) => {
    res.send("DELETE - Deleting words in group page!");
});

router.put("/words/group/:id", (req, res) => {
    res.send("PUT - Update word in group page");
});

router.get("/practice", (req, res) => {
    res.render("practice");
});

router.post("/practice/check", (req, res) => {
    res.send("POST -  Check entered word!");
});

router.get("/error", (req, res) => {
    res.send("This is a error page!");
});

module.exports = router;
