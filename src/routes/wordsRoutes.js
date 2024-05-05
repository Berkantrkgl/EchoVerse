const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");

// Show all 10 time repeated word, so learned words
router.get("/", wordController.get_all_learned_words);

// Bunu belki yapmayabilirim cok gerekli degil gibi
router.get("/group", (req, res) => {
    res.send("GET - Show learned words by group");
});

// Bunlarin yerine direkt pagination yapabilirim.
router.delete("/group/:id", (req, res) => {
    res.send("DELETE - Deleting words in group page!");
});

router.put("/group/:id", (req, res) => {
    res.send("PUT - Update word in group page");
});

module.exports = router;
