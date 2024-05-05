const Word = require("../models/words");
const asyncHandler = require("express-async-handler");

exports.get_all_learned_words = asyncHandler(async (req, res, next) => {
    res.render("words.ejs");
});
