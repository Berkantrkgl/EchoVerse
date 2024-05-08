const Word = require("../models/words");
const User = require('../models/users');
const asyncHandler = require("express-async-handler");

// For using google translate api
const { translateText, detectLanguage } = require("../utils/translate");
const session = require("express-session");

// Recieve all status active word for home screen
exports.get_active_words = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.session.user_id;
        const user = await User.findById(userId);


        var words = await User.findById(userId) // Kullanıcı ID'sine göre ara
        .populate({
            path: 'words', // 'words' dizisini doldur
            match: { is_active: true }, // Yalnızca 'is_active' özelliği 'true' olanları eşleştir
        })
        .then(user => {
            if (!user) {
                console.log('User not found');
                return [];
            }
            return user.words; // Aktif kelimelerin listesini döndür
        })
        .catch(err => {
            console.error('Error during finding words:', err);
            return [];
        });

        console.log(words)
        res.render("home", { words: words, user: user });
    } catch (e) {
        console.log("An error occured during loading home page!", e);
        return next(e);
    }
});

// Create word and save with meaning in other language (tr <==> en)
exports.create_word = asyncHandler(async (req, res, next) => {
    try {
        // Check permission like this for now 
        if (!req.session.user_id) {
            console.log("Lutfen giris yapiniz!")
            return res.redirect('/users/login');
        }
        const language_type = await detectLanguage(req.body.word);

        const user = await User.findById(req.session.user_id).populate('words');

     
        if (language_type === "tr") {
            const existingWord = user.words.find(w => w.tr_word === req.body.word);
            const en_answer = await translateText(req.body.word, "en");

            if (existingWord) {
                // Kelime zaten var, güncelle
                existingWord.is_active = true;
                existingWord.question_language = "tr";
                await existingWord.save();
            } else {
                // Kelime yok, yeni kelime oluştur
                const newWord = new Word({
                    tr_word: req.body.word,
                    en_word: en_answer,
                    question_language: "tr",
                    is_active: true
                });
                await newWord.save();
                user.words.push(newWord);
                await user.save();
            }
        } else if (language_type === "en") {
            const existingWord = user.words.find(w => w.en_word === req.body.word);
            const tr_answer = await translateText(req.body.word, "tr");

            if (existingWord) {
                // Kelime zaten var, güncelle
                existingWord.is_active = true;
                existingWord.question_language = "en";
                await existingWord.save();
            } else {
                // Kelime yok, yeni kelime oluştur
                const newWord = new Word({
                    tr_word: tr_answer,
                    en_word: req.body.word,
                    question_language: "en",
                    is_active: true
                });
                await newWord.save();
                user.words.push(newWord);
                await user.save();
            }
        } else {
            console.log("Lütfen Türkçe ya da İngilizce bir kelime giriniz!");
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
        // Check permission like this for now 
        if (!req.session.user_id) {
            console.log("Lutfen giris yapiniz!")
            return res.redirect('/users/login');
        }
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
        // Check permission like this for now 
        if (!req.session.user_id) {
            console.log("Lutfen giris yapiniz!")
            return res.redirect('/users/login');
        }
        const word = await Word.findById(req.params.wordId);
        word.is_active = false;
        await word.save();
        res.redirect("/");
    } catch (e) {
        console.log("An error occured during word delete operation!", e);
        return next(e);
    }
});
