const Word = require("../models/words");
const asyncHandler = require("express-async-handler");

// For using google translate api
const { translateText, detectLanguage } = require("../utils/translate");

// Recieve all status active word for home screen
exports.get_active_words = asyncHandler(async (req, res, next) => {
    try {
        var words = await Word.find({ is_active: true });
        res.render("home", { words: words });
    } catch (e) {
        console.log("An error occured during loading home page!", e);
        return next(e);
    }
});

// Create word and save with meaning in other language (tr <==> en)
exports.create_word = asyncHandler(async (req, res, next) => {
    try {
        const language_type = await detectLanguage(req.body.word);
        console.log(language_type);
        if (language_type === "tr") {
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
    } catch (e) {
        console.log("An error occured during creating new word!", e);
        return next(e);
    }
});

// Check the word, if entered meaning is correct return active from true to false
exports.check_word = asyncHandler(async (req, res, next) => {
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
            console.log(
                `yanlis cevap! Dogrusu : ${word.en_word} = ${word.tr_word}`
            );
            res.redirect("/");
        }
    } catch (e) {
        console.log("An error occured during checking word!", e);
        return next(e);
    }
});

exports.delete_word = asyncHandler(async (req, res, next) => {
    try {
        const word = await Word.findById(req.params.wordId);
        word.is_active = false;
        await word.save();
        res.redirect("/");
    } catch (e) {
        console.log("An error occured during word delete operation!", e);
        return next(e);
    }
});
