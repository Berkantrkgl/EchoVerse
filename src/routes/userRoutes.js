const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    res.send("POST -  Login post endpoint!");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    res.send("POST - Register post endpoint!");
});

router.post("/logout", (req, res) => {
    res.send("POST - Logout endpoint!");
});

module.exports = router;
