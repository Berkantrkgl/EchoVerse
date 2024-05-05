const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

// Home page (index)
router.get("/", indexController.get_active_words);

// Creating new word and show up in home screen
router.post("/new", indexController.create_word);

// Check the word with wordId in home screen
router.post("/check/:wordId", indexController.check_word);

// Delete the word from home screen
router.delete("/:wordId", indexController.delete_word);

module.exports = router;
