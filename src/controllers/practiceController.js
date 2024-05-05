const Word = require("../models/words");
const asyncHandler = require("express-async-handler");

// Make logic random 20 learned or not learned word to practice
exports.get_random_words = asyncHandler(async (req, res, next) => {
    res.render("practice");
});

exports.check_random_word = asyncHandler(async (req, res, next) => {
    res.send("POST -  Check entered word!");
});
