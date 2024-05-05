const User = require("../models/users");
const asyncHandler = require("express-async-handler");

exports.login_user = asyncHandler(async (req, res, next) => {
    res.render("login");
});
