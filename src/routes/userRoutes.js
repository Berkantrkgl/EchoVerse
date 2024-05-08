const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", userController.login_user);

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", userController.register_user);

router.post("/logout", userController.logout_user);

module.exports = router;
