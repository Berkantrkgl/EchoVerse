const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var wordSchema = new Schema({
    en_word: { type: String, lowercase: true },
    tr_word: { type: String, lowercase: true },
    entry_date: { type: Date, default: Date.now },
    question_language: { type: String, default: "en" },
    is_active: { type: Boolean, default: true },
    number_of_seen: { type: Number, default: 0 },
});

var Word = mongoose.model("Word", wordSchema);

module.exports = Word;
