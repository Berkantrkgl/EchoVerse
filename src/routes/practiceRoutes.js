const express = require("express");
const router = express.Router();
const practiceController = require("../controllers/practiceController");

// Show up screen random 20 word.
router.get("/practice", practiceController.get_random_words);

// Check the word
router.post("/practice/check/:wordId", practiceController.check_random_word);

module.exports = router;
