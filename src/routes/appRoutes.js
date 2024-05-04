const express = require("express");
const router = express.Router();
const Word = require("../models/words");
const { translateText, detectLanguage } = require("../utils/translate");

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
        // Detect language
        const language_type = await detectLanguage(req.body.word);
        console.log(language_type);

        if (language_type === "tr") {
            // Get api translation
            var en_answer = await translateText(req.body.word, "en");
            let word = await Word.findOneAndUpdate(
                { tr_word: req.body.word },
                { is_active: true, language_type: "tr" }
            );
            if (word === null) {
                var new_word = new Word({
                    tr_word: req.body.word,
                    en_word: en_answer,
                    question_language: "tr",
                });
                await new_word.save();
                console.log(
                    "Turkce girilen kelime kaydedildi (ingilizce ile beraber!"
                );
            }
        } else if (language_type === "en") {
            // Get api translation
            var tr_answer = await translateText(req.body.word, "tr");

            let word = await Word.findOneAndUpdate(
                { en_word: req.body.word },
                { is_active: true, language_type: "en" }
            );

            if (word === null) {
                var new_word = new Word({
                    en_word: req.body.word,
                    tr_word: tr_answer,
                    question_language: "en",
                });
                await new_word.save();
                console.log(
                    "Ingilizce girilen kelime karsiligiyla birlikte kaydedildi!"
                );
            }
        } else {
            console.log("Lutfen turkce ya da ingilizce bir kelime giriniz!");
        }
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/error");
    }
});

router.post("/check/:wordId", async (req, res) => {
    try {
        const response = req.body.check_word;
        const word = await Word.findById(req.params.wordId);

        if (word.question_language === "en" && response === word.tr_word) {
            word.is_active = false;
            word.number_of_seen += 1;
            await word.save();
            console.log("Ingilizce kelimenin turkce karsiligi dogru bilindi!");
            res.redirect("/");
        } else if (
            word.question_language === "tr" &&
            response === word.en_word
        ) {
            word.is_active = false;
            word.number_of_seen += 1;
            await word.save();
            console.log("Turkce kelimenin ingilizce karsiligi dogru bilindi!");
            res.redirect("/");
        } else {
            console.log("yanlis cevap");
            res.redirect("/");
        }
    } catch (e) {
        console.log("An error occured!", e);
    }
});

router.delete("/:wordId", async (req, res) => {
    try {
        const word = await Word.findById(req.params.wordId);
        word.is_active = false;
        await word.save();
        res.redirect("/");
    } catch (e) {
        console.log("An error occured during word delete operation!");
    }
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
