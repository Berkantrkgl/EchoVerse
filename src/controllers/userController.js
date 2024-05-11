const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const hashpassword = async (pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    return hash;
};

exports.login_user = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ e_mail: email });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            req.session.user_id = user._id;
            res.redirect("/");
        } else {
            res.redirect("/users/login");
        }
    } catch (e) {
        req.flash("error", "Login failed!");
        res.redirect("/users/login");
    }
});

exports.register_user = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, againPassword } = req.body;
    try {
        const hashed_password = await hashpassword(password);
        const user = new User({
            first_name: firstName,
            last_name: lastName,
            e_mail: email,
            password: hashed_password,
        });
        await user.save();
        req.session.user_id = user._id;
        res.redirect("/");
    } catch (e) {
        req.flash("error", "Register failed!");
        res.redirect("/users/register");
        return next(e);
    }
});

exports.logout_user = asyncHandler(async (req, res, next) => {
    req.session.destroy();
    res.redirect("/users/login");
});
