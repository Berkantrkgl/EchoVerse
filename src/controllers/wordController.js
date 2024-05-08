const Word = require("../models/words");
const User = require("../models/users");
const asyncHandler = require("express-async-handler");

exports.get_all_learned_words = asyncHandler(async (req, res, next) => {
    console.log(req.session);
    const user = await User.findById(req.session.user_id);
    res.render("words.ejs", { user: user });
});
